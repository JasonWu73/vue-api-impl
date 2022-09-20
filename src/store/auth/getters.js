export default {
  accessToken(state) {
    return state.accessToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  expiresIn(state) {
    return state.expiresIn;
  },
  username(state) {
    return state.username;
  },
  nickname(state) {
    return state.nickname;
  },
  authorities(state) {
    return state.authorities;
  },
  expiredAt(state) {
    return state.expiredAt;
  },
  isLoggedIn(state, getters) {
    return !!getters.accessToken;
  }
};
