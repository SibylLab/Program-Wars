<template>
    <div id="player-info-panel" :style="pIPBackgroundColour()">
      <div id="tipContainer" v-if="getTips().tutorial">
        <div id="tipBox" class="container" :cardClicked="tipsCardSelected" style="font-size: 14px;">
          {{ tipsInfoText }}
        </div>
      </div>
      <div class="container" style="padding: 10px; width: 100%">
        <div>
      <div id="flexcontainer">
        <div class="container" style="width: 300px; margin-right: 20px; margin-left: 10px; align-items: center; -webkit-align-items: center">
        <div v-for="player in players" style="text-align: left; display: inline">
          <div style="float: left; margin-right: 10px;"><h4 :style="pIPTextColour()"><b><a @click="openModal" style="cursor: pointer; color: rgba(10,1,1,0.79); font-size: 17px; -webkit-align-items: center ">{{ player.name }}:</a></b></h4></div>
            <div class="row" style="width: 300px; height: auto; -webkit-align-items: center; margin-right: 0px; margin-left: 25px">
              <div class="row" :style="pIPTextColour()"></div>
              True Path:&nbsp;&thinsp;
              <meter :max="getScoreLimit()" min=0
                     :value="getScore(player.id).trueScore"
                     :high="getScoreLimit() * 0.75"
                     :low="getScoreLimit()/2"
                     :optimum="getScoreLimit()-5"
                     style="width: 150px"
              ></meter>
              <div class="row"></div>
                False Path:
                <meter :max="getScoreLimit()" min=0
                       :value="getScore(player.id).falseScore"
                       :high="getScoreLimit() * 0.75"
                       :low="getScoreLimit()/2"
                       :optimum="getScoreLimit()-5"
                       style="width:150px"
                ></meter>

            </div>
        </div>
        </div>
        <div class="container" style="width: 700px; float: left; margin: auto">
        <div class="row" style="width: 700px; align-content: center">
        <div id="cards">
          <ul id="example-1">
            <h5 style="vertical-align: center; margin-left: auto; margin-right: auto" :style="pIPTextColour()">Score Limit: <b>{{getScoreLimit()}}</b></h5>
            <h4 class="modal-title" :style="pIPTextColour()"><b>{{ currentPlayerName() }}</b>, It's Your Turn</h4>
              <li v-for="(card) in hand" style="margin-top: 5px">
                  <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
              </li>
          </ul>
        </div>
        </div>
        </div>
        <div class="row">
          <div id="controls" class="col-sm" style="height: 80px; justify-content: center; align-items: center">
            <button class="btn btn-primary btn-lg" v-on:click="discardSelected" style="border-radius: 40px">
              Discard
            </button>
          </div>
          <display-used-cards></display-used-cards>
        </div>
      </div>
      </div>
      </div>
    </div>
</template>

<script>
  /* eslint-disable no-undef */

import { bus } from '../SharedComponents/Bus'
import Card from '../SharedComponents/Card'
import Modal from '../Modals/Modal'
import StatsPanel from '../SharedComponents/StatsPanel'
import DisplayUsedCards from '../SharedComponents/DisplayUsedCards'

import {mapGetters, mapState, mapActions, mapMutations} from 'vuex'

