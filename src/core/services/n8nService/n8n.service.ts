import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { N8nWorkflow, N8nExecution, N8nStats } from '../../../app/components/dashboard/n8n.models';
import { environment } from '../../../enviroment/environment';

export interface N8nDashboardData {
  workflows: N8nWorkflow[];
  executions: N8nExecution[];
  stats: N8nStats;
}

@Injectable({ providedIn: 'root' })
export class N8nService {
  private isProduction = environment.production;
  private apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODMxNDc5Zi01NzJkLTQxYzctOGRmOC1iZDFiMTEwMzE1MDAiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNmZmZGFjMWQtN2Y4OC00OTZmLThjN2UtZmE2MmUwY2ZkNGU3IiwiaWF0IjoxNzczMzQzMDI4LCJleHAiOjE3NzU4ODAwMDB9.rB_KfsuOf8_S7B2eLleC-yXDfrp7utCFWkppAr948Vs';

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    return new HttpHeaders({
      'X-N8N-API-KEY': this.apiKey,
      'ngrok-skip-browser-warning': 'true'
    });
  }

  getDashboardData(): Observable<N8nDashboardData> {
    const workflows$ = this.isProduction
      ? this.http.get<{ data: N8nWorkflow[] }>('/api/n8n?endpoint=workflows')
      : this.http.get<{ data: N8nWorkflow[] }>('/n8n-api/workflows?limit=100', { headers: this.headers });

    const executions$ = this.isProduction
      ? this.http.get<{ data: N8nExecution[] }>('/api/n8n?endpoint=executions')
      : this.http.get<{ data: N8nExecution[] }>('/n8n-api/executions?limit=100', { headers: this.headers });

    return forkJoin({
      workflows: workflows$,
      executions: executions$,
    }).pipe(
      map(({ workflows, executions }) => {
        const wf = workflows.data ?? [];
        const ex = executions.data ?? [];

        // Mapa de workflowId → nombre para enriquecer ejecuciones
        const wfMap = new Map(wf.map(w => [w.id, w.name]));
        ex.forEach(e => {
          if (!e.workflowData?.name && wfMap.has(e.workflowId)) {
            e.workflowData = { name: wfMap.get(e.workflowId)! };
          }
        });

        const stats: N8nStats = {
          totalWorkflows: wf.length,
          activeWorkflows: wf.filter(w => w.active).length,
          inactiveWorkflows: wf.filter(w => !w.active).length,
          totalExecutions: ex.length,
          successExecutions: ex.filter(e => e.status === 'success').length,
          errorExecutions: ex.filter(e => e.status === 'error' || e.status === 'failed').length,
          runningExecutions: ex.filter(e => e.status === 'running').length,
        };
        console.log(workflows,'workflows');
        
        return { workflows: wf, executions: ex, stats };
      })
    );
  }
}