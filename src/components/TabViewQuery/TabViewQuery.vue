<template>
  <div>
    <SqlEditorInput :value="editorContents" @input="onInputEditor" />

    <div class="text-right mt-2">
      <button
        type="button"
        class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="onClickClearButton"
      >
        Clear Query
      </button>
      <button
        type="button"
        class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="onClickSaveButton"
      >
        Save
      </button>
      <button
        type="button"
        class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        :class="{ 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed dark:hover:bg-blue-500': isRunning }"
        :disabled="isRunning"
        @click="onClickRunButton"
      >
        <LoadingIcon v-if="isRunning" class="w-4 h-4 inline mr-1" />
        {{ runButtonLabel }}
      </button>
    </div>

    <QueryResults :loading="isRunning" :rows="rows" />

    <QueryFormDialog />
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import QueryFormDialog from '../QueryFormDialog/QueryFormDialog.vue';
import SqlEditorInput from '../ui/SqlEditorInput.vue';
import LoadingIcon from '../../assets/icons/loading.svg';
import { useFormDialogStore } from '../../stores/formDialog';
import {useQueryTabStore} from "../../stores/queryTabStore";
import {storeToRefs} from "pinia";

interface Emits {
  (e: 'run', val: string): void;
}

const queryTabStore = useQueryTabStore();
const formDialogStore = useFormDialogStore();

const emit = defineEmits<Emits>();

const { editorContents, isRunning } = storeToRefs(queryTabStore);

const rows = ref([]);

const runButtonLabel = computed(() => {
  return isRunning.value ? 'Running...' : 'Run';
});

const onClickSaveButton = () => {
  formDialogStore.setQueryModel({
    name: '',
    description: '',
    sql: editorContents.value,
    createdAt: Date.now(),
  });

  formDialogStore.setVisibility(true);
};

const onClickRunButton = () => {
  emit('run', editorContents.value);
};

const onClickClearButton = () => {
  queryTabStore.setEditorContents('');
};

const onInputEditor = (sql: string) => {
  queryTabStore.setEditorContents(sql);
}
</script>
