export interface QueryResult {
  columns: string[];
  rows: string[];
  affected?: number;
}

export interface SavedQuery {
  id?: string;
  name: string;
  description: string;
  sql: string;
  createdAt: number;
}

export interface RecentQuery {
  id: string;
  value: string;
  createdAt: number;
}
