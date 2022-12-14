<template>
  <div class="container mx-w-full h-full">
    <div class="flex h-full">
      <div class="flex-0 w-3/12 border-r border-gray-800">
        <div class="h-12 flex items-center px-4 border-b border-gray-800">
          <h1 class="text-blue-300 text-2xl">SQL Viewer</h1>
        </div>

        <div class="px-4 mt-2">
          <h2 class="text-gray-500">All tables</h2>
          <ul class="list-none mt-4">
            <li v-for="table in TABLES">
              <a
                href="#"
                class="text-sm text-white bg-gray-800 px-2 py-1.5 rounded"
                @click="onClickTable(table)"
                >{{ table.name }}</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="flex-auto w-9/12">
        <div class="border-b border-gray-800 px-4 text-2xl h-12"></div>
        <div class="pb-8">
          <TabPanel v-model:tab-id="currentTabId" />

          <component :is="mainTabViewComponent" @run="onRun" class="mt-6 pl-2" />
        </div>
      </div>
    </div>

    <QueryFormDialog v-if="isFormDialogVisible" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { TABLES } from './defaults';
import QueryFormDialog from './components/QueryFormDialog/QueryFormDialog.vue';
import TabPanel from './components/TabPanel/TabPanel.vue';
import TabViewQuery from './components/TabViewQuery/TabViewQuery.vue';
import TabViewSaved from './components/TabViewSaved/TabViewSaved.vue';
import TabViewRecent from './components/TabViewRecent/TabViewRecent.vue';
import { useQueryTabStore } from './stores/queryTabStore';
import { TAB_VIEW_QUERY, TAB_VIEW_RECENT, TAB_VIEW_SAVED } from './components/TabPanel/types';
import ApiClient from './api/client';
import { useRecentQueriesStore } from './stores/recentQueries';
import { Table } from './domain/types';
import { useFormDialogStore } from './stores/formDialog';
import { storeToRefs } from 'pinia';

const formDialogStore = useFormDialogStore();
const queryTabStore = useQueryTabStore();
const recentQueriesStore = useRecentQueriesStore();

const currentTabId = ref(TAB_VIEW_QUERY.id);
const { isVisible: isFormDialogVisible } = storeToRefs(formDialogStore);

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

  // Running a query from the `Saved` tab should switch to the `Query` tab
  // and set the editor's contents to the SQL statement that's being run.
  currentTabId.value = TAB_VIEW_QUERY.id;

  queryTabStore.setEditorContents(sql);
  queryTabStore.setIsRunning(true);

  const data = await ApiClient.query(sql);

  queryTabStore.setQueryResults(data);

  queryTabStore.setIsRunning(false);
};

const onRun = async (sql: string) => runQuery(sql);

const onClickTable = (table: Table) => runQuery(table.sql);
</script>
