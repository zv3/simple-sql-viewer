<template>
  <div>
    <SqlEditorInput v-model="editorInput" />

    <div class="text-right mt-2">
      <button type="button" class="btn btn-ghost btn-sm mr-2" @click="onClickClearButton">
        Clear Query
      </button>
      <button type="button" class="btn btn-ghost btn-sm mr-2" @click="onClickSaveButton">
        Save
      </button>
      <button type="button" class="btn btn-sm" @click="onClickRunButton">Run</button>
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
