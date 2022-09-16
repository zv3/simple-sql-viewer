<template>
  <Dialog :open="isVisible" @close="onClickCancelButton">
    <template #default>
      <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
        {{ localModel.id ? 'Edit query' : 'Save query' }}
      </h3>
      <form class="space-y-6" action="#">
        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Name</label
          >
          <input
            v-model="localModel.name"
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label
            for="description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Description</label
          >
          <textarea
            v-model="localModel.description"
            rows="4"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          ></textarea>
        </div>
        <div>
          <label for="query" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Query</label
          >
          <SqlEditorInput v-model="localModel.sql" />
        </div>
      </form>
    </template>

    <template #action>
      <button class="btn btn-ghost btn-sm" @click="onClickCancelButton">Cancel</button>
      <button class="btn btn-sm" @click="onClickSubmitButton">Submit</button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { SavedQuery } from '../../domain/types';
import Dialog from '../ui/Dialog.vue';
import { useFormDialogStore } from '../../stores/formDialog';
import { useSavedQueriesStore } from '../../stores/savedQueries';
import SqlEditorInput from '../ui/SqlEditorInput.vue';

const formDialogStore = useFormDialogStore();
const { isVisible, queryModel } = storeToRefs(formDialogStore);

const savedQueriesStore = useSavedQueriesStore();
const localModel = ref<SavedQuery>({ ...queryModel.value });

const onClickSubmitButton = () => {
  savedQueriesStore.persistQueryModel(localModel.value);

  formDialogStore.setVisibility(false);
};

const onClickCancelButton = () => {
  formDialogStore.setVisibility(false);
};

watch(isVisible, () => {
  localModel.value = { ...queryModel.value };
});
</script>
