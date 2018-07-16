<template>
  <div id="maincontainer">
    <rules-modal id="rulesModal" class="modal fade rules" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: yellowgreen"></rules-modal>
    <credits-modal id="creditsModal" class="modal fade credits" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" style="background-color: mediumpurple"></credits-modal>
    <hack-modal id="hackModal" class="modal fade hack" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" :players="players" data-backdrop="static" data-keyboard="false"></hack-modal>
    <winner-modal id="winnerModal" class="modal fade winner" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false"
                  :playerList="playerList"></winner-modal>

    <tutorial-modal id="tutorialModal" class="modal fade tutorial" tabindex="-1" role="dialog" aria-labelledby=""
                    aria-hidden="true"
    ></tutorial-modal>
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
    <coin-modal id="coinModal" class="modal fade coin" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true"></coin-modal>
    <transition name="fade">
      <player-turn v-if="playerTurn()"></player-turn>
    </transition>

    <transition name="fade">
      <hack-discard v-if="showMsg"></hack-discard>
    </transition>

    <div id="header">
      <p>Programming Wars Tutorial</p>
      <timer class="timer" ></timer>
      <div id="header-buttons">
        <button class="btn btn-primary" @click="() => {this.$router.push('home');}">End Tutorial</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".rules">Rules</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".tutorial">Game Objectives</button>
        <button class="btn btn-primary" data-toggle="modal" data-target=".credits">Credits</button>
        <a class="btn btn-primary" href="https://programmingwars.cullen.io/reportissue/" target="_blank">Report Issue</a>
      </div>
    </div>
    <div id="playerinfopanel" :style="deactivateClick">
      <player-info-panel></player-info-panel>
    </div>
    <div id="flexcontainer">
      <div id="player-stacks">
        <h3>Your Stacks</h3>
        <div id="stacks" class="container" style="width: inherit;">
          <div class="row">
            <div class="col-md-6 col-sm-6">
              <playfield  :trueFalse="true" :playerId="currentPlayerId" :style="trueSideColour()" class="playfieldSides"></playfield>
            </div>
            <div class="col-md-6 col-sm-6">
              <playfield :trueFalse="false" :playerId="currentPlayerId" :style="falseSideColour()" class="playfieldSides"></playfield>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import PlayerInfoPanel from './TutorialPlayerInfoPanel'
  import Playfield from '../SharedComponents/Playfield'

  import OpponentStacks from '../SharedComponents/OpponentStacks'
  import Modal from '../Modals/Modal'
  import RulesModal from '../Modals/RulesModal.vue'
  import CreditsModal from '../Modals/CreditsModal.vue'
  import HackModal from '../Modals/CardModals/HackModal.vue'
  import WinnerModal from '../Modals/WinnerModal.vue'
  import TutorialModal from '../Modals/TutorialStartModal.vue'
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

  import {mapGetters, mapMutations, mapState, mapActions} from 'vuex'
  import { bus } from '../SharedComponents/Bus'

export default {
    name: 'TutorialComponent',
    data () {
      return {
        idCounter: 0,
        dataToggle: false,
        modalTitle: 'Welcome to the Programming Wars Tutorial!',
        localPlayers: [],
        newPlayer: '',
        gameStart: false,
        showDismissCards: false,
        modalCards: [],
        gameOverWinner: '',
        gameOverText: '',
        modalId: 'gameOverModal',
        tipsToggle: true,
        factsToggle: true,
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
      'tutorial-modal': TutorialModal,
      'virus-modal': VirusModal,
      'power-outage-modal': PowerOutageModal,
      'battery-backup-modal': BatteryBackup,
      'overclock-modal': Overclock,
      'firewall-modal': Firewall,
      'generator-modal': Generator,
      'anti-virus-modal': AntiVirus,
      'timer': Timer

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
        'getTutorialStep'
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
        'initTutorialDeck',
        'flipTutorialStep',
        'resetState'
      ]),
      ...mapActions([
        'firstRound',
        'turn',
        'coinAnimation'
      ]),
      ...mapState([
        'isHack',
        'isDiscard',
        'trueSideColour',
        'falseSideColour',
        'playerTurn',
        'pointerEvent',
        'currentGameState'
      ]),
      initGame () {
        this.initTutorialDeck()
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
      currentPlayerId () {
        return this.getCurrentPlayerId()
      },
      players () {
        return this.getPlayers().filter(player => player.id !== this.getCurrentPlayerId())
      },
      deactivateClick () {
        return this.pointerEvent
      },
      gameStateChanges () {
        return this.currentGameState
      }
    },
    beforeRouteLeave (to, from, next) {
      this.resetState()
      clearInterval(this.interval)
      next()
    },

    /**
     * Called when the component is created (after mount) to run the game loop
     */
    created () {
      this.playerList = this.getPlayers()
      this.gameStart = true
      this.interval = setInterval(() => {
        let gameState = this.getgameState()
        if (gameState === 'newGame') {
          this.setGameState({gameState: 'waitingForPlayerInput'})
          this.gameStart = true
        } else if (gameState === 'startPlayerTurn') {
          this.addCardToHand()
          this.setGameState({gameState: 'playerTurn'})
          if (this.getCurrentPlayerId() === 0) {
            this.setTrueFalseAnim({startAnim: true})
            if (this.getTutorialStep()) {
              this.setActiveSide({activeSide: true})
            } else {
              this.setActiveSide({activeSide: false})
            }
            this.flipTutorialStep()
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
    },
    /**
     * Called when the component is mounted to show the modals in a correct order
     */
    mounted () {
      $('#tutorialModal').modal('show')
      this.$nextTick(function () {
        // For some reason this has the opposite effect of what you would expect. The start Modal is shown first, and the tutorialModal second.
        $('#tutorialModal').on('hidden.bs.modal', () => {
          bus.$emit('playAnimation')
          this.coinAnimation()
        })
      })
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

  .timer {
    align-self: right;
    left: 50%;
    padding: 5px;
    border: solid black 2px;
    position: absolute;
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
