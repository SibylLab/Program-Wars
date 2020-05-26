import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import Deck from '../classes/Models/Deck'


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
    deck: new Deck(),
    gameState: 'newGame',
    activePlayerId: 0,
    activeCard: undefined,
    scoreLimit: 5500,
    tips: {tutorial: true, factIndex: 0},
    colorScheme: {},
    timerInterval: undefined,
  },

  getters,
  mutations,
  actions
})
