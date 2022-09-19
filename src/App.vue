<template>
  <div class="container mx-auto">
    <div class="flex">
      <div class="flex-0 w-1/5">
        <h2>All tables</h2>
        <ul class="list-none">
          <li v-for="table in tables">
            <a class="">{{ table.name }}</a>
          </li>
        </ul>
      </div>

      <div class="flex-auto">
        <div class="my-8">
          <TabPanel v-model:tab-id="currentTabId" />

          <component :is="mainTabViewComponent" @run="onRun" />
        </div>
      </div>
    </div>

    <div class="my-8"></div>

    <QueryFormDialog />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import QueryFormDialog from './components/QueryFormDialog/QueryFormDialog.vue';
import TabPanel from './components/TabPanel/TabPanel.vue';
import TabViewQuery from './components/TabViewQuery/TabViewQuery.vue';
import TabViewSaved from './components/TabViewSaved/TabViewSaved.vue';
import TabViewRecent from './components/TabViewRecent/TabViewRecent.vue';
import { useQueryTabStore } from './stores/queryTabStore';
import { TAB_VIEW_QUERY, TAB_VIEW_RECENT, TAB_VIEW_SAVED } from './components/TabPanel/types';

const queryTabStore = useQueryTabStore();
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

const onRun = (sql: string) => {
  currentTabId.value = TAB_VIEW_QUERY.id;

  queryTabStore.setEditorContents(sql);
  queryTabStore.setIsRunning(true);
};
</script>

<style scoped></style>
