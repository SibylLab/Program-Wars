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
    activePlayerId: 0,
    activeCard: undefined,
    scoreLimit: 5500,
    tips: {showTips: true, factIndex: 0},
    colorScheme: {},
    timer: undefined,
  },

  getters,
  mutations,
  actions
})
