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
          <template v-if="queryResults.rows.length > 0">
            <tr
              :key="rowIndex"
              v-for="(row, rowIndex) in queryResults.rows"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ row[0] }}
              </th>

              <template v-for="(_, colIndex) in queryResults.columns">
                <td v-if="colIndex > 0" :key="colIndex"  class="py-4 px-6">
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
  </div>
</template>

<script setup lang="ts">
import {useQueryTabStore} from "../../stores/queryTabStore";
import {storeToRefs} from "pinia";

const queryTabStore = useQueryTabStore();
const { queryResults } = storeToRefs(queryTabStore);
</script>

<style scoped></style>
