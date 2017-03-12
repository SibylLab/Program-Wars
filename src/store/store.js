import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

import Card from '../classes/Card'

export const store = new Vuex.Store({
    state: {
        players: [
          {
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
          }
          // {
          //   id: 2,
          //   name: "player2",
          //   hand: 1,
          //   score: 0
          // },
          // {
          //   id: 3,
          //   name: "player2",
          //   hand: 1,
          //   score: 0
          // }
        ],
        stacks: [
          // { stackId:1,
          //   playerId:1,
          //   boolSide: true,
          //   cards: [
          //     new Card(0, 'I')
          //   ],
          //   score: 0
          // }
        ],
        deck: [

        ],
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
