import { defineStore } from 'pinia';
import { ref } from 'vue';
import md5 from 'md5';
import {RecentQuery} from '../domain/types';

export const useRecentQueriesStore = defineStore('queries.recent', () => {
  const rawExistingQueries = window.localStorage.getItem('recentQueries');
  const recentQueries: RecentQuery[] = rawExistingQueries ? JSON.parse(rawExistingQueries) : [];

  const queries = ref<RecentQuery[]>([...recentQueries]);


  function saveQuery(sql: string) {
    const query: RecentQuery = {
      id: md5(sql),
      sql,
      lastRanAt: Date.now(),
    };

    const existingIndex = queries.value.findIndex((q) => q.id === query.id);
    if (existingIndex !== -1) {
      queries.value.splice(existingIndex, 1, query);
    } else {
      queries.value.push(query);
    }

    window.localStorage.setItem('recentQueries', JSON.stringify(queries.value));
  }

  return { queries, saveQuery };
});
