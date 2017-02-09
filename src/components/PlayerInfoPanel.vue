<template>
  <div id="player-info-panel">
    <h1>{{ title }}</h1>
    <ul id="example-1">
        <li v-for="card in cards">
            <card :cardData="card" v-on:cardClicked="cardClicked"></card>
        </li>
    </ul>
  </div>
</template>

<script>
import Card from './Card'

export default {
  name: 'PlayerInfoPanel',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Player Info Panel',
      cards: [
          { id: '001', type: 'I', value: 3, selected: false },
          { id: '002', type: 'Rx', value: 0, selected: false },
          { id: '003', type: 'G', value: 2, selected: false },
          { id: '004', type: 'I', value: 1, selected: false },
          { id: '005', type: 'V', value: 3, selected: false }
      ]
    }
  },
  computed: {
    selectedCard () {
      var selectedCard
      for (var card in this.cards) {
        if (card.selected === true) {
          selectedCard = card
        }
      }

      return selectedCard
    }
  },
  components: {
    'card': Card
  },
  methods: {
    cardClicked (cardId) {
      // alert('cardId of clicked card is ' + cardId)

      for (var card of this.cards) {
        if (card.id === cardId) {
          card.selected = !card.selected
        } else {
          card.selected = false
        }
      }

      setTimeout(() => document.addEventListener('click', this.deselectAll), 0)
    },
    deselectAll () {
      document.removeEventListener('click', this.hide)
      for (var card of this.cards) {
        card.selected = false
      }
    }
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
</style>
