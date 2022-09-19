<template>
  <div class="container mx-w-full h-full">
    <div class="flex h-full">
      <div class="flex-0 w-3/12 border-r border-gray-800 mr-2">
        <h1 class="text-blue-300 border-b border-gray-800 px-4 text-2xl py-2">SQL Viewer</h1>

        <div class="px-4 mt-2">
          <h2 class="text-gray-500">All tables</h2>
          <ul class="list-none mt-4">
            <li v-for="table in Tables">
              <a href="#" class="text-sm text-white bg-gray-800 px-2 py-1.5 rounded" @click="onClickTable(table)">{{ table.name }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-auto w-9/12">
        <div class="mt-4 pb-8">
          <TabPanel v-model:tab-id="currentTabId" />

          <component :is="mainTabViewComponent" @run="onRun" />
        </div>
      </div>
    </div>

    <QueryFormDialog />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Tables from './tables';
import QueryFormDialog from './components/QueryFormDialog/QueryFormDialog.vue';
import TabPanel from './components/TabPanel/TabPanel.vue';
import TabViewQuery from './components/TabViewQuery/TabViewQuery.vue';
import TabViewSaved from './components/TabViewSaved/TabViewSaved.vue';
import TabViewRecent from './components/TabViewRecent/TabViewRecent.vue';
import { useQueryTabStore } from './stores/queryTabStore';
import { TAB_VIEW_QUERY, TAB_VIEW_RECENT, TAB_VIEW_SAVED } from './components/TabPanel/types';
import ApiClient from './api/client';
import { useRecentQueriesStore } from './stores/recentQueries';
import {Table} from "./domain/types";

const queryTabStore = useQueryTabStore();
const recentQueriesStore = useRecentQueriesStore();
const currentTabId = ref(TAB_VIEW_QUERY.id);

const mainTabViewComponent = computed(() => {
  switch (currentTabId.value) {
    case TAB_VIEW_SAVED.id:
      return TabViewSaved;
    case TAB_VIEW_RECENT.id:
      return TabViewRecent;
    case TAB_VIEW_QUERY.id:
    default:
      return TabViewQuery;
  }
});

const runQuery = async (sql: string) => {
  recentQueriesStore.saveQuery(sql);

  queryTabStore.setEditorContents(sql);
  queryTabStore.setIsRunning(true);

  const data = await ApiClient.query(sql);

  queryTabStore.setQueryResults(data);

  queryTabStore.setIsRunning(false);
}

const onRun = async (sql: string) => {
  currentTabId.value = TAB_VIEW_QUERY.id;

  return runQuery(sql);
};

const onClickTable = (table: Table) => {
  queryTabStore.setCurrentTable(table);

  return runQuery(table.sql);
}
</script>

<style scoped></style>
