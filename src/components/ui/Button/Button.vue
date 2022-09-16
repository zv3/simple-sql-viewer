<template>
  <button
    type="button"
    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
    @click="onClickButton"
  >
    <slot name="prefix"></slot>
    <slot>{{ props.label }}</slot>
    <slot name="suffix"></slot>
  </button>

  <button
    type="button"
    class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all cursor-not-allowed text-sm"
    disabled
  >
    Disabled
  </button>
</template>

<script setup lang="ts">
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './types';
import { computed, defineEmits } from 'vue';

const props = withDefaults(defineProps<ButtonProps>(), {
  label: '',
  size: ButtonSize.Default,
  color: ButtonColor.Blue,
  variant: ButtonVariant.Solid,
  disabled: false,
});

interface Emits {
  (e: 'click'): void;
}

const emits = defineEmits<Emits>();

const onClickButton = () => {
  emits('click');
};

const className = computed(() => {
  const classes = [
    'py-3',
    'px-4',
    'inline-flex',
    'justify-center',
    'items-center',
    'gap-2',
    'rounded-md',
    'border',
    'border-transparent',
    'font-semibold',
    'text-white',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'transition-all',
    'text-sm',
    'dark:focus:ring-offset-gray-800',
  ];

  switch (props.color) {
    case ButtonColor.Blue:
      classes.push(...['bg-blue-500', 'focus:ring-blue-500', 'hover:bg-blue-600']);
      break;
  }

  switch (props.variant) {
    case ButtonVariant.Solid:
      classes.push([]);
      break;
    case ButtonVariant.Ghost:
  }
});
</script>

<style scoped></style>
