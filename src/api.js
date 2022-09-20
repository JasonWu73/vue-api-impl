import axios from 'axios';
import NProgress from 'nprogress';
import router from '@/router';
import store from '@/store';

let apiClient;
const initApiClient = config => {
  apiClient = axios.create({
    baseURL: `http://${ config.serverIp }:${ config.serverPort }`
  });

  apiClient.interceptors.request.use(
    async config => {
      NProgress.start();
      // 若访问的是非获取/刷新 Access Token 相关的接口时，则触发跳转登录页、Access Token 自动刷新、设置 Authorization 请求头等
      if (!config.url.split('?')[0].startsWith('/api/v1/token')) {
        // 当未登录时，则跳转至登录页
        if (!store.getters['auth/isLoggedIn']) {
          const previousUrl = router.options.history.state.current;
          await router.push(`/login${ previousUrl === '/login' ? '' : `?redirect=${ previousUrl }` }`);
          return config;
        }

        // 只有当用户已登录，且当前 Token 有效期时间小于等于 10 分钟时才刷新
        const current = Math.floor(new Date().getTime() / 1000);
        if (store.getters['auth/expiredAt'] - current >= 10 * 60) {
          await store.dispatch('auth/refreshLogin');
        }

        // 自动给所有请求增加 `Authorization` 请求头
        const accessToken = store.getters['auth/accessToken'];
        accessToken && (config.headers['Authorization'] = `Bearer ${ accessToken }`);
      }

      return config;
    }, error => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  apiClient.interceptors.response.use(
    response => {
      NProgress.done();
      return response;
    },
    error => {
      NProgress.done();

      // 当返回 401 HTTP 状态码（即 Token 鉴权失败）时，则需清空登录缓存，并跳转至登录页
      if (error.response.status === 401) {
        store.dispatch('auth/logout');
      }
      return Promise.reject(error);
    }
  );
};

export { apiClient, initApiClient };
