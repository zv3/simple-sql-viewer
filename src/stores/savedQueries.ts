import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { ref } from 'vue';
import { SavedQuery } from '../domain/types';

export const useSavedQueriesStore = defineStore('queries.saved', () => {
  const rawExistingQueries = window.localStorage.getItem('savedQueries');
  const savedQueries: SavedQuery[] = rawExistingQueries ? JSON.parse(rawExistingQueries) : [];

  const queries = ref<SavedQuery[]>([...savedQueries]);

  function persistQueries() {
    window.localStorage.setItem('savedQueries', JSON.stringify(queries.value));
  }

  function addQueryModel(query: SavedQuery) {
    const hydratedQuery = {
      ...query,
      id: uuid(),
      createdAt: Date.now(),
    };

    queries.value.push(hydratedQuery);

    persistQueries();
  }

  function deleteQueryModel(query: SavedQuery) {
    queries.value = queries.value.filter((q) => q.id !== query.id);

    persistQueries();
  }

  function updateQueryModel(query: SavedQuery) {
    const index = queries.value.findIndex((q) => q.id === query.id);

    if (index !== -1) {
      queries.value.splice(index, 1, query);

      persistQueries();
    }
  }

  function saveQueryModel(query: SavedQuery) {
    return query.id ? updateQueryModel(query) : addQueryModel(query);
  }

  return { queries, deleteQueryModel, saveQueryModel };
});
