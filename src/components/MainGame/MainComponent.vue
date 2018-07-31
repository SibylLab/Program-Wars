<template>
  <div id="maincontainer">
    <rules-modal id="rulesModal" class="modal fade rules" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: yellowgreen"></rules-modal>
    <themes-modal id="themesModal" class="modal fade themes" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></themes-modal>
    <credits-modal id="creditsModal" class="modal fade credits" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: mediumpurple"></credits-modal>
    <hack-modal id="hackModal" class="modal fade hack" tabindex="-1" role="dialog" aria-labelledby=""
                aria-hidden="true" :players="players" data-backdrop="static" data-keyboard="false"
    ></hack-modal>
    <virus-modal id="virusModal" class="modal fade virus" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                 data-backdrop="static" data-keyboard="false"></virus-modal>
    <power-outage-modal id="powerOutageModal" class="modal fade powerOutage" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                 data-backdrop="static" data-keyboard="false"></power-outage-modal>
    <battery-backup-modal id="batteryBackupModal" class="modal fade batteryBackup" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                        data-backdrop="static" data-keyboard="false"></battery-backup-modal>
    <overclock-modal id="overclockModal" class="modal fade overclock" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                          data-backdrop="static" data-keyboard="false"></overclock-modal>
    <firewall-modal id="firewallModal" class="modal fade firewall" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                     data-backdrop="static" data-keyboard="false"></firewall-modal>
    <generator-modal id="generatorModal" class="modal fade generator" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                     data-backdrop="static" data-keyboard="false"></generator-modal>
    <anti-virus-modal id="antiVirusModal" class="modal fade antiVirus" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players"
                     data-backdrop="static" data-keyboard="false"></anti-virus-modal>

    <winner-modal id="winnerModal" class="modal fade winner" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false"
    :playerList="playerList"></winner-modal>
    <coin-modal id="coinModal" class="modal fade coin" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></coin-modal>
    <transition name="fade">
      <player-turn v-if="playersTurn"></player-turn>
    </transition>

    <transition name="fade">
      <hack-discard v-if="showMsg"></hack-discard>
    </transition>


    <div id="header" :style="mainBackgroundColour()">
      <p :style="mainTextColour()">Programming Wars</p>
      <div style="margin-left: auto; padding: 0 10px 0 0">
      <label class="checkbox-inline"><input type="checkbox" value="true" v-model="tipsToggle" checked>TUTORIAL</label>
        </div>
        <timer class="timer" ></timer>
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
        <div id="header-buttons">
        <button class="btn btn-primary" @click="() => {this.$router.push('/')}">New Game</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".rules">Rules</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".credits">Credits</button>
          <button class="btn btn-primary" data-toggle="modal" data-target=".themes">Themes</button>
        <a class="btn btn-primary" href="https://gitreports.com/issue/johnanvik/program-wars" target="_blank">Report Issue</a>
        </div></div></div>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation"
                  style="margin-bottom: 0; padding-bottom: 0; height: 25px; vertical-align: middle">
            <span class="glyphicon glyphicon-align-justify" style="height: 20px; display: inline-block"></span>
          </button>

      </div>
    </div>
    <div id="playerinfopanel" :style="deactivateClick">
      <player-info-panel></player-info-panel>
    </div>
    <div id="flexcontainer" :style="mainBackgroundColour()">
      <div id="player-stacks" style="padding-top: 12px">
        <div id="stacks" class="container" style="width: inherit;">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <playfield  :trueFalse="true" :playerId="getCurrentPlayerId()" class="playfieldSides"></playfield>
            </div>
            <div class="col-md-6 col-sm-6">
              <playfield :trueFalse="false" :playerId="getCurrentPlayerId()" class="playfieldSides"></playfield>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 200px; width: 100%;" :style="mainBackgroundColour()"></div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import PlayerInfoPanel from './PlayerInfoPanel'
import Playfield from '../SharedComponents/Playfield'

import OpponentStacks from '../SharedComponents/OpponentStacks'
import Modal from '../Modals/Modal'
import RulesModal from '../Modals/RulesModal.vue'
import CreditsModal from '../Modals/CreditsModal.vue'
import HackModal from '../Modals/CardModals/HackModal.vue'
import WinnerModal from '../Modals/WinnerModal.vue'
import CoinModal from '../Modals/CoinModal.vue'
import PlayerTurn from '../SharedComponents/PlayerTurnPopUp.vue'
import HackDiscard from '../Modals/CardModals/HackDiscardMsg.vue'
import VirusModal from '../Modals/CardModals/VirusModal.vue'
import PowerOutageModal from '../Modals/CardModals/PowerOutageModal'
import BatteryBackup from '../Modals/CardModals/BatteryBackup'
import Overclock from '../Modals/CardModals/OverclockModal'
import AntiVirus from '../Modals/CardModals/AntiVirusModal'
import Generator from '../Modals/CardModals/Generator'
import Firewall from '../Modals/CardModals/Firewall'
import Timer from '../SharedComponents/Timer'

import Themes from '../Modals/ThemesModal'

import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'

import { bus } from '../SharedComponents/Bus'

