/**
 * Includes getters for handy and non-trivial access to state members.
 * Cannot take payloads like mutations and actions without being made into
 * methods. See getPlayerScores for an example of this.
 *
 * A second param getters can be added after state. This can be used to access
 * other getters to avoid code duplication when necessary.
 * ie) someGetter (state, getter) {let hand = getters.getCurrentPlayerHand}
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
   * Get method for the current player.
   */
  getCurrentMethod (state) {
    return state.methods.find(m => m.playerId === state.activePlayer.id)
  },

  /**
   * Get AI handler for the current player.
   */
  getCurrentAiHandler (state) {
    return state.aiHandlers.find(h => h.player.id === state.activePlayer.id)
  },

  /**
   * Get attackable opponents given a card type.
   * Not for Hacking.
   */
  getAttackableOpponents (state) {
    const effect = state.activeCard.type
    return state.players.filter((p) => {
      return p.id !== state.activePlayer.id && !p.isProtectedFrom(effect)
             && !p.hurtBy(effect)
    })
  },

  /**
   * Get the base and adjusted scores for all players.
   *
   * Returns
   * {
   *   playerId: the player's id, 
   *   baseScore: the score without modifiers,
   *   score: the score with modifiers
   * }
   *
   * Creates a method on getters to avoid caching.
   * see https://vuex.vuejs.org/guide/getters.html#method-style-access
   */
  getPlayerScores: (state) => () => {
    let scores = state.players.map((p) => {
      return {playerId: p.id, score: 0, baseScore: 0}
    })

    for (let player of state.players) {
      let stacks = state.stacks.filter(s => s.playerId === player.id)
      let base = stacks.reduce((acc, stack) => {
        return acc + stack.getScore()
      }, 0)

      // Add or subtract bonus points from the players score
      let extra = 0
      if (player.hurtBy('RANSOM')) {
        let penalty = 10
        let ransomEffects = player.negativeEffects.filter(e => e.type === 'RANSOM')
        for (let effect of ransomEffects) {
          extra -= penalty
          let attackerScore = scores.find(s => s.playerId === effect.attackerId)
          attackerScore.score += penalty
        }
      }
      
      let score = scores.find(s => s.playerId === player.id)
      score.base = base
      // += base because players may be recieving bonuses from their ransoms
      score.score += base + Math.floor(extra)
    }
    return scores
  }
}

