import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SavedQuery } from '../domain/types';

export const useFormDialogStore = defineStore('formDialog', () => {
  const isVisible = ref(false);
  const queryModel = ref<SavedQuery>({
    name: '',
    sql: '',
    description: '',
    createdAt: Date.now(),
  });

  function setVisibility(value: boolean) {
    isVisible.value = value;
  }

  function setQueryModel(value: SavedQuery) {
    queryModel.value = value;
  }

  return { isVisible, queryModel, setVisibility, setQueryModel };
});
