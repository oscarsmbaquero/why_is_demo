import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { N8nWorkflow, N8nExecution, N8nStats } from '../../../app/components/dashboard/n8n.models';

export interface N8nDashboardData {
  workflows: N8nWorkflow[];
  executions: N8nExecution[];
  stats: N8nStats;
}

@Injectable({ providedIn: 'root' })
export class N8nService {
  private baseUrl = 'http://YOUR_RASPBERRY_IP:5678'; // <-- Cambia esto
  private apiKey = 'YOUR_API_KEY';                   // <-- Cambia esto

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({ 'X-N8N-API-KEY': this.apiKey });
  }

  getDashboardData(): Observable<N8nDashboardData> {
    return forkJoin({
      workflows: this.http.get<{ data: N8nWorkflow[] }>(
        `${this.baseUrl}/api/v1/workflows?limit=100`,
        { headers: this.headers }
      ),
      executions: this.http.get<{ data: N8nExecution[] }>(
        `${this.baseUrl}/api/v1/executions?limit=100`,
        { headers: this.headers }
      ),
    }).pipe(
      map(({ workflows, executions }) => {
        const wf = workflows.data ?? [];
        const ex = executions.data ?? [];
        const stats: N8nStats = {
          totalWorkflows: wf.length,
          activeWorkflows: wf.filter(w => w.active).length,
          inactiveWorkflows: wf.filter(w => !w.active).length,
          totalExecutions: ex.length,
          successExecutions: ex.filter(e => e.status === 'success').length,
          errorExecutions: ex.filter(e => e.status === 'error' || e.status === 'failed').length,
          runningExecutions: ex.filter(e => e.status === 'running').length,
        };
        return { workflows: wf, executions: ex, stats };
      })
    );
  }
}