/**
 * Includes getters for handy and non-trivial access to state members.
 * For access to these members use mapState in components.
 */
export default {
  /**
   * Returns the Hand object for the current player.
   */
  getCurrentPlayerHand (state) {
    return state.hands.find(h => h.playerId === state.activePlayer.id)
  },

  /**
   * Return a list of the current player's stacks.
   */
  getCurrentPlayerStacks (state) {
    return state.stacks.filter(st => st.playerId === state.activePlayer.id)
  },

  /**
   * Get AI handler for the current player.
   */
  getCurrentAiHandler (state) {
    return state.aiHandlers.find(h => h.playerId === state.activePlayer.id)
  },

  /**
   * Get attackable opponents given a card type.
   * Not for Hacking.
   */
  getAttackableOpponents (state) {
    const effect = state.activeCard.type
    return state.players.filter((p) => {
      return p.id !== state.activePlayerId && !p.isProtectedFrom(effect)
             && !p.hurtBy(effect)

    })
  },

  /**
   * Get a list of hackable opponents.
   */
  getHackableOpponents (state) {
    return state.players.filter((p) => {
      if (p.id === state.activePlayer.id || p.helpedBy('FIREWALL')) {
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
    return state.objectives.find(ob => ob.playerId === state.activePlayer.id)
  },

  /**
   * Tell if the program is in game state.
   */
  isGame (state) {
    return state.gameState === 'game'
  }
}

