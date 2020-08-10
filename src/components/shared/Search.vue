<template>
<div id='search'>
  <div class="backdrop">

    <div class="container">
      <h3 class="title"> <b>Search</b> </h3>

      <div class="content">
        <img v-for="card in deckCards" v-bind:key="card.id"
          :src="card.image" :class="['card', { active: isSelected(card) }]"
          v-on:click="select(card)">
      </div>

      <button class="btn btn-success my-btn" v-on:click="choose"
          :disabled="!selected">
        Choose Card
      </button>
    </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  props: ['cardOwner', 'card', 'deck', 'cancel'],
  data () {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapGetters(['game']),
    deckCards () {
      const cards = this.deck.cards.filter(c => c.type !== 'SEARCH')
      return cards.slice(0, this.card.value)
    }
  },
  methods: {
    isSelected (card) {
      return card === this.selected
    },
    select (card) {
      this.selected = card
    },
    choose () {
      this.game.takeTurn({
        type: 'playSearch',
        player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        chosenCard: this.selected, deck: this.deck
      })
    }
  },
  created () {
    if (this.deckCards === 0) {
      this.deck.refresh()
    }
  }
}
</script>

<style scoped>
#search {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container {
  position: absolute;
  top: 25%;
  left: 10%;
  width: 80%;
  height: 40%;
  border: ridge grey 4px;
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
  min-width: 1000px;
  min-height: 300px;
}

.title {
  margin: 0;
  margin-top: 1%;
}

.content {
  position: relative;
  height: 65%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.5);
}

.my-btn {
  margin: 1%;
}

.card {
  display: inline-block;
  height: 80%;
  margin: 2%;
}

.active {
  -webkit-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  box-shadow: 0 0 24px 10px rgba(0,255,0,1);
}
</style>

