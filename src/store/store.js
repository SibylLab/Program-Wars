import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'


/**
 * Holds all game objects and state.
 */
export const store = new Vuex.Store({
  state: {
    players: [],
    stacks: [],
    hands: [],
    aiHanlders: [],
    objectives: [],
    deck: undefined,
    gameState: 'home',
    activePlayer: undefined,
    activeCard: undefined,
    scoreLimit: 75,
    tips: {showTips: true, factIndex: 0},
    timer: undefined,
    showBackstory: true
  },

  getters,
  mutations,
  actions
})
