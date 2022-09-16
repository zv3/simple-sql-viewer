<template>
  <div class="container mx-auto">
    <div class="flex">
      <div class="flex-auto">
        <h2>All tables</h2>
        <ul class="list-none">
          <li v-for="table in tables">
            <a class="">{{ table.name }}</a>
          </li>
        </ul>
      </div>

      <div class="flex-auto">
        <div class="my-8">
          <TabPanel v-model="currentTab" />

          <component :is="mainTabViewComponent" />
        </div>
      </div>
    </div>

    <div class="my-8"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import TabPanel from './components/TabPanel/TabPanel.vue';
import TabViewQuery from './components/TabViewQuery/TabViewQuery.vue';
import TabViewSaved from './components/TabViewSaved/TabViewSaved.vue';
import TabViewRecent from './components/TabViewRecent/TabViewRecent.vue';
import { TAB_VIEW_QUERY, TAB_VIEW_RECENT, TAB_VIEW_SAVED } from './components/TabPanel/types';

const currentTab = ref(TAB_VIEW_QUERY);

const mainTabViewComponent = computed(() => {
  switch (currentTab.value) {
    case TAB_VIEW_SAVED:
      return TabViewSaved;
    case TAB_VIEW_RECENT:
      return TabViewRecent;
    case TAB_VIEW_QUERY:
    default:
      return TabViewQuery;
  }
});
</script>

<style scoped></style>
