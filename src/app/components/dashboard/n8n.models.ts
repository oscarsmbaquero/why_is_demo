export interface N8nWorkflow {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: { id: string; name: string }[];
}

export interface N8nExecution {
  id: string;
  workflowId: string;
  status: 'success' | 'error' | 'failed' | 'running' | 'waiting';
  startedAt: string;
  stoppedAt?: string;
  workflowData?: { name: string };
}

export interface N8nStats {
  totalWorkflows: number;
  activeWorkflows: number;
  inactiveWorkflows: number;
  totalExecutions: number;
  successExecutions: number;
  errorExecutions: number;
  runningExecutions: number;
}
