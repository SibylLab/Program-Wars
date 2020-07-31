export default {
  seenBackstory (state) {
    state.showBackstory = false
  },

  changeGameState (state, payload) {
    state.gameState = payload.state
  }
}
