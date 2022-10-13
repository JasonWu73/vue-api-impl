import axios from 'axios';
import NProgress from 'nprogress';
import router from '@/router';
import { useAuthStore } from '@/stores/auth.js';

const apiClient = axios.create({
  baseURL: window?._CONFIG?.baseUrl || window.location.origin,
  timeout: 10_000
});

apiClient.interceptors.request.use(
  async config => {
    NProgress.start();

    const auth = useAuthStore();
    // 若访问的是非获取/刷新 Access Token 相关的接口时, 则触发跳转登录页, Access Token 自动刷新, 设置 Authorization 请求头等
    if (!config.url.split('?')[0].startsWith('/api/v1/token')) {
      // 当未登录时, 则跳转至登录页
      if (!auth.isLoggedIn()) {
        const previousUrl = router.options.history.state.current;
        await router.push(`/login${ previousUrl === '/login' ? '' : `?redirect=${ previousUrl }` }`);
        return config;
      }

      // 只有当用户已登录, 且当前 Token 有效期时间小于等于 10 分钟时刷新 Token
      const current = Math.floor(new Date().getTime() / 1000);
      if (auth.tokenData.expiredAt - current <= 10 * 60) {
        await auth.refreshLogin();
      }

      // 自动给所有请求增加 `Authorization` 请求头
      const accessToken = auth.tokenData.accessToken;
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
  async error => {
    NProgress.done();

    // 当返回 401 HTTP 状态码 (即 Token 鉴权失败)时, 则需清空登录缓存, 并跳转至登录页
    if (error?.response?.status === 401) {
      const auth = useAuthStore();
      await auth.logout();
    }
    return Promise.reject(error);
  }
);

export const api = {
  version: {
    load: async () => {
      try {
        return await apiClient.get('/api/v1/version');
      } catch (error) {
        throw new Error(error.data.message);
      }
    }
  },
  auth: {
    getToken: async ({ username, password }) => {
      try {
        return await apiClient.post('/api/v1/token', { username, password });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    refreshToken: async ({ refreshToken }) => {
      try {
        return await apiClient.post(`/api/v1/token/${ refreshToken }`);
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    changePassword: async ({ oldPassword, newPassword }) => {
      try {
        return await apiClient.put('/api/v1/user/passwd', { oldPassword, newPassword });
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    }
  }
};
