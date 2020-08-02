import Home from '@/pages/pageStates/Home'
import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'
// import Requirements from '@/pages/pageStates/Requirements'
// import DeckSetup from '@/pages/pageStates/DeckSetup'
// import AgileGame from '@/pages/pageStates/AgileGame'

export default {
  startBeginnerGame ({ commit }, { players, level }) {
    commit('pushGameState', { gameState: new BeginnerGame(players, level) })
    commit('changePage', { page: 'beginner' })
  },

  startStandardGame ({ commit }, { players, level }) {
    commit('pushGameState', { gameState: new StandardGame(players, level) })
    commit('changePage', { page: 'standard' })
  },

  /*
  startRequirements ({ commit }, { players }) {
    commit('changePage', { page: 'requirements' })
    commit('changePageState', { pageState: new Requirements(players) })
    router.push('requirements')
  },

  startDeckSetup ({ commit }, { players }) {
    commit('changePage', { page: 'decks' })
    commit('changePageState', { pageState: new DeckSetup(players) })
    router.push('decks')
  },

  startAgileGame ({ commit, dispatch }, { players }) {
    commit('changePage', { page: 'agile' })
    commit('pushGameState', { pageState: new AgileGame(players) })
    router.push('agile')
    dispatch('startHomePage')
  },
  */

  leaveGame ({ commit }) {
    commit('seenBackstory')
    commit('changePage', { page: 'home' })
  }
}