export default {
    name: 'PlayerInfoPanel',
    data () {
      return {
        title: 'Player Info Panel',
        idCounter: 6,
        modalText: '',
        modalCards: [],
        tipsToggle: true,
        tipsCardSelected: 'Did you know?',
        tipsInfoText: 'You can toggle on or off this information window by checking the "FUN FACTS" box in the top right corner. ' +
      'You can also turn off the tutorials but keep the fun facts by checking the "TUTORIAL" box.'
      }
    },
    computed: {

      colSize () {
        let size = 12 / this.getPlayers().length
        return 'col-sm-6 col-md-' + size
      },
      players () {
        return this.getPlayers()
      },
      changeTrueFalse () {
        if (this.trueFalseAnim()) { return 'trueFalse' } else { return '' }
      },
      hasPlayed () {
        if (this.getHasPlayed()) { return 'hasPlayed' } else { return '' }
      },
      hand () {
        let hand = this.getCurrentPlayerHand()
        if (hand === null) {
          return []
        } else {
          return hand.cards
        }
      },
      activeSide () {
        let activeSideString = String(this.getActiveSide())
        return activeSideString.toUpperCase()
      }

    },
    components: {
      'card': Card,
      'modal': Modal,
      'stats-panel': StatsPanel,
      'display-used-cards': DisplayUsedCards
    },
    methods: {
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      ...mapGetters([
        'getPlayers',
        'getActiveCard',
        'getActiveSide',
        'getTips',
        'getTutorialState',
        'getHasPlayed',
        'getCurrentPlayer',
        'getScoreLimit',
        'getCurrentPlayerHand',
        'currentPlayerName',
        'getAiTurn'
      ]),
      ...mapMutations([
        'discardSelectedCard',
        'selectCard',
        'removeAllSelectedStacks',
        'setStackSelectedBoolean',
        'setActiveCardUndefined',
        'removeCard',
        'addCardToHand',
        'giveVirus',
        'givePowerOutage',
        'giveFirewall',
        'giveGenerator',
        'giveAntiVirus',
        'giveOverclock',
        'giveBatteryBackup',
        'setAiTurn'
      ]),
      ...mapState([
        'isDiscard',
        'aiTurn',
        'activeCard',
        'pIPBackgroundColour',
        'pIPTextColour'
      ]),
      getScore (player) {
        let trueSide = 0
        let falseSide = 0
        trueSide = this.getPlayers()[player].trueScore
        falseSide = this.getPlayers()[player].falseScore
        if (this.getPlayers()[player].hasVirus) {
          trueSide = trueSide * 0.75
          falseSide = falseSide * 0.75
        } else if (this.getPlayers()[player].hasOverclock) {
          trueSide = trueSide * 1.25
          falseSide = falseSide * 1.25
        }
        return {trueScore: trueSide, falseScore: falseSide}
      },
      openModal () {
        $('.hack').modal('show')
      },
      discardSelected () {
        if (this.getActiveCard() !== undefined) {
          this.tipsCardSelected = this.setTipBox('default')
          this.isDiscard = true
          setTimeout(() => {
            this.isDiscard = false
          }, 1250)
          this.discardSelectedCard()
          this.playerTookTurn()
          this.turn(true)
        }
      },
      cardClicked (c) {
        this.tipsCardSelected = this.setTipBox(c)
        let prevActive = this.getActiveCard()
        if (c.type === 'VIRUS') {
          $('.virus').modal('show')
        } else if (c.type === 'POWEROUTAGE') {
          $('.powerOutage').modal('show')
        } else if (c.type === 'BATTERYBACKUP') {
          $('.batteryBackup').modal('show')
        } else if (c.type === 'OVERCLOCK') {
          $('.overclock').modal('show')
        } else if (c.type === 'FIREWALL') {
          $('.firewall').modal('show')
        } else if (c.type === 'GENERATOR') {
          $('.generator').modal('show')
        } else if (c.type === 'ANTIVIRUS') {
          $('.antiVirus').modal('show')
        }

        this.selectCard(c)
        if (prevActive !== undefined) {
          if (c.type !== 'G' || c.id !== prevActive.id) {
            this.removeAllSelectedStacks()
            this.setStackSelectedBoolean({payload: undefined})
          }
        }
      },
      setTipBox (c) {
        switch (c.type) {
          case 'I' :
            this.tipsInfoText =
            'Use this to create your program.' +
            ' Place it on either the chosen path.'
            return 'Instruction Card'
          case 'R' :
            this.tipsInfoText = 'Play this card on top of an instruction or group card to repeat it.'
            return 'Repetition Card'

          case 'V':
            this.tipsInfoText = 'Play this card on top of Variable Repetition cards to change the number of times an instruction or group card repeats.'
            return 'Variable Card'

          case 'H':
            this.tipsInfoText = 'Use this card to remove cards from another player`s playing field. Group cards are immune to hacking.'
            return 'Hack Card'

          case 'G' :
            this.tipsInfoText = 'Use this to combine instruction and group cards to protect them from Hack cards. The total of the instruction and group cards must match the value of this card'
            return 'Group Card'

          case 'FIREWALL':
            this.tipsInfoText = 'Use this to remove the chance of being hacked.'
            return 'Firewall Card'

          case 'GENERATOR':
            this.tipsInfoText = 'Use this card to prevent prevent a power outage.'
            return 'Generator Card'

          case 'ANTIVIRUS':
            this.tipsInfoText = 'Use this card to prevent all viruses.'
            return 'AntiVirus Card'

          case 'VIRUS':
            this.tipsInfoText = 'Use this on an opponent to cut their current score in half.'
            return 'Virus Card'

          case 'OVERCLOCK':
            this.tipsInfoText = 'Use this card to double your current score.'
            return 'Overclock Card'

          case 'POWEROUTAGE':
            this.tipsInfoText = 'Use this card on an opponent to prevent them from playing instruction cards.'
            return 'PowerOutage Card'

          case 'BATTERYBACKUP':
            this.tipsInfoText = 'Use this to be able to play instruction cards. (Negate Power Outage)'
            return 'BatteryBackup Card'

          default :
            let fact = ''
            this.tipsInfoText = fact
        }
      },
      deselectAll () {
        document.removeEventListener('click', this.hide)
        this.tipsCardSelected = this.setTipBox('default')
        bus.$emit('cardDeselected')
        this.setStackSelectedBoolean({payload: undefined})

        this.setActiveCardUndefined()
        if (this.hand !== undefined) {
          for (let card of this.hand) {
            card.selected = false
          }
        }
      },
      removeCard (cardId) {
        this.removeCard(cardId)
      },
      setActiveCard (c) {
        this.selectCard(c)
      }
    },
    created: function () {
      bus.$on('hackCanceled', () => {
        this.deselectAll()
      })
      bus.$on('alterTipBox', () => {
        this.deselectAll()
      })
      bus.$on('activeCardAddedToStack', (cardId) => {
        this.removeCard(cardId)
        this.addCardToHand()
      })
      bus.$on('tutorialOff', () => {
        this.tipsCardSelected = this.setTipBox('default')
      })
      bus.$on('tutorialOn', () => {
        let c = this.getActiveCard()
        if (c === undefined) {
          this.tipsCardSelected = this.setTipBox('default')
        } else {
          this.tipsCardSelected = this.setTipBox(c)
        }
      })
      bus.$on('aiDiscard', () => {
        this.discardSelected()
      })
      bus.$on('aiAttack', (stackToHack) => {
        if (!this.getTutorialState()) {
          if (this.getAiTurn() === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'POWEROUTAGE') {
                $('.powerOutage').modal('hide')
                this.givePowerOutage(stackToHack.id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              } else if (this.getActiveCard().type === 'VIRUS') {
                $('.virus').modal('hide')
                this.giveVirus(stackToHack.id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              }
            }
          }
        }
      })

      bus.$on('aiProtection', () => {
        if (!this.getTutorialState()) {
          if (this.getAiTurn() === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'FIREWALL') {
                $('.firewall').modal('hide')
                this.giveFirewall(this.getCurrentPlayer().id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              } else if (this.getActiveCard().type === 'ANTIVIRUS') {
                $('.antiVirus').modal('hide')
                this.giveAntiVirus(this.getCurrentPlayer().id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              } else if (this.getActiveCard().type === 'GENERATOR') {
                $('.generator').modal('hide')
                this.giveGenerator(this.getCurrentPlayer().id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              }
            }
          }
        }
      })

      bus.$on('aiEnhance', () => {
        if (!this.getTutorialState()) {
          if (this.getAiTurn() === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'BATTERYBACKUP') {
                $('.batteryBackup').modal('hide')
                this.giveBatteryBackup(this.getCurrentPlayer().id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              } else if (this.getActiveCard().type === 'OVERCLOCK') {
                $('.batteryBackup').modal('hide')
                this.giveOverclock(this.getCurrentPlayer().id)
                this.playerTookTurn()
                bus.$emit('cardDeselected')
                if (this.getHasPlayed()) {
                  this.turn(true)
                }
                this.setAiTurn(false)
              }
            }
          }
        }
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hasPlayed {
    -webkit-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
    -moz-box-shadow: 0 0 24px 4px rgba(0,255,60,1);
    box-shadow: 0 0 24px 4px rgba(0,255,60,1);
  }

  #flexcontainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    align-items: center;
  }

  #controls {
    display: flex;
    flex-direction: column;
    padding: 0;
    vertical-align: middle;
    align-items: center;
    flex-basis: content;
    flex-shrink: 5;
  }

  #disabilityPanel {
    top: 0;
    width: 300px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    padding: 0;
    padding-right: 80px;
    flex-basis: content;
    flex-shrink: 3;
  }

  #cards {
    flex-grow: 4;
    -webkit-flex-grow: 4;
    align-self: flex-start;
  }


  #player-info-panel {
    background-color: #ccc;
}

  #tipBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
    flex-grow:0;
    min-height: 40px;
  }

  #tipContainer {
    background: white;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    min-height: 40px;
    max-height: 100px;
  }

  #tips {
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
  }

  #playerTurn {
    position: absolute;
    top: 350px;
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0px;
  }

  h1, h2 {
    font-weight: normal;
  }

  h4.boolState {
    margin-bottom: 0px;
    margin-top: 20px;
  }

  h4.playerName {
    /*margin-top: 10px;*/
    padding-top:10px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 8px;
  }

  a {
    color: #42b983;
  }

  .endTurnButton {
    width: 200px;
    height: 100px;
  }

  .rightSide {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 80px;
  }

  .trueFalse {
    animation: cssAnimation 3s 16 ease-in-out;
  }
  @keyframes cssAnimation {
    from { -webkit-transform: rotate(0deg) scale(1) skew(0deg) translate(0px); }
    to { -webkit-transform: rotate(720deg) scale(1) skew(0deg) translate(0px); }
  }

</style>
