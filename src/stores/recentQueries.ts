import { defineStore } from 'pinia';
import { ref } from 'vue';
import { RecentQuery } from '../domain/types';

export const useRecentQueriesStore = defineStore('queries.recent', () => {
  const rawExistingQueries = window.localStorage.getItem('recentQueries');
  const savedQueries: RecentQuery[] = rawExistingQueries ? JSON.parse(rawExistingQueries) : [];

  const queries = ref<RecentQuery[]>(savedQueries);

  function addQuery(query: RecentQuery) {
    queries.value.push(query);

    window.localStorage.setItem('savedQueries', JSON.stringify(queries));
  }

  return { queries, addQuery };
});
