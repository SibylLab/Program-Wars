export default {
  seenBackstory (state) {
    state.showBackstory = false
  },

  changePage (state, { page }) {
    state.page = page
  },

  pushGameState (state, { gameState }) {
    state.pageState = gameState
  }
}
