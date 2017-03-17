<template>
    <div id="player-info-panel">
      <h1>{{ title }}</h1>
      <h1>Player {{ currentPlayerName }}, It's Your Turn!</h1>

      <ul id="example-1">
          <li v-for="card in hand">
              <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
          </li>
      </ul>
      <button class="btn btn-primary endTurnButton" :disabled="endTurnEnabled" v-on:click="endTurn">
        End Your Turn
      </button>
      <ul>
        <li>
        <button class="btn btn-primary rightSide" v-on:click="discardSelected">
          Discard Selected Card
        </button>
        </li>
        <li>
        <button class="btn btn-primary rightSide" v-on:click="displayDiscard">
          Show Discarded Cards
        </button>
        </li>
      </ul>
    </div>
</template>

<script>
import { bus } from './Bus';
import Card from './Card'

export default {
  name: 'PlayerInfoPanel',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Player Info Panel',
      idCounter: 6,
    }
  },
  computed: {
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
        return playerName;
    },
    endTurnEnabled() {
        let hasPlayed = this.$store.getters.getHasPlayed

        if (hasPlayed) {
            return false
        } else {
            return true
        }
    }
  },
  components: {
    'card': Card
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
          alert('There are no cards in the discard pile')
        } else {
          string += 'Cards in the discard pile: \n'
          for (let card of discardList) {
            string += card.value + ' ' + card.type + ' --- ' + '\n'
          }
          alert(string)
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

      for (let card of this.hand) {
        card.selected = false
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
#player-info-panel {
    background-color: #ccc;
    padding-bottom: 25px;
}

h1, h2 {
  font-weight: normal;
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
</style>
