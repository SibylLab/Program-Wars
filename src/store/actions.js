import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'

export default {
  startBeginnerGame ({ commit }, { players, level }) {
    commit('pushGameState', { gameState: new BeginnerGame(players, level) })
    commit('changePage', { page: 'beginner' })
  },

  startStandardGame ({ commit }, { players, level }) {
    commit('pushGameState', { gameState: new StandardGame(players, level) })
    commit('changePage', { page: 'standard' })
  },

  leaveGame ({ commit }) {
    commit('seenBackstory')
    commit('changePage', { page: 'home' })
  }
}





