<template>
  <div>
    <SqlEditorInput v-model="editorInput" />

    <div class="text-right mt-2">
      <button type="button" class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700" @click="onClickClearButton">
        Clear Query
      </button>
      <button type="button" class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700" @click="onClickSaveButton">
        Save
      </button>
      <button type="button" class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="onClickRunButton">Run</button>
    </div>

    <QueryFormDialog />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import QueryFormDialog from '../QueryFormDialog/QueryFormDialog.vue';
import SqlEditorInput from '../ui/SqlEditorInput.vue';
import { useFormDialogStore } from '../../stores/formDialog';

const formDialogStore = useFormDialogStore();

const editorInput = ref('');

const onClickSaveButton = () => {
  formDialogStore.setQueryModel({
    name: '',
    description: '',
    sql: editorInput.value,
    createdAt: Date.now(),
  });

  formDialogStore.setVisibility(true);
};

const onClickRunButton = () => {};

const onClickClearButton = () => {
  editorInput.value = '';
}
</script>
