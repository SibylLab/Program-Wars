export default {
  page (state) {
    return state.page
  },

  home (state) {
    return state.home
  },

  game (state) {
    return state.game
  },

  inBeginnerGame (state) {
    return state.page === 'beginner'
  },

  inGame (state) {
    return state.page === 'beginner' || state.page === 'standard'
  }
}

