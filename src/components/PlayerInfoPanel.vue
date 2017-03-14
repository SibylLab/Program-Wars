<template>
  <div id="player-info-panel">
    <h1>{{ title }}</h1>
    <h1>Player {{ currentPlayerName }}, It's Your Turn!</h1>

    <ul id="example-1">
        <li v-for="card in hand">
            <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
        </li>
    </ul>
    <button class="btn btn-primary endTurnButton" v-on:click="endTurn">
    End Your Turn
    </button>
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
            console.log('Coo...')
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
    }
  },
  components: {
    'card': Card
  },
  methods: {
    endTurn() {
      this.$store.commit('endTurn', this.$store.getters.maxplayers)
    },
    cardClicked (c) {
      // alert('cardId of clicked card is ' + cardId)
      console.log(c.id)

      this.$store.commit('selectCard', c)


      setTimeout(() => document.addEventListener('click', this.deselectAll), 0)
    },
    deselectAll () {
      document.removeEventListener('click', this.hide)
      bus.$emit('cardDeselected')

      for (let card of this.hand) {
        card.selected = false
      }
    },
    removeCard (cardId) {
      console.log("Remove card function called")
      console.log("Card id : ", cardId)
      this.$store.commit('removeCard', cardId)

    }/*,
    generateRandomCard() { //should be getting card from the deck.
      let types = ['V', 'I', 'Rx', 'R', 'G']

      let typeRand = this.getRandomInt(0, 5)

      let newCardType = types[typeRand]
      let newCardValue;
      switch (newCardType) {
        case 'V':
            newCardValue = this.getRandomInt(1, 5)
              break;
        case 'I':
          newCardValue = this.getRandomInt(1, 5)
          break;
        case 'Rx':
          newCardValue = 1
          break;
        case 'G':
          newCardValue = this.getRandomInt(1, 5)
          break;
        case 'R':
          newCardValue = this.getRandomInt(1, 5)
          break;

      }
      let cardId = this.idCounter
      this.idCounter += 1

      return {id: cardId, value: newCardValue, type: newCardType, selected: false}


    }*/,
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
</style>