export default {
    name: 'main-component',
    data () {
      return {
        idCounter: 0,
        dataToggle: false,
        modalTitle: 'Welcome to a new game of Programming Wars!',
        localPlayers: [],
        newPlayer: '',
        gameStart: false,
        showDismissCards: false,
        modalCards: [],
        gameOverWinner: '',
        gameOverText: '',
        modalId: 'gameOverModal',
        tipsToggle: true,
        playerList: [],
        winner: '',
        winnerScore: 0,
        deleteData: [],
        interval: undefined
      }
    },
    components: {
      HackDiscard,
      'player-info-panel': PlayerInfoPanel,
      'playfield': Playfield,
      'opponent-stacks': OpponentStacks,
      'modal': Modal,
      'rules-modal': RulesModal,
      'credits-modal': CreditsModal,
      'hack-modal': HackModal,

      'winner-modal': WinnerModal,
      'coin-modal': CoinModal,
      'player-turn': PlayerTurn,
      'hack-discard': HackDiscard,
      'virus-modal': VirusModal,
      'power-outage-modal': PowerOutageModal,
      'battery-backup-modal': BatteryBackup,
      'overclock-modal': Overclock,
      'firewall-modal': Firewall,
      'generator-modal': Generator,
      'anti-virus-modal': AntiVirus,
      'timer': Timer,
      'themes-modal': Themes

    },
    methods: {
      ...mapGetters([
        'getPlayers',
        'getActiveCard',
        'getPlayers',
        'getCurrentPlayerId',
        'getgameState',
        'getFirstRound',
        'getIsDiscard',
        'getIsHack',
        'getPlayerTurn',
        'getScoreLimit'
      ]),
      ...mapMutations([
        'initDeck',
        'addHandToPlayer',
        'addStackToPlayer',
        'setTips',
        'setTrueFalseAnim',
        'setActiveSide',
        'setGameState',
        'addCardToHand',
        'setFirstRound',
        'resetState',
        'stopTimer'

      ]),
      ...mapActions([
        'firstRound',
        'turn'
      ]),
      ...mapState([
        'isHack',
        'isDiscard',
        'trueSideColour',
        'falseSideColour',
        'pointerEvent',
        'currentGameState',
        'timerInterval',
        'mainBackgroundColour',
        'mainTextColour'
      ]),
      initGame () {
        this.initDeck()
      },
      fillHands () {
        for (let player of this.getPlayers()) {
          this.addHandToPlayer(player.id)
        }
      },
      addStacksToPlayers () {
        for (let player of this.getPlayers()) {
          this.addStackToPlayer({playerId: player.id, boolSide: true})
          this.addStackToPlayer({playerId: player.id, boolSide: false})
        }
      }
    },
    computed: {
      showMsg () {
        return (this.getIsHack() || this.getIsDiscard())
      },
      showVirus () {
        let c = this.getActiveCard()
        if (c !== undefined) {
          if (c.type === 'VIRUS') {
            $('.virus').modal('show')
            return true
          } else {
            return false
          }
        }
      },
      players () {
        return this.getPlayers().filter(player => player.id !== this.getCurrentPlayerId())
      },
      deactivateClick () {
        return this.pointerEvent
      },
      gameStateChanges () {
        return this.currentGameState
      },
      playersTurn () {
        return this.getPlayerTurn()
      }
    },

    watch: {
      tipsToggle (val) {
        if (val === false) {
          bus.$emit('tutorialOff')
        }
        if (val) {
          bus.$emit('tutorialOn')
        }
        this.setTips({tutorial: val})
      }
    },
    beforeRouteLeave (to, from, next) {
      this.resetState()
      clearInterval(this.interval)
      this.stopTimer()
      next()
    },
    created () {
      this.playerList = this.getPlayers()
      this.gameStart = true
      let j = Math.floor(Math.random() * 2)
      this.setTrueFalseAnim({startAnim: true})
      if (j === 0) {
        this.setActiveSide({activeSide: true})
      } else {
        this.setActiveSide({activeSide: false})
      }
      this.interval = setInterval(() => {
        let gameState = this.getgameState()
        if (gameState === 'newGame') {
          this.setGameState({gameState: 'waitingForPlayerInput'})
          this.gameStart = true
        } else if (gameState === 'startPlayerTurn') {
          this.addCardToHand()
          this.setGameState({gameState: 'playerTurn'})

          if (this.getCurrentPlayerId() === 0) {
            j = Math.floor(Math.random() * 2)
            this.setTrueFalseAnim({startAnim: true})
            if (j === 0) {
              this.setActiveSide({activeSide: true})
            } else {
              this.setActiveSide({activeSide: false})
            }
            if (this.getFirstRound()) {
              this.firstRound()
              this.setFirstRound(false)
            } else {
              this.turn(false)
            }
            setTimeout(() => {
              this.setTrueFalseAnim({startAnim: false})
              this.setGameState({gameState: 'playerTurn'})
            }, 3000)
          }
        }
      }, 500)
      this.initGame()
      this.fillHands()
      this.addStacksToPlayers()

      this.setGameState({gameState: 'startPlayerTurn'})
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
    min-width: inherit;
    overflow-y: auto;
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
    margin: 0;
    font-weight: bold;
    font-size: 1.2em;
  }

  #playerinfopanel {
    flex-grow:0;
    width: 100%;
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

  ::-webkit-scrollbar {
      display: none;
    }

  #accordion {
    height: 40%;
  }

  .playfieldSides{
    padding: 8px;
    border-radius: 15px;
    min-height: 375px;
  }

  .hacked {
    position: fixed;
    z-index: 10;
    top: 30%;
    left: 50%;
    width: 1100px;
    margin-left: -550px;
  }

  #hackStyle {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 220px;
    color: darkred;
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

  .timer{
    align-self: right;
    padding-right: 10px;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-leave-active {
    transition: opacity .5s;
    opacity: 0;
  }
</style>
