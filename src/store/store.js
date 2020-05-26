import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import Deck from '@/classes/Models/Deck'


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
    gameState: 'home',
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
