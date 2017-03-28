import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import Card from '../classes/Card'
import Player from '../classes/Player'
import Deck from '../classes/Deck'

export const store = new Vuex.Store({
    state: {
        players: [
          /*new Player(0,'Jon',0,0),
          new Player(1,'Dustin',1,0),
          new Player(2,'Josh',2,0),
          new Player(3,'Lance',3,0),
          new Player(4,'Shaun',4,0)*/
        ],
        stacks: [
        ],
        deck: new Deck(),
        hands: [
        ],
        currentGameState: 'newGame',
        activeSide: true,
        activePlayer: 0,
        activeHasPlayed: false,
        currentId: 0,
        activeCard: undefined,
        selectedStacks: [],
        selectedStackBoolean: undefined,
        scoreLimit: 10
    },
    originalState: {
  players: [
    /*new Player(0,'Jon',0,0),
     new Player(1,'Dustin',1,0),
     new Player(2,'Josh',2,0),
     new Player(3,'Lance',3,0),
     new Player(4,'Shaun',4,0)*/
  ],
    stacks: [
  ],
    deck: new Deck(),
    hands: [
  ],
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
