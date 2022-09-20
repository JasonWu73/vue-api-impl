export default {
  setAuthentication(state, { accessToken, refreshToken, expiresIn, username, nickname, authorities, expiredAt }) {
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
    state.expiresIn = expiresIn;
    state.username = username;
    state.nickname = nickname;
    state.authorities = authorities;
    state.expiredAt = expiredAt;
  }
};
