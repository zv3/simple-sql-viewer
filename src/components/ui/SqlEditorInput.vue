<template>
  <monaco-editor
    :value="props.value"
    theme="vs-dark"
    language="sql"
    :options="editorOptions"
    :height="100"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import {defineEmits} from "vue";

interface Props {
  value: string;
}

interface Emits {
  (e: 'input', val: string | null): void;
}

const editorOptions = {
  automaticLayout: true,
  minimap: { enabled: false },
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const onChange = (data: string) => {
  emit('input', data);
}
</script>
