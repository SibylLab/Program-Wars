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
    }
  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield
  },
  created: function () {
      //TODO: Should have startup game modal thing here.
      this.initGame()
      this.fillHands()
      this.addStacksToPlayers()

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
