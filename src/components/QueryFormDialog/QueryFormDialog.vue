<template>
  <Dialog :title="dialogTitle" :open="isVisible" @close="onClickCancelButton">
    <template #main>
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

    <template #footer>
      <div class="flex items-center">
        <div class="flex-0">
          <button
            class="focus:outline-none text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:hover:bg-red-700 dark:focus:ring-red-900"
            @click="onClickDeleteButton"
          >
            Delete
          </button>
        </div>

        <div class="ml-auto">
          <button
            class="text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-gray-800 dark:focus:ring-gray-700 dark:border-gray-700"
            @click="onClickCancelButton"
          >
            Cancel
          </button>
          <button
            class="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="onClickSubmitButton"
          >
            Submit
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
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
  savedQueriesStore.saveQueryModel(localModel.value);

  formDialogStore.setVisibility(false);
};

const onClickCancelButton = () => {
  formDialogStore.setVisibility(false);
};

const onClickDeleteButton = () => {
  savedQueriesStore.deleteQueryModel(localModel.value);

  formDialogStore.setVisibility(false);
};

const dialogTitle = computed(() => {
  return localModel.value.id ? 'Edit query' : 'Save query';
});

watch(isVisible, () => {
  localModel.value = { ...queryModel.value };
});
</script>
