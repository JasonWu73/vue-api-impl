import api from '@/api.js';
import router from '@/router';

let timer;

export default {
  async login(context, { username, password }) {
    try {
      const response = await api.post('/api/v1/token', { username, password });
      await context.dispatch('authenticate', response.data);
    } catch (error) {
      throw new Error(error.response.data?.error || error.message);
    }
  },
  async refreshLogin(context) {
    const response = await api.post(`/api/v1/token/${ context.getters.refreshToken }`);
    await context.dispatch('authenticate', response.data);
  },
  async logout(context, { isAuto = false } = {}) {
    // 取消自动注销计时器
    timer && clearTimeout(timer) && (timer = null);

    // 清空登录缓存
    context.commit('setAuthentication', {
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
      username: '',
      nickname: '',
      authorities: [],
      expiredAt: 0
    });
    localStorage.removeItem('auth');

    // 自动注销时，跳转至登录页，并记录跳转前的页面地址
    if (isAuto) {
      const previousUrl = router.options.history.state.current;
      await router.push(`/login?redirect=${ previousUrl }`);
    } else {
      await router.push('/login');
    }
  },
  authenticate(context, payload) {
    // 保存登录缓存（Vuex + Local Storage）
    const { accessToken, refreshToken, expiresIn, username, nickname, authorities } = payload;
    let expiredAt = payload.expiredAt;
    if (!expiredAt) {
      const current = Math.floor(new Date().getTime() / 1000);
      expiredAt = current + expiresIn;
    }
    context.commit('setAuthentication', {
      accessToken,
      refreshToken,
      expiresIn,
      username,
      nickname,
      authorities,
      expiredAt
    });
    localStorage.setItem('auth', JSON.stringify({ ...payload, expiredAt }));

    // 设置自动注销计时器
    // 先取消上一个注销计时器，避免存在多个计时任务造成干扰
    timer && clearTimeout(timer) && (timer = null);
    timer = setTimeout(async () => {
      await context.dispatch('logout', { isAuto: true });
    }, expiresIn * 1000);
  },
  async tryLogin(context) {
    const auth = localStorage.getItem('auth') && JSON.parse(localStorage.getItem('auth'));
    auth && await context.dispatch('authenticate', auth);
  },
  async changePassword(context, { oldPassword, newPassword }) {
    try {
      await api.post('/api/v1/user/passwd', { oldPassword, newPassword });
      await context.dispatch('logout');
    } catch (error) {
      throw new Error(error.response.data?.error || error.message);
    }
  }
};
