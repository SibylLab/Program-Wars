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

  inGame (state) {
    return state.page === 'beginner' || state.page === 'standard'
  }
}

