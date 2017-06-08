<template>
    <div id="player-info-panel">

      <modal modalId="discardCards" modalTitle="Cards in the Discard Pile" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {}"></modal>

      <h4 class="playerName"><b>{{ currentPlayerName }}</b>, It's Your Turn!</h4>
      <div id="flexcontainer">
        <div id="tipBox" class="container" :style="displayStyle" :cardClicked="tipsCardSelected">
          <div class="panel panel-default" style="border-radius: 10px">
            <div class="panel-heading" style="border-radius: 10px"><h5>{{ tipsCardSelected }}</h5></div>
            <div class="panel-body">{{ tipsInfoText }}</div>
          </div>
        </div>
        <div id="cards">

          <ul id="example-1">
              <li v-for="card in hand">
                  <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
              </li>
          </ul>
          <h4 class="boolState" >Active Side is: <div :class="changeTrueFalse"><b>{{ activeSide }}</b></div></h4>
        </div>

        <div id="controls">

        <button class="btn btn-primary endTurnButton" :class="hasPlayed" :disabled="endTurnEnabled" v-on:click="endTurn">
        End Your Turn
      </button>
        <button class="btn btn-warning rightSide" v-on:click="discardSelected">
          Discard Selected Card
        </button>

        <button class="btn btn-primary rightSide" v-on:click="displayDiscard">
          Show Discarded Cards
        </button>

        </div>

      </div>

    </div>
</template>

<script>
import { bus } from './Bus';
import Card from './Card'
import Modal from './Modal'

