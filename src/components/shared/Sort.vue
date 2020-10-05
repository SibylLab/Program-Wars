<template>
<div id='sort'>
  <div class="backdrop">

    <div class="popup">
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

/**
 * Displays the to `N` cards from the deck and allows the player to arrange
 * them however they want.
 *
 * When finished the arranged cards will be placed back on top of the deck with
 * the leftmost card on top.
 *
 * @vue-prop {Player} cardOwner - The owner of the sort card.
 * @vue-prop {Card} card - The sort card.
 * @vue-prop {Deck} deck - The deck being sorted.
 */
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
    /**
     * Takes a turn to sort the cards and put them back on top of the deck.
     */
    finish () {
      this.game.takeTurn({
        type: 'playSort',
        player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        sortedCards: this.sortedCards, deck: this.deck
      })
    },
    /**
     * Sets up the `event` to move a given card to a new position in the list.
     * @param {event} event - The event being set up. Has `cardId` with the given
     * card id added to the `dataTransfer` property.
     * @param {Card} card - The card being dragged.
     */
    startDrag (event, card) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('cardId', card.id)
    },
    /**
     * Resolves a drop event on top of a given card.
     *
     * This puts the dropped card in the place of the given card in the list.
     * If the dropped card was originally left of the given card the given
     * card and all other cards will be moved left one spot. If the dropped
     * card was to the right the given card and cards between it and the dropped
     * card's original position will be move to the right.
     *
     * @param {event} event - The event containing the id of the card to be moved.
     * Will have `cardId` in the `dataTransfer` property to indicate which card
     * is being dropped.
     * @param {Card} card - The card that the dropped card is being dropped on.
     */
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
  width: 100vw;
  height: 100vh;
}

.popup {
  position: absolute;
  top: 25%;
  left: 20%;
  width: 50%;
  height: 43%;
  border: ridge grey 0.5rem;
  border-radius: 1rem;
  background-color: white;
  z-index: 1000;
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
  border: 0;
}
</style>
