<template>
  <div ref="editorRef" class="h-28"></div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor';
import {ref, onMounted, onBeforeUnmount, watch} from 'vue';

const editorRef = ref(document.createElement('div'));
let editorInstance: monaco.editor.IStandaloneCodeEditor;

interface Props {
  modelValue: string;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update:modelValue', val: string): void;
}

const emits = defineEmits<Emits>();

const emitInput = () => {
  const currentValue = editorInstance.getValue();

  emits('update:modelValue', currentValue);
};

onMounted(() => {
  editorInstance = monaco.editor.create(editorRef.value, {
    value: props.modelValue,
    language: 'sql',
    automaticLayout: true,
    minimap: { enabled: false },
    theme: 'vs-dark',
  });

  editorInstance.onDidChangeModelContent(emitInput);

  emitInput();
});

onBeforeUnmount(() => {
  editorInstance.dispose();
});

watch(() => props.modelValue, (newVal, oldVal) => {
  if (newVal === '') {
    editorInstance.setValue(''); // Manually clear the editor's input.
  }
});
</script>
