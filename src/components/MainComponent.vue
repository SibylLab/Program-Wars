<template>
  <div class="hello">
    <ul id="example-1">
      <li v-for="player in players">
        <opponent-stacks :player="player"></opponent-stacks>
      </li>
    </ul>
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

import OpponentStacks from './OpponentStacks'

import Card from '../classes/Card'
import Player from '../classes/Player'

export default {
  name: 'main-component',
  data () {
    return {
      msg: 'Welcome to Programming Wars!!',
      idCounter:0
    }
  },
  methods: {
    initGame(){
        this.$store.commit('initDeck');

    },
    fillHands() {
        for(let player of this.$store.getters.getPlayers) {
          this.$store.commit('addHandToPlayer', player.id)
        }
    },
    addStacksToPlayers() {
      for(let player of this.$store.getters.getPlayers) {
        this.$store.commit('addStackToPlayer', {playerId: player.id, boolSide: true})
        this.$store.commit('addStackToPlayer', {playerId: player.id, boolSide: false})
      }
    }
},
  computed: {
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
    },
    players() {
        return this.$store.getters.getPlayers.filter(player => player.id !== this.$store.getters.getCurrentPlayerId);
    }
  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield,
    'opponent-stacks': OpponentStacks
  },
  created: function () {

    let gameEventLoopTimer = setInterval(() => {
      console.log('gameEventLoop check')
      let gameState = this.$store.getters.getgameState

      if (gameState === 'startPlayerTurn') {
        this.$store.commit('setGameState', {gameState: 'playerTurn'})
        this.$store.commit('addCardToHand')

        if (this.$store.getters.getCurrentPlayerId === 0) {
          let j = Math.floor(Math.random() * 2);
          console.log('coin flip result ', j)
          if (j === 0) {
            this.$store.commit('setActiveSide', {activeSide: true} )
          } else {
            this.$store.commit('setActiveSide', {activeSide: false})
          }

          let players = this.$store.getters.getPlayers
          for (let player of players) {
              if (player.score >= 10) {
                  console.log('game over')

                  alert('player ' + player.name + ' wins!!!!')
                  location.reload();
              }
          }


        }
      }

    }, 500)



      //TODO: Should have startup game modal thing here.
      this.initGame()
      this.fillHands()
      this.addStacksToPlayers()

      //TODO: this alert should be a start game modal for setting game mode, num of players, etc
      alert("Welcome to a new game of Programming Wars!")

      this.$store.commit('setGameState', {gameState: 'startPlayerTurn'})
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
