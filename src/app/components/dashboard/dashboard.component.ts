// ...existing code...
// ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { N8nDashboardData, N8nService } from '../../../core/services/n8nService/n8n.service';
import { HttpClientModule } from '@angular/common/http';
import { N8nExecution, N8nWorkflow } from './n8n.models';
import { N8N_DASHBOARD_MOCK } from './n8n-dashboard.mock';
import { NavbarService } from '../../../core/services/navbarService/navbar.service';

// Cambiar a true para usar datos simulados
const USE_MOCK = false;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [N8nService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  data: N8nDashboardData | null = null;
  loading = true;
  error: string | null = null;

  // Estado de colapso para cada tabla (cerradas por defecto)
  workflowsPanelCollapsed = true;
  executionsPanelCollapsed = true;

  constructor(private n8nService: N8nService, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.load();
    this.navbarService.setSelectedOption('dashboard');
  }

  toggleWorkflowsPanel() {
    this.workflowsPanelCollapsed = !this.workflowsPanelCollapsed;
  }

  toggleExecutionsPanel() {
    this.executionsPanelCollapsed = !this.executionsPanelCollapsed;
  }

  load(): void {
    this.loading = true;
    this.error = null;

    if (USE_MOCK) {
      setTimeout(() => {
        this.data = N8N_DASHBOARD_MOCK;
        this.loading = false;
      }, 800);
      return;
    }

    this.n8nService.getDashboardData().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'No se pudo conectar con n8n. Verifica la URL, API Key y CORS.';
        this.loading = false;
        console.error(err);
      },
    });
  }
 
  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'status-success';
      case 'error':
      case 'failed': return 'status-error';
      case 'running': return 'status-running';
      default: return 'status-waiting';
    }
  }
 
  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      success: 'Exitosa',
      error: 'Error',
      failed: 'Fallida',
      running: 'Corriendo',
      waiting: 'Esperando',
    };
    return labels[status] ?? status;
  }
 
  formatDate(dateStr: string): string {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('es-ES', {
      day: '2-digit', month: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  }
 
  trackByWorkflow(_: number, wf: N8nWorkflow) { return wf.id; }
  trackByExecution(_: number, ex: N8nExecution) { return ex.id; }
}
