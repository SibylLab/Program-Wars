import Home from '@/pages/pageStates/Home'
import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'
import Requirements from '@/pages/pageStates/Requirements'
import DeckSetup from '@/pages/pageStates/DeckSetup'
// import AgileGame from '@/pages/pageStates/AgileGame'
import router from '@/router'

export default {
  startHomePage ({ commit }) {
    commit('changeGameState', { state: 'home' })
    commit('changePageState', { pageState: new Home() })
    router.push('/')
  },

  startBeginnerGame ({ commit }, { players }) {
    commit('changeGameState', { state: 'beginner' })
    commit('changePageState', { pageState: new BeginnerGame(players) })
    router.push('beginner')
  },

  startStandardGame ({ commit }, { players }) {
    commit('changeGameState', { state: 'standard' })
    commit('changePageState', { pageState: new StandardGame(players) })
    router.push('standard')
  },

  startRequirements ({ commit }, { players }) {
    commit('changeGameState', { state: 'requirements' })
    commit('changePageState', { pageState: new Requirements(players) })
    router.push('requirements')
  },

  startDeckSetup ({ commit }, { players }) {
    commit('changeGameState', { state: 'decks' })
    commit('changePageState', { pageState: new DeckSetup(players) })
    router.push('decks')
  },

  startAgileGame ({ commit, dispatch }, { players }) {
    /*
    commit('changeGameState', { state: 'agile' })
    commit('changePageState', { pageState: new AgileGame(players) })
    router.push('agile')
    */
    dispatch('startHomePage')
  },

  leaveGame ({ commit }) {
    commit('changeGameState', { state: 'home' })
    commit('seenBackstory')
    this.dispatch('startHomePage')
  }

}





