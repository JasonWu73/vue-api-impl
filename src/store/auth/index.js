import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      accessToken: '',
      refreshToken: '',
      expiresIn: 0,
      username: '',
      nickname: '',
      authorities: [],
      expiredAt: 0
    };
  },
  getters,
  mutations,
  actions
};
