<template>
  <div v-if="queryResults.columns.length > 0">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th :key="column" v-for="column in queryResults.columns" scope="col" class="py-3 px-6">
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="visibleRows.length > 0">
            <tr
              :key="rowIndex"
              v-for="(row, rowIndex) in visibleRows"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ row[0] }}
              </th>

              <template v-for="(_, colIndex) in queryResults.columns">
                <td v-if="colIndex > 0" :key="colIndex" class="py-4 px-6">
                  {{ row[colIndex] || '--' }}
                </td>
              </template>
            </tr>
          </template>

          <template v-else>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                :colspan="queryResults.columns.length"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                No records found.
              </th>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <nav class="flex justify-between items-center pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
        >Showing <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.from }}-{{ pagination.to}}</span> of
          <span class="font-semibold text-gray-900 dark:text-white">{{
              totalRowsCount
            }}</span></span
        >
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <button
            type="button"
            class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            :class="{
              'dark:hover:bg-gray-700': !isPrevPageButtonDisabled,
              'dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-600 dark:text-gray-600 cursor-not-allowed': isPrevPageButtonDisabled
            }"
            :disabled="isPrevPageButtonDisabled"
            @click="onClickPrevPageButton"
          >
            <span class="sr-only">Previous</span>
            <ChevronLeft />
          </button>
        </li>
        <li>
          <button
            type="button"
            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white"
            :class="{
              'dark:hover:bg-gray-700': !isNextPageButtonDisabled,
              'dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-600 dark:text-gray-600 cursor-not-allowed': isNextPageButtonDisabled
            }"
            :disabled="isNextPageButtonDisabled"
            @click="onClickNextPageButton"
          >
            <span class="sr-only">Next</span>
            <ChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import ChevronRight from '../../assets/icons/chevron-right.svg';
import ChevronLeft from '../../assets/icons/chevron-left.svg';
import { useQueryTabStore } from '../../stores/queryTabStore';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

interface Props {
  perPage: number;
}

const props = withDefaults(defineProps<Props>(), { perPage: 10 });

const queryTabStore = useQueryTabStore();
const { queryResults } = storeToRefs(queryTabStore);

const currentPage = ref(1);

const totalRowsCount = computed(() => queryResults.value.rows.length);
const totalPages = computed(() => Math.ceil(totalRowsCount.value / props.perPage));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * props.perPage;
  const endIndex = startIndex + props.perPage;

  return {
    from: startIndex + 1,
    to: endIndex,
    startIndex,
    endIndex,
  };
});

const visibleRows = computed(() => {
  return queryResults.value.rows.slice(pagination.value.startIndex, pagination.value.endIndex);
});

const onClickNextPageButton = () => {
  currentPage.value = currentPage.value + 1;
}

const onClickPrevPageButton = () => {
  currentPage.value = currentPage.value - 1;
}

const isNextPageButtonDisabled = computed(() => currentPage.value === totalPages.value);
const isPrevPageButtonDisabled = computed(() => currentPage.value === 1);
</script>

<style scoped></style>
