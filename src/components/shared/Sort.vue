<template>
<div id='sort'>
  <div class="backdrop">

    <div class="container">
      <h3 style="margin-top: 2%;"> <b>Sort</b> </h3>

      <div class="content">
      </div>

      <button class="btn btn-primary my-btn" v-on:click="discard">
        Discard
      </button>
    </div>

  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'search',
  props: ['cardOwner', 'card', 'deck'],
  data () {
    return () {
      sortedCards: this.deck.removeNumCards(this.card.value),
    }
  },
  computed: {
    ...mapGetters(['game'])
  },
  methods: {
    play () {
      this.game.takeTurn({
        type: 'playSort',
        player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        sortedCards: this.sortedCards, deck: this.deck
      })
    },
    discard () {
      this.game.takeTurn({
        type: 'discardCard', 
        player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner
      })
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
  top: 10%;
  left: 35%;
  width: 30%;
  height: 70%;
  border: ridge grey 4px;
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
}

.content {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  height: 80%;
  overflow: auto;
  text-align: left;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.4);
}

.my-btn {
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.card {
  display: inline;
  width: 22%;
  margin: 0 5%;
}
</style>
