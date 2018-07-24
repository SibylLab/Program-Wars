<template>
    <div id="player-info-panel">
      <div id="flexcontainer">
        <div id="tipBox" class="container" :style="displayStyle" :cardClicked="tipsCardSelected">
          <div class="panel panel-default" style="border-radius: 10px">
            <div class="panel-heading" style="border-radius: 10px"><h5>{{ tipsCardSelected }}</h5></div>
            <div class="panel-body">{{ tipsInfoText }}</div>
          </div>
        </div>
        <div class="container" style="width: 700px; float: left">
        <div class="row" style="width: 700px; align-content: center">
        <div id="cards">
          <ul id="example-1">
            <h4 class="modal-title"><b>{{ currentPlayerName() }}</b>, It's Your Turn</h4>
              <li v-for="(card) in hand" style="margin-top: 5px">
                  <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
              </li>
          </ul>
        </div>
        </div>
        <div class="row">
          <div id="controls" class="col-sm" style="height: 80px; justify-content: center; align-items: center">
            <button class="btn btn-primary btn-lg" v-on:click="discardSelected" style="border-radius: 40px">
              Discard <br/> Selected Card
            </button>
          </div>
        </div>
        </div>
        <display-used-cards></display-used-cards>

      </div>
      <div class="container" style="border-top: 1px solid white; padding: 10px;">
        <div class="row">
          <div class="col-md-12">
            <h4>Instructions To Win is: <b>{{ getScoreLimit() }}</b></h4>
          </div>
        </div>
        <div class="row">
          <div :class="colSize" v-for="player in players" style="text-align: left;">
            <div style="float: left; margin-right: 10px;"><h4><b><a @click="openModal" style="cursor: pointer; color: rgba(10,1,1,0.79); font-size: 17px">{{ player.name }}:</a></b></h4></div>
             <div>
               True Path:&nbsp;
               <meter :max="getScoreLimit()" min=0
                      :value="getScore(player.id).trueScore"
                      :high="getScoreLimit() * 0.75"
                      :low="getScoreLimit()/2"
                      :optimum="getScoreLimit()-5"
                      style="width: 150px"
               ></meter>
               <br>
               False Path:
               <meter :max="getScoreLimit()" min=0
                      :value="getScore(player.id).falseScore"
                      :high="getScoreLimit() * 0.75"
                      :low="getScoreLimit()/2"
                      :optimum="getScoreLimit()-5"
                      style="width:150px"
               ></meter>
             </div>
              <!--<div> True Path: {{ getScore(player.id).trueScore }}-->
                <!--Instructions <br> False Path: {{ getScore(player.id).falseScore }} Instructions</div>-->
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
        factsToggle: true,
        tipsCardSelected: 'Did you know?',
        tipsInfoText: 'You can toggle on or off this information window by checking the "FUN FACTS" box in the top right corner. ' +
      'You can also turn off the tutorials but keep the fun facts by checking the "TUTORIAL" box.',
        facts: [
          'The first high-level programming language was FORTRAN. invented in 1954 by IBM’s John Backus.',
          'The first computer programmer was Ada Lovelace, a woman.',
          'A "Hello, World!" program is often the first program written when learning a new programming language.',
          'The first electronic computer ENIAC weighed more than 27 tons and took up 1800 square feet.',
          'Only about 10% of the world’s currency is physical money, the rest only exists on computers.',
          'TYPEWRITER is the longest word that you can write using the letters only on one row of the keyboard of your computer.',
          'Doug Engelbart invented the first computer mouse in around 1964 which was made of wood.',
          'There are more than 5000 new computer viruses are released every month.',
          'Around 50% of all Wikipedia vandalism is caught by a single computer program with more than 90% accuracy.',
          'In programming, counting starts at 0, not 1.',
          ' If there was a computer as powerful as the human brain, it would be able to do 38 thousand trillion operations per second and hold more than 3580 terabytes of memory.',
          'The password for the computer controls of nuclear tipped missiles of the U.S was 00000000 for eight years.',
          'Approximately 70% of virus writers are said to work under contract for organized crime syndicates.',
          'HP, Microsoft and Apple have one very interesting thing in common – they were all started in a garage.',
          'An average person normally blinks 20 times a minute, but when using a computer he/she blinks only 7 times a minute.',
          'The house where Bill Gates lives, was designed using a Macintosh computer.',
          'The first ever hard disk drive was made in 1979, and could hold only 5MB of data.',
          'The first 1GB hard disk drive was announced in 1980 which weighed about 550 pounds, and had a price tag of $40,000.',
          'More than 80% of the emails sent daily are spams.',
          'A group of 12 engineers designed IBM PC and they were called "The Dirty Dozen"',
          'The original name of Windows was "Interface Manager".',
          'The first microprocessor created by Intel was the 4004. It was designed for a calculator, and in that time nobody imagined where it would lead.',
          'IBM 5120 from 1980 was the heaviest desktop computer ever made. It weighed about 105 pounds, not including the 130 pounds external floppy drive.',
          'Genesis Device demonstration video in Star Trek II: The Wrath of Khan was the the first entirely computer generated movie sequence in the history of cinema. That studio later become Pixar.',
          'In 1833 a man by the name of Charles Babbage invented all the parts that are now used for a modern computer. But it was only 120 years later that the first ‘modern’ computers were invented.',
          'The Motion Picture Academy refused to nominate Tron (1982) for a special-effects award because, according to director Steven Lisberger, "The Academy thought we cheated by using computers".',
          ' John Lasseter (CEO of Pixar) was fired from Disney for promoting computer animation.',
          'CAPTCHA is an acronym for "Completely Automated Public Turing test to tell Computers and Humans Apart"',
          'You will not be affected by viruses just by opening an email. It is only activated when you click a link or access an attachment.',
          'MyDoom was the fastest-spreading virus ever created. The total damage done by MyDoom is a whopping $38 billion.',
          '9 out of 10 of the world’s supercomputers run on Linux.',
          'E-mail has been around longer than the World Wide Web.',
          'In the 1980s, an IBM computer wasn’t considered 100% compatible unless it could run Microsoft Flight Simulator*.'
        ]
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
      displayStyle () {
        if (this.getTips().fact) {
          return {'display': 'block'}
        } else {
          return {'display': 'none'}
        }
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
        'activeCard'

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
        if (this.getTips().tutorial && this.getActiveCard() === undefined) {
          this.tipsCardSelected = this.setTipBox(c)
        } else {
          this.tipsCardSelected = this.setTipBox('default')
        }
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
            let fact = this.setFact()
            this.tipsInfoText = fact
            return 'Did you know?'
        }
      },
      setFact () {
        let num = Math.floor(Math.random() * this.facts.length)
        return this.facts[num]
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
    max-width: 350px;
    vertical-align: middle;
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
    margin: 0 10px;
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
