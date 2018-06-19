import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
import Deck from '../classes/Deck'
import TutorialDeck from '../classes/TutorialDeck.js'

/**
 * The store holds all of the information that vuex will store and use. The functions are seperated into different files.
 * @type {Store}
 */
export const store = new Vuex.Store({
  state: {
    players: [],
    stacks: [],
    deck: new Deck(),
    tutorialDeck: new TutorialDeck(),
    isTutorial: false,
    hands: [],
    currentGameState: 'newGame',
    displayObjModal: false,
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
    coinMsg: false,
    playerTurn: false,
    firstRound: true,
    aiTurn: false,
    trueSideColour: 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)',
    falseSideColour: 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)',
    isHack: false,
    isVirus: false,
    hackedPlayer: '',
    isDiscard: false,
    pointerEvent: 'pointer-events: none',
    factIndex: 0,
    tutorialStep: true,
    tutorialOver: false
  },

  originalState: {
    players: [],
    stacks: [],
    deck: new Deck(),
    tutorialDeck: new TutorialDeck(),
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