export default {
  name: 'PlayerInfoPanel',
  data () {
    return {
      title: 'Player Info Panel',
      idCounter: 6,
      showDiscardedCards: false,
      modalId: "discardCards",
      modalText: "",
      modalCards: [],
      tipsToggle: true,
      tipsCardSelected:'Did you know?',
      tipsInfoText: 'You can toggle on or off this information window by checking the \"TUTORIAL\" box in the rop right corner. ',
      facts: [
        'The first high-level programming language was FORTRAN. invented in 1954 by IBM’s John Backus.',
        'The first computer programmer was a woman',
        'A \"Hello, World!\" program is often the first program written when learning a new programming language',
        'Counting starts at 0, not 1'
      ]
    }
  },
  computed: {
    displayStyle() {
      if(this.tipsToggle) {
        return {'display':'block'}
      } else {
          return {'display':'none'}
        }
      },
      changeTrueFalse() {
          if (this.$store.getters.trueFalseAnim)
              return "trueFalse"
          else
              return ""
      },
      hasPlayed() {
        if (this.$store.getters.getHasPlayed)
            return "hasPlayed"
        else
            return ""
      },
    hand() {
        let hand = this.$store.getters.getCurrentPlayerHand;
        if (hand === null){
          return []
        } else {
            return hand.cards
        }
    },
    currentPlayerName() {
        let playerName = this.$store.getters.currentPlayerName;
        return playerName.charAt(0).toUpperCase() + playerName.slice(1).toLowerCase();
    },
    endTurnEnabled() {
        let hasPlayed = this.$store.getters.getHasPlayed

        if (hasPlayed) {
            return false
        } else {
            return true
        }
    },
    activeSide() {
        let activeSideString = String(this.$store.getters.getActiveSide)
        return activeSideString.toUpperCase()
    }
  },
  components: {
    'card': Card,
    'modal': Modal
  },
  methods: {
      discardSelected() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.commit('discardSelectedCard')
          this.$store.commit('removeActiveCardFromHand')
          this.$store.commit('setHasPlayed', { hasPlayed: true})
        }
      },
    displayDiscard() {
        let string = ''
        let discardList = this.$store.getters.getDiscard
        if (discardList.length === 0) {
          this.modalText = 'There are no cards in the discard pile.'
          $('#'+this.modalId).modal('show')

        } else {
          string += 'Cards in the discard pile: \n'
          for (let card of discardList) {
            string += card.value + ' ' + card.type + ' --- ' + '\n'
          }
          this.modalText = ""
          this.modalCards = discardList
          $('#'+this.modalId).modal('show')
        }

    },
    endTurn() {
      bus.$emit('checkWin')
      this.tipsCardSelected = this.setTipBox('default');
      this.$store.commit('setHasPlayed', {hasPlayed:false})

      this.$store.commit('endTurn', this.$store.getters.maxplayers)
      this.$store.commit('setGameState', {gameState: 'startPlayerTurn'})
    },
    cardClicked (c) {
      this.tipsCardSelected = this.setTipBox(c);
      let prevActive = this.$store.getters.getActiveCard

      this.$store.commit('selectCard', c)
      if (prevActive !== undefined) {
        if (c.type !== 'G' || c.id !== prevActive.id) {
          this.$store.commit('removeAllSelectedStacks')
          this.$store.commit('setStackSelectedBoolean', {payload: undefined})
        }
      }
    },
    setTipBox(c) {
        switch(c.type) {
          case 'I' :
            this.tipsInfoText = 'Instruction cards are the basis of any program, ' +
              'and are thus the basic card that any player will start a “stack” ' +
              '(i.e. Instruction cards with modifiers placed on them) with.';
            return 'Instruction Card'; break;
          case 'R' :
            this.tipsInfoText = 'Repetition cards are used to emulate the action of a loop, ' +
              'repeating an instruction a number of times. ' +
              'Repetition cards need an instruction card as a base before they can be played on a playfield. ' +
              'Once played on an instruction, ' +
              'a Repetition card multiplies the value of the underlying Instruction card by the value printed ' +
              'on the Repetition card.';
            return 'Repetition card'; break;

          case 'V':
            this.tipsInfoText = 'Variable cards are used in conjunction with Repetition X cards. ' +
              'The value of the Variable card is then applied to the Repetition X card, ' +
              'which specifies the value of X. ' +
              'The value of X then becomes the multiplier for the underlying Instruction card.';
            return 'Variable Card'; break;

          case 'H':
            this.tipsInfoText = 'Hack cards are a special card that players are allotted at the ' +
              'beginning of the game. The Hack card can be played by a player on their turn with ' +
              'the purpose of removing cards from an opposing players’ playfield. ' +
              'When a Hack card is played, players specify a target for the Hack card, ' +
              'and that card is discarded. If there are any modifier cards on top of the targeted card, ' +
              'those cards are discarded from play as well. All cards are targetable by a ' +
              'Hack card with the exception of Group cards.';
            return 'Hack Card'; break;

          case 'G' :
            this.tipsInfoText = 'Group cards are used to emulate the notion of a function, ' +
              'essentially aggregating a set of instructions together into one unit. ' +
              'Group cards are played on one or more stacks of cards. ' +
              'In order to play a Group card on one or more stacks, ' +
              'the total point value of each of the stacks must be equal to the value of the Group card.';
            return 'Group Card'; break;

          default :
            var fact = this.setFact();
            this.tipsInfoText = fact;
            return 'Did you know?';
        }
    },
    setFact() {
      var num = Math.floor(Math.random() * this.facts.length);
      return this.facts[num];
    },
    deselectAll () {
      document.removeEventListener('click', this.hide);
      this.tipsCardSelected = this.setTipBox('default');
      bus.$emit('cardDeselected');
      this.$store.commit('setStackSelectedBoolean', {payload: undefined})

      this.$store.commit('setActiveCardUndefined')
      if(this.hand !== undefined) {
        for (let card of this.hand) {
          card.selected = false
        }
      }
    },
    removeCard (cardId) {
      this.$store.commit('removeCard', cardId)
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
       max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    setActiveCard(c) {
      this.$store.commit('selectCard', c)
    }
  },
  created: function () {
    bus.$on('activeCardAddedToStack', (cardId) => {
      this.removeCard(cardId)
      this.$store.commit('addCardToHand')
    });
    bus.$on('tipsToggled', () => {this.tipsToggle = !this.tipsToggle})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hasPlayed {
    -webkit-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
    -moz-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
    box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
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
    padding: 0px;
    justify-content: space-between;
    align-items: center;
    padding-right: 50px;
    flex-basis: content;
    flex-shrink:5;
  }

  #cards {
    flex-grow: 4;
    align-self: flex-start;
  }


  #player-info-panel {
    background-color: #ccc;
}

  #tipBox {
    position: relative;
    top: -50px;
    max-width: 350px;
    height: 280px;
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0px;
  }

h1, h2 {
  font-weight: normal;
}

h4.boolState {
  margin-bottom: 0px;
  margin-top: 40px;
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
    float: right;
    margin-top: 20px;
  }

  .trueFalse {

    animation: cssAnimation 3s 16 ease-in-out;
  }
  @keyframes cssAnimation {
    from { -webkit-transform: rotate(0deg) scale(1) skew(0deg) translate(0px); }
    to { -webkit-transform: rotate(720deg) scale(1) skew(0deg) translate(0px); }
  }

</style>
