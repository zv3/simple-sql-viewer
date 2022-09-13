<template>
  <div ref="editorRef" class="h-48"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const DEFAULT_EDITOR_VALUE = 'SELECT * FROM USERS';

const editorRef = ref(null);
let editorInstance: monaco.editor.IStandaloneCodeEditor;

const emits = defineEmits<{
  (e: 'input', val: string): void
}>();


const emitInput = () => {
  const currentValue = editorInstance.getValue();
  emits('input', currentValue)
}

onMounted(() => {
  editorInstance = monaco.editor.create(editorRef.value, {
    value: DEFAULT_EDITOR_VALUE,
    language: 'sql',
    automaticLayout: true,
    minimap: { enabled: false },
  });

  editorInstance.onDidChangeModelContent(emitInput);

  emitInput();
});

onBeforeUnmount(() => {
  editorInstance.dispose();
});
</script>
