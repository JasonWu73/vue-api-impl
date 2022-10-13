import { defineStore } from 'pinia';
import { api } from '@/api.js';

export const useVersionStore = defineStore('version', () => {
  const getVersion = async () => {
    const response = await api.version.load();
    return response.data;
  };

  return { getVersion };
});
