<template>
  <div class="flex items-center mb-1">
    <div class="flex-auto">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400"
        aria-label="Tabs"
        role="tablist"
      >
        <li class="mr-2">
          <button
            v-for="tab in TAB_VIEW_OPTIONS"
            type="button"
            class="py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            :class="{
              'text-blue-500 dark:hover:text-blue-500 dark:hover:bg-transparent pointer-events-none':
                isTabActive(tab),
            }"
            role="tab"
            @click="onClickButton(tab)"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>

    <div class="flex-0">
      <div id="tab-panel-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { TAB_VIEW_OPTIONS, TAB_VIEW_QUERY, TabViewOption } from './types';

interface Props {
  tabId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  tabId: () => TAB_VIEW_QUERY.id,
});

interface Emits {
  (e: 'update:tab-id', val: string): void;
}

const emits = defineEmits<Emits>();

const onClickButton = (tab: TabViewOption) => {
  emits('update:tab-id', tab.id);
};

const isTabActive = (tab: TabViewOption) => {
  return tab.id === props.tabId;
};
</script>

<style lang="postcss" scoped></style>
