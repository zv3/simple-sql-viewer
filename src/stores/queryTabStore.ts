import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQueryTabStore = defineStore('tab.query', () => {
  const editorContents = ref('');
  const isRunning = ref(false);

  function setEditorContents(value: string) {
    editorContents.value = value;
  }

  function setIsRunning(value: boolean) {
    isRunning.value = value;
  }

  return { editorContents, isRunning, setEditorContents, setIsRunning };
});
