<template>
    <div id="player-info-panel">

      <modal modalId="discardCards" modalTitle="Cards in the Discard Pile" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {}"></modal>

      <h4 class="playerName"><b>{{ currentPlayerName }}</b>, It's Your Turn!</h4>
      <div id="flexcontainer">

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
      msg: 'Welcome to Your Vue.js App',
      title: 'Player Info Panel',
      idCounter: 6,
      showDiscardedCards: false,
      modalId: "discardCards",
      modalText: "",
      modalCards: []
    }
  },
  computed: {
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
    selectedCard () {
      var selectedCard;
      for (var card in this.cards) {
        if (card.selected === true) {
          selectedCard = card
        }
      }

      return selectedCard
    },
    hand() {

        let hand = this.$store.getters.getCurrentPlayerHand

        console.log(hand)

        if (hand === null){
          return []
        } else {
            return hand.cards
        }
    },
    currentplayerturn() {
      let activePlayer = this.$store.getters.currentplayerturn
      return activePlayer + 1
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
          //alert('There are no cards in the discard pile')
          this.modalText = 'There are no cards in the discard pile.'
          $('#'+this.modalId).modal('show')
          //'button[stackId="'+this.stackId+'"]'

        } else {
          string += 'Cards in the discard pile: \n'
          for (let card of discardList) {
            string += card.value + ' ' + card.type + ' --- ' + '\n'
          }
          this.modalText = ""
          this.modalCards = discardList
          $('#'+this.modalId).modal('show')
          //alert(string)
        }

    },
    endTurn() {
      this.$store.commit('setHasPlayed', {hasPlayed:false})

      this.$store.commit('endTurn', this.$store.getters.maxplayers)
      this.$store.commit('setGameState', {gameState: 'startPlayerTurn'})
    },
    cardClicked (c) {
      // alert('cardId of clicked card is ' + cardId)
      console.log(c.id)

      let prevActive = this.$store.getters.getActiveCard

      this.$store.commit('selectCard', c)
      if (prevActive !== undefined) {
        if (c.type !== 'G' || c.id !== prevActive.id) {
          this.$store.commit('removeAllSelectedStacks')
          this.$store.commit('setStackSelectedBoolean', {payload: undefined})
        }
      }


      setTimeout(() => document.addEventListener('click', this.deselectAll), 0)
    },
    deselectAll () {
      document.removeEventListener('click', this.hide)
      bus.$emit('cardDeselected')
      this.$store.commit('setStackSelectedBoolean', {payload: undefined})

      this.$store.commit('setActiveCardUndefined')
      if(this.hand !== undefined) {
        for (let card of this.hand) {
          card.selected = false
        }
      }
    },
    removeCard (cardId) {
      console.log("Remove card function called")
      console.log("Card id : ", cardId)
      this.$store.commit('removeCard', cardId)

    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
       max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    setActiveCard(c) {

      this.$store.commit('selectCard', c)

      setTimeout(() => document.addEventListener('click', this.deselectAll), 0)

      console.log('active card set by dragging')
    }
  },
  created: function () {

    bus.$on('activeCardAddedToStack', (cardId) => {
      // a card was selected
      console.log('active card successfully added to stack, deslect and remove from hand')
      console.log(cardId)
      this.removeCard(cardId)

      this.$store.commit('addCardToHand')

      //this.cards.unshift(this.generateRandomCard())
      //this.$options.methods.removeCard(cardId)
    })




  },
  beforeMount: function () {
    console.log('before Mount lifecycle method')
  },
  updated: function () {
    console.log('----------------LIFECYCLE METHOD: updated')
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
