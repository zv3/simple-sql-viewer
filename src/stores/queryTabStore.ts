import { defineStore } from 'pinia';
import { ref } from 'vue';
import { QueryResults } from '../domain/types';

export const useQueryTabStore = defineStore('tab.query', () => {
  const editorContents = ref('');
  const isRunning = ref(false);
  const queryResults = ref<QueryResults>({
    columns: [],
    rows: [],
  });

  function setEditorContents(value: string) {
    editorContents.value = value;
  }

  function setIsRunning(value: boolean) {
    isRunning.value = value;
  }

  function setQueryResults(results: QueryResults) {
    queryResults.value = results;
  }

  return {
    editorContents,
    isRunning,
    queryResults,
    setEditorContents,
    setIsRunning,
    setQueryResults,
  };
});
