import { defineStore } from 'pinia';
import { ref } from 'vue';
import {QueryResults, Table} from '../domain/types';
import Tables from "../tables";

export const useQueryTabStore = defineStore('tab.query', () => {
  const editorContents = ref('');
  const isRunning = ref(false);
  const queryResults = ref<QueryResults>({
    columns: [],
    rows: [],
  });
  const table = ref<Table>(Tables[0]);

  function setEditorContents(value: string) {
    editorContents.value = value;
  }

  function setIsRunning(value: boolean) {
    isRunning.value = value;
  }

  function setQueryResults(results: QueryResults) {
    queryResults.value = results;
  }

  function setCurrentTable(t: Table) {
    table.value = t;
  }

  return {
    editorContents,
    isRunning,
    queryResults,
    setEditorContents,
    setIsRunning,
    setQueryResults,
    setCurrentTable,
  };
});
