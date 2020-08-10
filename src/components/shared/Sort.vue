<template>
<div id='sort'>
  <div class="backdrop">

    <div class="container">
      <h3 style="margin-top: 2%;"> <b>Sort</b> </h3>

      <div class="content">
        <img v-for="card in sortedCards" v-bind:key="card.id"
          :src="card.image" class="card" draggable
          v-on:dragstart="startDrag($event, card)"
          @drop="onDrop($event, card)" @dragover.prevent @dragenter.prevent>
      </div>

      <button class="btn btn-primary my-btn" v-on:click="finish">
        Finish
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
    return {
      sortedCards: this.deck.drawCards(this.card.value),
    }
  },
  computed: {
    ...mapGetters(['game'])
  },
  methods: {
    finish () {
      this.game.takeTurn({
        type: 'playSort',
        player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        sortedCards: this.sortedCards, deck: this.deck
      })
    },
    startDrag (event, card) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('cardId', card.id)
    },
    onDrop (event, card) {
      const droppedId = event.dataTransfer.getData('cardId')
      const dropped = this.sortedCards.find(c => c.id === droppedId)
      event.preventDefault()

      const idx = this.sortedCards.indexOf(card)
      this.sortedCards = this.sortedCards.filter(c => c !== dropped)
      this.sortedCards.splice(idx, 0, dropped)
    }
  }
}
</script>

<style scoped>
#sort {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 50%;
  height: 40%;
  border: ridge grey 4px;
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
  min-width: 800px;
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
  margin: 0;
}

.card {
  display: inline-block;
  height: 80%;
  margin: 2%;
}
</style>
