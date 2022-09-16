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
  tab?: TabViewOption;
}

const props = withDefaults(defineProps<Props>(), {
  tab: () => TAB_VIEW_QUERY,
});

interface Emits {
  (e: 'update:tab', val: TabViewOption): void;
}

const emits = defineEmits<Emits>();

const onClickButton = (tab: TabViewOption) => {
  emits('update:tab', tab);
};

const isTabActive = (tab: TabViewOption) => {
  return tab.id === props.tab.id;
};
</script>

<style lang="postcss" scoped></style>
