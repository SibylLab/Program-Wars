<template>
  <div id="maincontainer">
    <div id="header">
      <p>Programming Wars</p>
      <div style="margin-left: auto; padding: 0 10px 0 0">
      <label class="checkbox-inline"><input type="checkbox" value="true" v-model="tipsToggle" checked @click="toggleTipBox">TUTORIAL</label>
        </div>
        <div id="header-buttons">
        <button class="btn btn-primary"><router-link to="/">New Game</router-link></button>

        <button class="btn btn-primary" v-on:click="showCredits">
        Credits
      </button>
        <a class="btn btn-primary" href="https://github.com/sscullen/program-wars/issues/new" target="_blank">
        Report Issue
      </a>
      </div>
    </div>

    <modal :modalId="modalId" :cancel="false" :modalTitle="gameOverWinner" :modalBody="gameOverText" :modalCards="modalCards" :modalCallback="() => this.$router.push('/')"></modal>
    <modal :modalId="creditsModal" :cancel="false" :modalTitle="creditsModalTitle" :modalBody="creditsModalText" :modalCards="[]" :modalCallback="() => {}" :image="true"></modal>

    <div id="playerinfopanel">
      <player-info-panel></player-info-panel>
    </div>
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
        <div id="flex-opponent-stacks">
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
            <opponent-stacks v-for="player in players" :player="player"></opponent-stacks>
          </div>
      </div>
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

import { bus } from './Bus';

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
      modalId: "gameOverModal",
      creditsModal: "creditsModal",
      creditsModalTitle: "Programming Wars Credits and Change Log",
      tipsToggle: true
    }
  },
  methods: {
    toggleTipBox() {
      bus.$emit('tipsToggled');
    },
      showCredits() {

      },
    submit() {
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
    showCredits() {
      $('#'+this.creditsModal).modal('show')

    }
},
  computed: {
    creditsModalText() {
      let messageString =

        "Code by Dustin Fowler, Jonathan Vos, Josh Vandenhoek, Lance Chisholm, Shaun Cullen \n \
        Game Concept by Dr. John Anvik \n \
        Change Log: \n \
        v0.0.1\n \
        - working prototype\n \
        "
      return messageString
    },
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

      bus.$on('checkWin', () => {
        let players = this.$store.getters.getPlayers;

        for (let player of players) {
          if (player.score >= this.scoreLimit) {
            this.gameOverWinner = "Congratulations " + player.name + ", you win!"
            this.gameOverText = player.name + " wins!"
            $('#' + this.modalId).modal('show')

            document.removeEventListener('click', () => {
              console.log('removing event listener')
            })
            clearInterval(gameEventLoopTimer);
          }
        }
      });

    this.gameStart = true

    let gameEventLoopTimer = setInterval(() => {
      let gameState = this.$store.getters.getgameState
      if (gameState === 'newGame') {
        $('#myModal').modal('toggle')
        this.$store.commit('setGameState', {gameState: 'waitingForPlayerInput'})
        this.gameStart = true
      } else if (gameState === 'initGame') {
      } else if (gameState === 'startPlayerTurn') {
          this.$store.commit('addCardToHand')
        this.$store.commit('setGameState', {gameState: 'playerTurn'})

        if (this.$store.getters.getCurrentPlayerId === 0) {
          let j = Math.floor(Math.random() * 2);
          this.$store.commit('setTrueFalseAnim', {startAnim: true})
          if (j === 0) {
            this.$store.commit('setActiveSide', {activeSide: true})
          } else {
            this.$store.commit('setActiveSide', {activeSide: false})
          }

          setTimeout(() => {


            this.$store.commit('setTrueFalseAnim', {startAnim: false})

            this.$store.commit('setGameState', {gameState: 'playerTurn'})

          }, 3000);
        }

      }
    }, 500);

    this.initGame()
    this.fillHands()
    this.addStacksToPlayers()

    this.$store.commit('setGameState', {gameState: 'startPlayerTurn'})


  },
  mounted: function() {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#maincontainer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  min-height: inherit;

  }

#header {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
  flex-grow:0;
  }

#header > p {
  margin: 0px;
  font-weight: bold;
  font-size: 1.2em;
  }
#playerinfopanel {
  flex-grow:0;
  width: 100%;
}
#flexcontainer {
  display: flex;
  overflow: hidden;
  height: calc(100vh - 45px - 277.5px);
  position: relative;
  width: 100%;
}

#player-stacks {
  flex-grow: 1;
  max-height: 100%;
  height: 100%;
  min-height:100%;
}

#opponent-stacks {
  min-width: 30%;
  max-width: 30%;
  flex-grow: 0;

}

#flex-opponent-stacks {
  overflow-y: scroll;
  height: 87%;
  position: relative;
  width: 100%;
}

#stacks {
  display: flex;
  flex-direction:row;
  max-height: 100%;
  height: 100%;
  flex-wrap: nowrap;
}
::-webkit-scrollbar {
    display: none;
  }

#accordion {
  height: 40%;
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
  color: #fff;
}
</style>
