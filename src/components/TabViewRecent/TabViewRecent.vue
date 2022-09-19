<template>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th class="py-3 px-6">#</th>
          <th scope="col" class="py-3 px-6">Query</th>
          <th scope="col" class="py-3 px-6 w-36">
            Last Run
            <button type="button" @click="onClickSortByButton(currentSortDirection)">
              <SortIcon />
            </button>
          </th>
          <th></th>
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
          <td class="px-6 py-4 text-xs">
            {{ query.sql }}
          </td>
          <td class="px-6 text-xs w-32">
            {{ dayjs().to(dayjs(query.lastRanAt)) }}
          </td>
          <td class="w-16 text-center">
            <button
              type="button"
              class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SortIcon from '../../assets/icons/sort.svg';
import { computed, defineEmits, ref } from 'vue';
import { SortDirection } from '../TabViewSaved/types';
import {useRecentQueriesStore} from "../../stores/recentQueries";
import {RecentQuery} from "../../domain/types";

dayjs.extend(relativeTime);

const recentQueriesStore = useRecentQueriesStore();

interface Emits {
  (e: 'run', val: string): void;
}

const emits = defineEmits<Emits>();

const currentSortDirection = ref<SortDirection>(SortDirection.DESC);

const onClickRunButton = (query: RecentQuery) => {
  emits('run', query.sql);
};

const onClickSortByButton = (direction: SortDirection) => {
  currentSortDirection.value =
    currentSortDirection.value === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
};

const queries = computed(() => {
  return orderBy(recentQueriesStore.queries, 'sql', currentSortDirection.value);
});
</script>
