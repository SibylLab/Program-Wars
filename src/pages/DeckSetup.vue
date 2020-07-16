<template>
<div id="deck-setup">
  <page-header/>

  <h4 class="title centered">Phase 2: Adjust Deck Setup</h4>

  <div id="setup-content" class="centered">
    <h4 id="phase-info" class="centered">
      <div class="name">{{ pageState.currentPlayer().name.toUpperCase() }}</div>
      Add More Cards To Your Deck
    </h4>

    <div id="base-cards" class="my-border">
      <h4 style="color: black">Base Cards</h4>
      <div v-for="{type, val, amt} in pageState.baseCardTypes()" v-bind:key="type + val"
          class="card-type">
        <img v-for="i in Array(amt).keys()" v-bind:key="i"
            :src="cardImage(type, val)" class="card-sm" ondragstart="return false;">
      </div>
    </div>

    <div id="optional-cards" class="card-list my-border">
      <h4 style="color: black">Additional Cards
        <div :style="{color: pickedColor, display: 'inline'}">
          {{ pageState.optionalCards.length }} / 10 </div>
      </h4>
      <img v-for="[idx, card] in Object.entries(pageState.optionalCards)" v-bind:key="idx"
          :src="cardImage(card.type, card.val)" class='card-lg'>
    </div>

    <div id="card-pool" class="card-list my-border">
      <h4 style="color: black">Available Cards</h4>
      <img v-for="[idx, card] in Object.entries(pageState.cardPool)" v-bind:key="idx"
          :src="cardImage(card.type, card.val)" class='card-lg'>
    </div>

    <button id="finalize" class="btn btn-success centered" v-on:click="next()">
      Finalize Deck </button>
  </div>

</div>
</template>


<script>
// import deckData from '@/data/decks'
import PageHeader from '@/components/shared/PageHeader'

export default {
  name: 'deck-setup-page',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader
  },
  computed: {
    pickedColor () {
      return this.pageState.optionalCards.length === 10 ? 'green' : 'red'
    }
  },
  methods: {
    cardImage (type, val) {
      return 'static/cardImages/' + type.toLowerCase() + val + '.png'
    },
    next () {
      this.pageState.finalizeDeck()
      if (this.pageState.nextPlayer() === undefined) {
        console.log('done all players')
      }
    }
  }
}
</script>


<style scoped>
#deck-setup {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 760px;
  background-image: linear-gradient(to bottom right, purple, darkblue);
}

#setup-content {
  position: absolute;
  top: 60px;
  width: 90%;
  height: 89%;
  border-radius: 20px;
  background-color: white;
}

#phase-info {
  position: absolute;
  top: 0px;
  color: black;
}

#base-cards {
  direction: rtl;
  position: absolute;
  left: 1%;
  top: 8%;
  width: 23%;
  height: 80%;
  overflow: auto;
}

#optional-cards {
  position: absolute;
  top: 8%;
}

#card-pool {
  position: absolute;
  bottom: 12%;
}

#finalize {
  position: absolute;
  bottom: 2%;
}

.card-type {
  display: block;
  text-align: left;
  margin: 20px;
}

.card-sm {
  display: inline-block;
  width: 80px;
  height: auto;
  margin-right: -50px;
}

.card-lg {
  display: inline-block;
  width: 120px;
  height: auto;
  margin: 15px;
}

.name {
  display: inline;
  color: red;
  margin-right: 15px;
}

.title {
  position: absolute;
  width: 50%;
  z-index: 20;
  color: white;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.my-btn {
  display: inline;
  margin: 10px;
}

.my-border {
  border: 8px ridge grey;
  border-radius: 10px;
}

.card-list {
  left: 25%;
  width: 74%;
  height: 39%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

h4 {
  margin: 0;
  margin-top: 10px;
}
</style>

