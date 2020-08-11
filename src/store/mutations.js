import router from '@/router'

export default {
  seenBackstory (state) {
    state.showBackstory = false
  },

  setPage (state, { page }) {
    state.page = page
      this.commit('updateMethodCardValues', {player: payload.target})

    this.commit('updateMethodCardValues', payload)
    // Remove a SQLINJECTION next if there is one
    let sqlinjection = payload.target.negativeEffects.filter(e => e.type === 'SQLINJECTION')
    if (sqlinjection.length > 0) {
      payload.target.removeEffect(sqlinjection[0])
      bus.$emit('scan-effect', 'SQLINJECTION')
      this.commit('updateMethodCardValues', payload)
      return
    }

    // Remove a STACKOVERFLOW next if there is one
    let stackoverflow = payload.target.negativeEffects.filter(e => e.type === 'STACKOVERFLOW')
    if (stackoverflow.length > 0) {
      payload.target.removeEffect(stackoverflow[0])
      bus.$emit('scan-effect', 'STACKOVERFLOW')
      return
    }

  },

  changePage (state, { page }) {
    state.page = page
    if (page === 'home') {
      router.push('/')
    } else {
      router.push(page)
    }
  },

  pushGameState (state, { gameState }) {
    state.game = gameState
    if (payload.player.hurtBy('SQLINJECTION')) {
      attack = 'SQL'
    }

    let value = state.methods.find(m => m.playerId === payload.player.id).getScore(attack)
  }
}
