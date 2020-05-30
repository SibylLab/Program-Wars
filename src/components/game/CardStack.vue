<template>
<div id="stack" ondragstart="return false;">
  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;" class="score-normal">Score: {{ getScore() }}</h5>
  </div>
  <ul id="card-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
      <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image" class="card">
  </ul>
</div>
</template>


<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  name: 'card-stack',
  props: ['stack'],
  components: {
  },
  computed: {
    ...mapState([
      'activePlayer',
      'players'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand',
    ])
  },
  methods: {
    ...mapActions([
      'addCardToStack'
    ]),
    ...mapMutations([
      'discardActiveCard',
      'setActiveCard'
    ]),
    /**
     * Get the stack score and apply any special effects the player is under.
     * Return the score rounded down to the nearest integer.
     */
    getScore () {
      let player = this.players.find(p => p.id === this.stack.playerId)
      let score = this.stack.getScore()
      let helped = player.positiveEffects.has("OVERCLOCK")
      let hurt = player.negativeEffects.has("VIRUS")
      if (helped && !hurt) {
        score *= 1.25
      } else if (!helped && hurt) {
        score *= 0.75
      }
      return Math.floor(score)
    },
    /**
     * Handles the event where a card is dropped on the stack.
     * If the stack belongs to the current player and the card can be
     * added to the stack it is. The card will be removed from the players
     * hand and the player's turn will end.
     */
    onDrop (evt) {
      let cardId = parseInt(evt.dataTransfer.getData('cardId'))
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)

      if (card && this.stack.playerId === this.activePlayer.id
          && this.stack.willAccept(card)) {
        let top = this.stack.getTop()

        this.addCardToStack({
          card: card,
          stackId: this.stack.stackId,
          playerId: this.activePlayer.id,
          replace: top.type === "VARIABLE" && card.type === "VARIABLE"
        })
      }
    }
  }
}
</script>

<style scoped>
#stack {
  min-width: 240px;
}

.card {
  margin-right: -36px;
  max-width: 90px;
  max-height: 100px;
}

.score-normal {
  color: #fff;
}

.score-hurt {
  color: red;
}

.score-helped {
  color: #f5f242;
}

ul {
  list-style: none;
  margin: 10px;
  padding: 0 0 0 0;
}
</style>

