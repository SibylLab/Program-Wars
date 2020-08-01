import Home from '@/pages/pageStates/Home'
import BeginnerGame from '@/pages/pageStates/BeginnerGame'
import StandardGame from '@/pages/pageStates/StandardGame'
import Requirements from '@/pages/pageStates/Requirements'
import DeckSetup from '@/pages/pageStates/DeckSetup'
// import AgileGame from '@/pages/pageStates/AgileGame'
import router from '@/router'

export default {
  startHomePage ({ commit }) {
    commit('changePage', { page: 'home' })
    commit('changePageState', { pageState: new Home() })
    router.push('/')
  },

  startBeginnerGame ({ commit }, { players }) {
    commit('changePage', { page: 'beginner' })
    commit('changePageState', { pageState: new BeginnerGame(players) })
    router.push('beginner')
  },

  startStandardGame ({ commit }, { players }) {
    commit('changePage', { page: 'standard' })
    commit('changePageState', { pageState: new StandardGame(players) })
    router.push('standard')
  },

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
    /*
    commit('changePage', { page: 'agile' })
    commit('changePageState', { pageState: new AgileGame(players) })
    router.push('agile')
    */
    dispatch('startHomePage')
  },

  leaveGame ({ commit }) {
    commit('changePage', { page: 'home' })
    commit('seenBackstory')
    this.dispatch('startHomePage')
  }

}





