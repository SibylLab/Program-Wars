import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import Card from '../classes/Card'
import Player from '../classes/Player'
import Deck from '../classes/Deck'

export const store = new Vuex.Store({
    state: {
        players: [],
        stacks: [],
        deck: new Deck(),
        hands: [],
        currentGameState: 'newGame',
        activeSide: true,
        activePlayer: 0,
        activeHasPlayed: false,
        currentId: 0,
        activeCard: undefined,
        selectedStacks: [],
        selectedStackBoolean: undefined,
        scoreLimit: 10,
        groupStacks: false,
        trueFalseAnim: false,
        winner: false
    },
    originalState: {
      players: [],
        stacks: [],
        deck: new Deck(),
        hands: [],
        currentGameState: 'newGame',
        activeSide: true,
        activePlayer: 0,
        activeHasPlayed: false,
        currentId: 0,
        activeCard: undefined,
        selectedStacks: [],
        selectedStackBoolean: undefined
    },
    getters,
    mutations,
    actions
})
