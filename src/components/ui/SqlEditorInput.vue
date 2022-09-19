<template>
  <monaco-editor
    :value="props.modelValue"
    theme="vs-dark"
    language="sql"
    :options="editorOptions"
    :height="100"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import { defineEmits } from 'vue';

interface Props {
  modelValue: string;
}

interface Emits {
  (e: 'update:modelValue', val: string | null): void;
}

const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
  wordWrap: 'wordWrapColumn',
  wordWrapColumn: 100,
  vertical: 'visible',
  verticalHasArrows: true,
  verticalScrollbarSize: 17,
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onChange = (data: string) => {
  emit('update:modelValue', data);
};
</script>
