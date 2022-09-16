<template>
  <div class="modal" :class="{ 'modal-open': open }">
    <div v-if="open" class="modal-box">
      <button
        type="button"
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
        @click="onClickCloseButton"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>

      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <h3 class="font-bold text-lg">{{ props.title }}</h3>
        <slot
          ><p class="py-4">{{ props.description }}</p></slot
        >
        <div class="modal-action mt-10">
          <slot name="action"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

interface Props {
  title?: string;
  description?: string;
  open: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  open: false,
});

interface Emits {
  (e: 'close'): void;
}

const emits = defineEmits<Emits>();

const onClickCloseButton = () => {
  emits('close');
};
</script>

<style scoped></style>
