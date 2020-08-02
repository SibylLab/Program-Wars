import Home from '@/pages/pageStates/Home'
import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'
// import Requirements from '@/pages/pageStates/Requirements'
// import DeckSetup from '@/pages/pageStates/DeckSetup'
// import AgileGame from '@/pages/pageStates/AgileGame'
import router from '@/router'

export default {
  startHomePage ({ commit }) {
    commit('changePage', { page: 'home' })
    router.push('/')
  },

  startBeginnerGame ({ commit }, { players, level }) {
    commit('changePage', { page: 'beginner' })
    commit('pushGameState', { gameState: new BeginnerGame(players, level) })
    router.push('beginner')
  },

  startStandardGame ({ commit }, { players, level }) {
    commit('changePage', { page: 'standard' })
    commit('pushGameState', { gameState: new StandardGame(players, level) })
    router.push('standard')
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
    this.dispatch('startHomePage')
  }
}





