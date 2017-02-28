import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

class Card {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }
}

export const store = new Vuex.Store({
    state: {
        players: [
          {
            id: 0,
            name: "shaun",
            hand: 2,
            score: 0
          }
        ],
        stacks: [
          { stackId:1,
            playerId:1,
            boolSide: true,
            cards: [
              new Card(0, 'I')
            ],
            score: 0
          }
        ],
        deck: [
          new Card(1, 'I'),
          new Card(2, 'I'),
          new Card(3, 'I'),
          new Card(4, 'I'),
          new Card(5, 'I')
        ],
        hands: [
          {
            handId: 0,
            playerId: 0,
            cards: [
              new Card(2, 'F'),
                new Card(2, 'F'),
                new Card(3, 'U'),
                new Card(4, 'U'),
                new Card(5, 'U')
            ]
          },
          {
            handId: 1,
            playerId: 1,
            cards: [
              new Card(69, 'J'),
              new Card(69, 'O'),
              new Card(69, 'H'),
              new Card(69, 'N'),
              new Card(69, 'Y')
            ]
          },
          {
            handId: 2,
            playerId: 2,
            cards: [
              new Card(4, 'Y'),
              new Card(9, 'O'),
              new Card(9, 'U'),
              new Card(8, 'F'),
              new Card(3, 'U')
            ]
          },
          {
            handId: 3,
            playerId: 3,
            cards: [
              new Card(69, 'K'),
              new Card(3, 'B'),
              new Card(9, 'O'),
              new Card(29, 'Y'),
              new Card(6, 'E')
            ]
          }
        ],
        currentTurn: 'phase',
        activeSide: true,
        activePlayer: 0,
        maxPlayers: 4
    },
    getters,
    mutations,
    actions
})
