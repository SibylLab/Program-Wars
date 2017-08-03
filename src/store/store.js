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
      winner: false,
      winnerName: '',
      winnerScore: 0,
      isLast: false,
      tips: {tutorial: true, fact: true},
      currentOpponents: [],
      coinFlip: 0,
      coinMsg: '',
      playerTurn: false,
      firstRound: true,
      aiTurn: false,
      trueSideColour: 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)',
      falseSideColour: 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)',
      isHack: false
      pointerEvent: 'pointer-events: none'
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
