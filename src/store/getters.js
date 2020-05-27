/**
 * Includes getters for handy and non-trivial access to state members.
 * For access to these members use mapState in components.
 */
export default {
  /**
   * Returns the Hand object for the current player.
   */
  getCurrentPlayerHand (state) {
    // Some getters use find so we don't have to worry
    // about maintaining positioning. The size of these arrays is so
    // small it should not make much difference.
    return state.hands.find(h => h.playerId === state.activePlayerId)
  },

  /**
   * Returns the current players object.
   */
  getCurrentPlayer (state) {
    return state.players.find(p => p.id === state.activePlayerId)
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
  },

  /**
   * Get attackable opponents given a card type.
   * Not for Hacking.
   */
  getAttackableOpponents (state, payload) {
    return state.players.filter((p) => {
      return p.id !== state.activePlayerId && !p.isProtectedFrom(payload.effect)
    })
  },

  /**
   * Get a list of hackable opponents.
   */
  getHackableOpponents (state) {
    return state.players.filter((p) => {
      if (p.id === state.activePlayerId || p.isProtectedFrom('HACK')) {
        return false
      }
      let stacks = state.stacks.filter(s => s.playerId === p.id && s.isHackable())
      return stacks.length > 0
    })
  },

  /**
   * Get current players objectives.
   */
  getCurrentPlayerObjectives (state) {
    return state.objectives.find(ob => ob.playerId === state.activePlayerId)
  },

  /**
   * Tell if the program is in game state.
   */
  isGame (state) {
    return state.gameState === 'game'
  }
}

