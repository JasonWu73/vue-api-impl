import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { api } from '@/api.js';
import router from '@/router';

let timer;

export const useAuthStore = defineStore('auth', () => {
  const tokenData = reactive({
    accessToken: '',
    refreshToken: '',
    expiresIn: 0,
    username: '',
    nickname: '',
    authorities: [],
    expiredAt: 0
  });

  const setTokenData = ({
                          accessToken = '',
                          refreshToken = '',
                          expiresIn = 0,
                          username = '',
                          nickname = '',
                          authorities = [],
                          expiredAt = 0
                        }) => {
    tokenData.accessToken = accessToken;
    tokenData.refreshToken = refreshToken;
    tokenData.expiresIn = expiresIn;
    tokenData.username = username;
    tokenData.nickname = nickname;
    tokenData.authorities = authorities;
    tokenData.expiredAt = expiredAt;
  };

  const logout = async ({ isAuto = false } = {}) => {
    // 取消自动注销计时器
    timer && clearTimeout(timer) && (timer = null);

    // 清空登录缓存
    setTokenData({});
    localStorage.removeItem('auth');

    // 自动注销时, 跳转至登录页, 并记录跳转前的页面地址
    if (isAuto) {
      const previousUrl = router.options.history.state.current;
      await router.push(`/login?redirect=${ previousUrl }`);
    } else {
      await router.push('/login');
    }
  };

  const setLogin = (payload) => {
    // 保存登录缓存 (Pinia + LocalStorage)
    // 首次登录需要设置 Token 获取时间, 以便于判断是否快过期, 需要刷新 Token
    if (!payload.expiredAt) {
      const current = Math.floor(new Date().getTime() / 1000);
      payload.expiredAt = current + payload.expiresIn;
    }
    setTokenData(payload);
    localStorage.setItem('auth', JSON.stringify(payload));

    // 设置自动注销计时器
    // 先取消上一个注销计时器, 避免存在多个计时任务造成干扰
    timer && clearTimeout(timer) && (timer = null);
    timer = setTimeout(async () => {
      await logout({ isAuto: true });
    }, payload.expiresIn * 1000);
  };

  const login = async ({ username, password }) => {
    const response = await api.auth.getToken({ username, password });
    setLogin(response.data);
  };

  const refreshLogin = async () => {
    const response = await api.auth.refreshToken(tokenData.refreshToken);
    setLogin(response.data);
  };

  const tryLogin = async () => {
    const authData = localStorage.getItem('auth');
    const tokenData = authData && JSON.parse(authData);
    if (tokenData) {
      await setLogin(tokenData);
    }
  };

  const isLoggedIn = () => {
    return !!tokenData.accessToken;
  };

  const changePassword = async ({ oldPassword, newPassword }) => {
    await api.auth.changePassword({ oldPassword, newPassword });
    await logout();
  };

  return { tokenData, login, logout, refreshLogin, tryLogin, isLoggedIn, changePassword };
});
