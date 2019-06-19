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
    <coin-modal id="coinModal" class="modal fade coin" tabindex="1" role="dialog" aria-labelledby="" aria-hidden="true"></coin-modal>
    <transition name="fade">
      <player-turn v-if="playersTurn" style="z-index: 1"></player-turn>
    </transition>

    <transition name="fade">
      <hack-discard v-if="showMsg"></hack-discard>
    </transition>


    <div id="header" :style="mainBackgroundColour()">
      <p :style="mainTextColour()">Program Wars</p>
      <div style="margin-left: auto; padding: 0 10px 0 0">
      <label class="checkbox-inline" :style="mainTextColour()"><input type="checkbox" value="true" v-model="tipsToggle" checked>TUTORIAL</label>
        </div>
        <timer class="timer" ></timer>
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
        <a href="#" @click="() => {this.$router.push('/')}">New Game</a>
        <a href="#" data-toggle="modal" data-target=".rules">Rules</a>
        <a href="#" data-toggle="modal" data-target=".credits">Credits</a>
        <a href="#" data-toggle="modal" data-target=".themes">Themes</a>
        <a href="https://gitreports.com/issue/johnanvik/program-wars" target="_blank">Report Issue</a>
      </div>

      <!-- Use any element to open the sidenav -->
      <img @click="openNav()" src="/static/miscIcons/burgerIcon.png" style="width: 36px; height: 36px">

    </div>
    <div id="playerinfopanel" :style="deactivateClick">
      <player-info-panel></player-info-panel>
    </div>
    <div id="flexcontainer" :style="mainBackgroundColour()">
      <div id="player-stacks" style="padding-top: 12px">
        <div id="stacks" class="container" style="width: inherit;">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <methods-field id="methodsField" :trueFalse="true" :playerId="getCurrentPlayerId()" class="playfieldSides"></methods-field>
            </div>
            <div class="col-md-6 col-sm-6">
              <playfield :trueFalse="false" :playerId="getCurrentPlayerId()" class="playfieldSides"></playfield>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 300px; width: 100%;" :style="mainBackgroundColour()"></div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import PlayerInfoPanel from './PlayerInfoPanel'
import Playfield from '../SharedComponents/Playfield'
import MethodsField from '../SharedComponents/MethodsField'

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
        modalTitle: 'Welcome to a new game of Program Wars!',
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
        interval: undefined,
        sideNavOpen: false
      }
    },
    components: {
      HackDiscard,
      'player-info-panel': PlayerInfoPanel,
      'methods-field': MethodsField,
      'playfield': Playfield,
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
      openNav () {
        this.sideNavOpen = !this.sideNavOpen
        if (this.sideNavOpen) {
          document.getElementById('mySidenav').style.width = '250px'
        } else {
          document.getElementById('mySidenav').style.width = '0'
        }
      },
      closeNav () {
        this.sideNavOpen = !this.sideNavOpen
        document.getElementById('mySidenav').style.width = '0'
      },
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
  /**
   * This stops the function interval from running to prevent the main components from affecting each other and
   * stops from preventing the timers from ruining each other.
   */
    beforeRouteLeave (to, from, next) {
      this.resetState()
      clearInterval(this.interval)
      this.stopTimer()
      next()
    },
  /**
   * Called when the component is created (after mount) to run the game loop
   */
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

  .sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
    right: 0;
  }

  .sidenav a {
    padding: 0 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .sidenav a:hover {
    color: #f1f1f1;
  }

  .sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 3px;
    font-size: 36px;
    margin-left: 50px;
  }

  @media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }
</style>
