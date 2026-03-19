import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatService } from '../../../core/services/chatService/chat.service';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

interface InvoiceResult {
  ok: boolean;
  mongoId?: string;
  url?: string;
  numero_factura: string;
  contabilizada?: boolean;
}

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    SkeletonModule,
    InputIconModule,
    IconFieldModule,
  ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css',
})
export class FacturasComponent implements OnInit {

  private http = inject(HttpClient);
  private chatService = inject(ChatService);

  private readonly WEBHOOK_URL =
    'https://abolitionary-verline-erethismic.ngrok-free.dev/webhook/invoice';
  private readonly WEBHOOK_URL_CONTABILIZAR =
    'https://abolitionary-verline-erethismic.ngrok-free.dev/webhook/update-factura';
  private readonly WEBHOOK_URL_TEST =
    'https://abolitionary-verline-erethismic.ngrok-free.dev/webhook-test/update-factura';

  // ── Signals de archivo ──────────────────────────────────────────
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  uploading = signal(false);
  uploadingFactura = signal(false);
  progress = signal(0);
  result = signal<InvoiceResult | null>(null);
  resultFactura = signal<InvoiceResult | null>(null);
  error = signal<string | null>(null);
  isDragging = signal(false);

  // ── Signal principal de facturas ────────────────────────────────
  facturas = signal<any[]>([]);

  // ── Computeds: se recalculan solos al cambiar facturas ──────────
  totalContabilizadas = computed(() =>
    this.facturas().reduce((acc, f) => f.contabilizada ? acc + f.total : acc, 0)
  );

  totalSinContabilizar = computed(() =>
    this.facturas().reduce((acc, f) => !f.contabilizada ? acc + f.total : acc, 0)
  );

  // ── Estado UI ───────────────────────────────────────────────────
  isLoading = true;
  showInfo = false;
  skeletonRows = Array(6).fill({});

  // ───────────────────────────────────────────────────────────────
  ngOnInit() {
    this.cargarFacturas();
  }

  private cargarFacturas() {
    this.getAll().subscribe({
      next: (data) => {
        this.facturas.set(data); // los computed se actualizan solos
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al obtener las facturas:', err);
      },
    });
  }

  // ── Gestión de archivo ──────────────────────────────────────────
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.setFile(input.files[0]);
  }

  setFile(file: File) {
    this.selectedFile.set(file);
    this.result.set(null);
    this.error.set(null);
    const reader = new FileReader();
    reader.onload = (e) => this.previewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  clearImage(e: Event) {
    e.stopPropagation();
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.result.set(null);
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(true);
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    this.isDragging.set(false);
    const file = e.dataTransfer?.files[0];
    if (file) this.setFile(file);
  }

  // ── Subida de factura ───────────────────────────────────────────
  async submit() {
    const file = this.selectedFile();
    if (!file) return;

    this.uploading.set(true);
    this.progress.set(10);
    this.error.set(null);

    const jpegBlob = await this.convertToJpeg(file);
    const form = new FormData();
    form.append('data', jpegBlob, 'factura.jpg');

    this.http
      .post<InvoiceResult>(this.WEBHOOK_URL, form, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress.set(Math.round((70 * event.loaded) / event.total));
          } else if (event.type === HttpEventType.Response) {
            this.progress.set(100);
            this.result.set(event.body!);
            this.uploading.set(false);
            this.reset();
            this.cargarFacturas(); // refresca tabla y totales
          }
        },
        error: (err) => {
          this.error.set('Error al procesar la factura. Revisa la conexión con n8n.');
          this.uploading.set(false);
          console.error(err);
        },
      });
  }

  reset() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
    this.result.set(null);
    this.error.set(null);
    this.progress.set(0);
  }

  getAll(): Observable<any[]> {
    return this.chatService.obtenerFacturas();
  }

  // ── Contabilizar factura ────────────────────────────────────────
  onContabilizarChange(product: any) {
    this.uploadingFactura.set(true);
    this.progress.set(0);

    const interval = setInterval(() => {
      if (this.progress() < 85) this.progress.update((v) => v + 5);
    }, 200);

    this.http
      .post<InvoiceResult>(this.WEBHOOK_URL_CONTABILIZAR, { _id: product._id })
      .subscribe({
        next: (result) => {
          clearInterval(interval);
          this.progress.set(100);
          this.resultFactura.set(result);
          this.uploadingFactura.set(false);

          setTimeout(() => {
            this.getAll().subscribe({
              next: (data) => {
                this.facturas.set(data); // computed se recalculan solos
                this.uploadingFactura.set(false);
                setTimeout(() => this.resultFactura.set(null), 2000);
              },
            });
          }, 2000);
        },
        error: (err) => {
          clearInterval(interval);
          this.error.set('Error al procesar la factura. Revisa la conexión con n8n.');
          this.uploadingFactura.set(false);
          console.error(err);
        },
      });
  }

  // ── Filtro tabla ────────────────────────────────────────────────
  onGlobalFilter(event?: Event, dt?: any) {
    if (!event || !dt) return;
    const input = event.target as HTMLInputElement | null;
    dt.filterGlobal(input?.value || '', 'contains');
  }

  // ── Conversión de imagen ────────────────────────────────────────
  private convertToJpeg(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(url);
            if (blob) resolve(blob);
            else reject(new Error('Error convirtiendo imagen'));
          },
          'image/jpeg',
          0.92,
        );
      };

      img.onerror = () => reject(new Error('Error cargando imagen'));
      img.src = url;
    });
  }
}