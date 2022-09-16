<template>
  <div class="flex items-center mb-1">
    <div class="flex-auto">
      <nav class="tabs" aria-label="Tabs" role="tablist">
        <button
          v-for="tab in TAB_VIEW_OPTIONS"
          type="button"
          class="tab"
          :class="{ 'tab-active': isTabActive(tab) }"
          role="tab"
          @click="onClickButton(tab)"
        >
          {{ tab.label }}
        </button>
      </nav>
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
