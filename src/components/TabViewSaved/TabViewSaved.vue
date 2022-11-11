<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="py-3 px-6">#</th>
          <th scope="col" class="py-3 px-6">
            Name
            <button type="button" @click="onClickSortByButton(currentSortDirection)">
              <SortIcon />
            </button>
          </th>
          <th scope="col" class="py-3 px-6">Description</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(query, index) in queries"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ index + 1 }}
          </th>
          <td class="px-6">
            {{ query.name }}
          </td>
          <td class="px-6">
            {{ query.description }}
          </td>
          <td class="w-32 text-center">
            <button
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              @click="onClickEditButton(query)"
            >
              Edit
            </button>

            <button
              type="button"
              class="ml-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              @click="onClickRunButton(query)"
            >
              Run
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import orderBy from 'lodash/orderBy';
import SortIcon from '../../assets/icons/sort.svg';
import { useSavedQueriesStore } from '../../stores/savedQueries';
import { SavedQuery } from '../../domain/types';
import { computed, defineEmits, ref } from 'vue';
import { SortDirection } from './types';
import { useFormDialogStore } from '../../stores/formDialog';

const savedQueriesStore = useSavedQueriesStore();
const formDialogStore = useFormDialogStore();

interface Emits {
  (e: 'run', val: string): void;
}

const emits = defineEmits<Emits>();

const currentSortDirection = ref<SortDirection>(SortDirection.DESC);

const onClickRunButton = (query: SavedQuery) => {
  emits('run', query.sql);
};

const onClickEditButton = (query: SavedQuery) => {
  formDialogStore.setQueryModel(query);
  formDialogStore.setVisibility(true);
};

const onClickSortByButton = (direction: SortDirection) => {
  currentSortDirection.value =
    currentSortDirection.value === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
};

const queries = computed(() => {
  return orderBy(savedQueriesStore.queries, 'name', currentSortDirection.value);
});
</script>
