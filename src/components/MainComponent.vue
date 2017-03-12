<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <player-info-panel></player-info-panel>
    <div id="flexcontainer">
      <playfield v-bind:trueFalse="true" :playerId="currentPlayerId"></playfield>
      <playfield :trueFalse="false" :playerId="currentPlayerId"></playfield>
    </div>
  </div>
</template>

<script>

import PlayerInfoPanel from './PlayerInfoPanel'
import Playfield from './Playfield'

import Card from '../classes/Card'


export default {
  name: 'main-component',
  data () {
    return {
      msg: 'Welcome to Programming Wars!!',
      idCounter:0
    }
  },
  methods: {
    generateRandomCard() {
      let types = ['V', 'I', 'Rx', 'R', 'G']

      let typeRand = this.getRandomInt(0, 5)

      let newCardType = types[typeRand]
      let newCardValue;
      switch (newCardType) {
        case 'V':
          newCardValue = this.getRandomInt(1, 5)
          break;
        case 'I':
          newCardValue = this.getRandomInt(1, 5)
          break;
        case 'Rx':
          newCardValue = 0
          break;
        case 'G':
          newCardValue = this.getRandomInt(1, 5)
          break;
        case 'R':
          newCardValue = this.getRandomInt(1, 5)
          break;

      }

      let cardId = this.idCounter
      this.idCounter += 1

      return new Card(cardId, newCardValue, newCardType)



    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    initGame(){
        // generate Instruction cards
        let cardId = 0

        for(let i = 0; i < 8; i++) {
          for (let i = 1; i < 4; i++) {
            this.$store.commit('addCardToDeck', new Card(cardId, i, 'I'))
            cardId++
          }
        }
      // generate fixed Repitition cards
      for(let i = 0; i < 2; i++) {
        for (let i = 2; i < 6; i++) {
          this.$store.commit('addCardToDeck', new Card(cardId, i, 'R'))
          cardId++
        }
      }

      // generate variable repetition cards
      for (let i = 0; i < 5; i++) {
        this.$store.commit('addCardToDeck', new Card(cardId, 0, 'Rx'))
        cardId++
      }

      // generate fixed Repitition cards
      for(let i = 0; i < 2; i++) {
        for (let i = 2; i < 7; i++) {
          this.$store.commit('addCardToDeck', new Card(cardId, i, 'G'))
          cardId++
        }
      }

      // generate variables cards
      for(let i = 0; i < 4; i++) {
        for (let i = 2; i < 5; i++) {
          this.$store.commit('addCardToDeck', new Card(cardId, i, 'V'))
          cardId++
        }
      }

      // generate variable cards
      for(let i = 0; i < 2; i++) {
        for (let i = 5; i < 7; i++) {
          this.$store.commit('addCardToDeck', new Card(cardId, i, 'V'))
          cardId++
        }
      }

      for (let i = 0; i < 5; i++) {
        this.$store.commit('addCardToDeck', new Card(cardId, 0, 'H'))
        cardId++
      }

      this.$store.commit('shuffleTheDeck')

      for (let player of this.$store.getters.getPlayers) {
        console.log("player: ", player)
        console.log("player id: ", player.id )
        this.$store.commit('addStackToPlayer', {boolSide:false, playerId:player.id})
        this.$store.commit('addStackToPlayer', {boolSide:true, playerId:player.id})

      }


    },
    fillHands() {
        for(let i = 0; i < this.$store.getters.maxplayers; i++) {
          this.$store.commit('addHandToPlayer', i)
        }
    }
},
  computed: {
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
    }
  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield
  },
  created: function () {
      this.initGame()
      this.fillHands()

//      while(true) {
//          console.log("game loop started")
//
//
//
//      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flexcontainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
