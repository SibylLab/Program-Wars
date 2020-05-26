/**
 * Includes getters for handy and non-trivial access to state members.
 * For access to these members use mapState in components.
 */
export default {
  /**
   * Returns the Hand object for the current player.
   */
  getCurrentPlayerHand (state) {
    return state.hands[state.activePlayerId]
  },

  /**
   * Returns the current players object.
   */
  getCurrentPlayer (state) {
    return state.players[state.activePlayerId]
  },

  /**
   * Return a list of the current player's stacks.
   */
  getCurrentPlayerStacks (state) {
    return state.stacks.filter(st => st.playerId === state.activePlayerId)
  },

  /**
   * Get AI handler for the current player.
   */
  getCurrentAiHandler (state) {
    return state.aiHandlers.find(h => h.playerId === state.activePlayerId)
  }
}

