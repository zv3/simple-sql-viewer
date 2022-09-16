export interface TabViewOption {
  id: string;
  label: string;
}

export const TAB_VIEW_QUERY: TabViewOption = { id: 'query', label: 'Query' };
export const TAB_VIEW_RECENT: TabViewOption = { id: 'recent', label: 'Recent' };
export const TAB_VIEW_SAVED: TabViewOption = { id: 'saved', label: 'Saved' };

export const TAB_VIEW_OPTIONS: TabViewOption[] = [TAB_VIEW_QUERY, TAB_VIEW_RECENT, TAB_VIEW_SAVED];
