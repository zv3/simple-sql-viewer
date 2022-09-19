export interface QueryResults {
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
  sql: string;
  lastRanAt: number;
}

export interface Table {
  name: string;
  url: string;
  sql: string;
}
