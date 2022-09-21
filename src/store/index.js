import { createStore } from 'vuex';
import auth from './auth';
import api from '@/api.js';

export default createStore({
  state() {
  },
  getters: {},
  mutations: {},
  actions: {
    async getVersion() {
      const response = await api.get('/api/v1/version');
      return response.data;
    }
  },
  modules: {
    auth
  }
});
