import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useQueryTabStore = defineStore('tab.query', () => {
  const editorContents = ref('');

  function setEditorContents(value: string) {
    editorContents.value = value;
  }

  return { editorContents, setEditorContents };
});
