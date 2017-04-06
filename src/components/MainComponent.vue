<template>
  <div>
    <div id="header">
      <p>Programming Wars</p>
      <span id="header-buttons">
        <button class="btn btn-primary" v-on:click="startANewGame">
        New Game
      </button>
        <button class="btn btn-primary" v-on:click="showCredits">
        Credits
      </button>
      </span>
    </div>

    <!--<modal :modalId="modalId" :modalTitle="gameOverWinner" :modalBody="gameOverText" :modalCards="modalCards" :modalCallback="()=> this.$router.push('/')"></modal>-->

    <player-info-panel></player-info-panel>
    <div id="flexcontainer">
      <div id="player-stacks">
        <h3>Your Stacks</h3>
        <div id="stacks">
          <playfield v-bind:trueFalse="true" :playerId="currentPlayerId"></playfield>
          <playfield :trueFalse="false" :playerId="currentPlayerId"></playfield>
        </div>
      </div>

      <div id="opponent-stacks" v-if="gameStart">
        <h3>Opponent Stacks</h3>


        <ul id="example-1">
          <li v-for="player in players">
            <opponent-stacks :player="player"></opponent-stacks>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>

import PlayerInfoPanel from './PlayerInfoPanel'
import Playfield from './Playfield'

import OpponentStacks from './OpponentStacks'
import Modal from './Modal'

import Card from '../classes/Card'
import Player from '../classes/Player'

export default {
  name: 'main-component',
  data () {
    return {
      idCounter:0,
      dataToggle: false,
      modalTitle: "Welcome to a new game of Programming Wars!",
      localPlayers: [],
      newPlayer: '',
      gameStart: false,
      showDismissCards: false,
      modalCards: [],
      gameOverWinner: "",
      gameOverText: "",
      modalId: "gameOverModal"
    }
  },
  methods: {
    submit() {
        console.log(this.newPlayer)
        if(this.newPlayer.length > 0 && this.localPlayers.indexOf(this.newPlayer) < 0) {
          this.localPlayers.push(this.newPlayer)
        }
    },
    submitPlayers() {
      this.$store.commit('addPlayers', {list: this.localPlayers});
      this.gameStart = true;
    },
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
    },
    startANewGame() {
      this.$router.push('/')
    },
    showCredits() {

    }
},
  computed: {
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
    },
    players() {
        return this.$store.getters.getPlayers.filter(player => player.id !== this.$store.getters.getCurrentPlayerId);
    },
    scoreLimit() {
        return this.$store.getters.getScoreLimit
    }

  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield,
    'opponent-stacks': OpponentStacks,
    'modal': Modal
  },
  created: function () {

    this.gameStart = true

    let gameEventLoopTimer = setInterval(() => {
      console.log('gameEventLoop check')
      let gameState = this.$store.getters.getgameState

      if (gameState === 'newGame') {

        $('#myModal').modal('toggle')
        this.$store.commit('setGameState', {gameState: 'waitingForPlayerInput'})
        this.gameStart = true


      } else if (gameState === 'initGame') {



    } else if (gameState === 'startPlayerTurn') {
        this.$store.commit('addCardToHand')

        this.$store.commit('setGameState', {gameState: 'midPlayerTurn'})

        if (this.$store.getters.getCurrentPlayerId === 0) {
          let j = Math.floor(Math.random() * 2);
          console.log('coin flip result ', j)
          if (j === 0) {
            this.$store.commit('setActiveSide', {activeSide: true})
          } else {
            this.$store.commit('setActiveSide', {activeSide: false})
          }

          let players = this.$store.getters.getPlayers
          for (let player of players) {
            if (player.score >= this.scoreLimit) {
              console.log('game over')

              this.gameOverWinner = "Congratulations " + player.name + ", you win!"
              this.gameOverText = player.name + " wins!"
              $('#'+this.modalId).modal('show')

              //$('').modal('show')

              document.removeEventListener('click', () => {console.log('removing event listener')})
              clearInterval(gameEventLoopTimer);

              //this.$router.go(-1)


            }
          }
        }
      }


    }, 500)


    this.$store.commit('setGameState', {gameState: 'newGame'})

    //TODO: Should have startup game modal thing here.
    this.initGame()
    this.fillHands()
    this.addStacksToPlayers()

    this.$store.commit('setGameState', {gameState: 'startPlayerTurn'})


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
  }

  #header > p {
    margin: 0px;
    font-weight: bold;
    font-size: 1.2em;
  }

#flexcontainer {
  width: 100%;
  display: flex;
  flex-direction: row;
}

#player-stacks {
  flex-grow: 1;
}

#opponent-stacks {
  min-width: 30%;
  max-width: 30%;
  flex-grow: 0;
}

#stacks {
  display: flex;
  flex-direction:row;
}

h1, h2 {
  font-weight: normal;
}

h1, h2, h3, h4, h5 {
  margin-top: 5px;
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
