<template>
  <div>
    <div class="my-8">
      <QueryInput @input="onInputQuery" />
    </div>

    <div class="my-8">

    </div>
  </div>
</template>

<script setup lang="ts">
import QueryInput from "./components/QueryInput.vue";
import { ref } from 'vue';

const query = ref('');
const onInputQuery = (value: string) => {
  query.value = value;
}
</script>

<style scoped>

</style>
