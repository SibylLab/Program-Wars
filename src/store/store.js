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
          new Player(0,'Jon',0,0),
          new Player(1,'Dustin',1,0),
          new Player(2,'Josh',2,0),
          new Player(3,'Lance',3,0),
          new Player(4,'Shaun',4,0)
          /*{
            id: 0,
            name: "player1",
            hand: 0,
            score: 0
          },
          {
            id: 1,
            name: "player2",
            hand: 1,
            score: 0
          },
          {
            id: 2,
            name: "player2",
            hand: 2,
            score: 0
          },
          {
            id: 3,
            name: "player2",
            hand: 3,
            score: 0
          }*/
          ],
        stacks: [
          /*{ stackId:1,
            playerId:1,
            boolSide: true,
            cards: [
              new Card(0, 'I')
            ],
            score: 0
          }*/
        ],
        deck: new Deck(),
        hands: [

        ],
        currentTurn: 'phase',
        activeSide: true,
        activePlayer: 0,
        currentId: 0,
        activeCard: undefined
    },
    getters,
    mutations,
    actions
})
