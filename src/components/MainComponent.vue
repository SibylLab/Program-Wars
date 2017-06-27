<template>
  <div id="maincontainer">

    <rules-modal id="rulesModal" class="modal fade rules" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: yellowgreen"></rules-modal>
    <credits-modal id="creditsModal" class="modal fade credits" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: mediumpurple"></credits-modal>
    <hack-modal id="hackModal" class="modal fade hack" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players" data-backdrop="static" data-keyboard="false"></hack-modal>
    <winner-modal id="winnerModal" class="modal fade winner" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false"
    :playerList="playerList"></winner-modal>


    <div id="header">
      <p>Programming Wars</p>
      <div style="margin-left: auto; padding: 0 10px 0 0">
      <label class="checkbox-inline"><input type="checkbox" value="true" v-model="tipsToggle" checked>TUTORIAL</label>
        <label class="checkbox-inline"><input type="checkbox" value="true" v-model="factsToggle" checked>FUN FACTS</label>
        </div>
        <div id="header-buttons">
        <button class="btn btn-primary"><router-link to="/" style="text-decoration: none">New Game</router-link></button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".rules">Rules</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".credits">Credits</button>
        <a class="btn btn-primary" href="https://github.com/johnanvik/program-wars/issues/new" target="_blank">Report Issue</a>
      </div>
    </div>
    <div id="playerinfopanel">
      <player-info-panel></player-info-panel>
    </div>
    <div id="flexcontainer">
      <div id="player-stacks">
        <h3>Your Stacks</h3>
        <div id="stacks">
          <playfield :trueFalse="true" :activeColour="this.$store.getters.getActiveSide" :playerId="currentPlayerId" :style="trueHighlighted" class="playfieldSides"></playfield>
          <playfield :trueFalse="false" :activeColour="!this.$store.getters.getActiveSide" :playerId="currentPlayerId" :style="falseHighlighted" class="playfieldSides"></playfield>
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
import RulesModal from './RulesModal.vue'
import CreditsModal from './CreditsModal.vue'
import HackModal from './HackModal.vue'
import WinnerModal from './WinnerModal.vue'


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
      tipsToggle: true,
      factsToggle: true,
      playerList: [],
      winner: '',
      winnerScore: 0

    }
  },
  methods: {
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
    }
},
  computed: {
    currentPlayerId() {
      return this.$store.getters.getCurrentPlayerId;
    },
    players() {
        return this.$store.getters.getPlayers.filter(player => player.id !== this.$store.getters.getCurrentPlayerId);
    },
    trueHighlighted() {
      if(this.$store.getters.getActiveSide) {
        return this.highlighted;
      } else {
        return ''
      }
    },
    falseHighlighted() {
      if(!(this.$store.getters.getActiveSide)) {
        return this.highlighted;
      } else {
        return ''
      }
    },
    highlighted() {
        return 'box-shadow: 0 0 15px 10px forestgreen';
    }
  },
  components: {
    'player-info-panel': PlayerInfoPanel,
    'playfield': Playfield,
    'opponent-stacks': OpponentStacks,
    'modal': Modal,
    'rules-modal': RulesModal,
    'credits-modal': CreditsModal,
    'hack-modal': HackModal,
    'winner-modal': WinnerModal

  },
  watch: {
    tipsToggle(val) {
        if(val === true && this.factsToggle === false) {
            this.factsToggle = true;
        }
        if(val === false) {
            bus.$emit('tutorialOff');
        }
        if(val) {
          bus.$emit('tutorialOn');
        }
        this.$store.commit('setTips', {tutorial: val, fact: this.factsToggle});
    },
    factsToggle(val) {
        if(val === false) {
            this.tipsToggle = false;
        }
        this.$store.commit('setTips', {tutorial: this.tipsToggle, fact: val});
    }
  },
  created: function () {
          this.playerList = this.$store.getters.getPlayers;

//    bus.$on('checkWin', () => {
//      this.playerList = this.$store.getters.getPlayers;
//      let highScore = 0;
//      for (let player of this.playerList) {
//        let score = 0;
//        if (this.$store.getters.getActiveSide) {
//          score = player.trueScore;
//        } else {
//          score = player.falseScore;
//        }
//        if (score >= this.$store.getters.getScoreLimit) {
//          if(score > highScore) {
//            highScore = score;
//            this.winner = player.name;
//            this.winnerScore = score;
//          }
//          $('.winner').modal('show');
//          this.$store.commit('setWinner', true);
//        }
//      }
//    });
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

//          bus.$emit('checkWin');

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
  min-width: inherit;
  /*height: inherit;*/

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

.playfieldSides{
  padding: 8px;
  margin: 0 10px 0 10px;
  border-radius: 5px;
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
