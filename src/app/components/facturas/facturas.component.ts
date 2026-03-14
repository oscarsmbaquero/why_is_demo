
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatService } from '../../../core/services/chatService/chat.service';
 
interface InvoiceResult {
  ok: boolean;
  mongoId: string;
  url: string;
  numero_factura: string;
}

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit{

  private http = inject(HttpClient);
  private chatService = inject(ChatService);
  private readonly WEBHOOK_URL = 'https://abolitionary-verline-erethismic.ngrok-free.dev/webhook/invoice';
 
  selectedFile = signal<File | null>(null);
  previewUrl   = signal<string | null>(null);
  uploading    = signal(false);
  progress     = signal(0);
  result       = signal<InvoiceResult | null>(null);
  error        = signal<string | null>(null);
  isDragging   = signal(false);
  public facturas = signal<any[]>([]);

  ngOnInit(){
    this.getAll().subscribe({
      next: data => {
        this.facturas.set(data);
        console.log('Facturas:', data);
      },
      error: err => {
        console.error('Error al obtener las facturas:', err);
      }
    });
  }
 
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) this.setFile(input.files[0]);
  }
 
  setFile(file: File) {
    this.selectedFile.set(file);
    this.result.set(null);
    this.error.set(null);
    const reader = new FileReader();
    reader.onload = e => this.previewUrl.set(e.target?.result as string);
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
 
  submit() {
    const file = this.selectedFile();
    if (!file) return;
 
    const form = new FormData();
    form.append('data', file, file.name);
 
    this.uploading.set(true);
    this.progress.set(10);
    this.error.set(null);
 
    this.http.post<InvoiceResult>(this.WEBHOOK_URL, form, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress.set(Math.round(70 * event.loaded / event.total));
        } else if (event.type === HttpEventType.Response) {
          this.progress.set(100);
          this.result.set(event.body!);
          this.uploading.set(false);
        }
      },
      error: err => {
        this.error.set('Error al procesar la factura. Revisa la conexión con n8n.');
        this.uploading.set(false);
        console.error(err);
      }
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
}
 



