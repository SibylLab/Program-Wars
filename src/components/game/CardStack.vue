<template>
<div id="stack">
  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;" :class="[scoreColor]">Score: {{ stack.getScore() }}</h5>
  </div>
  <ul id="card-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image"
        draggable="false" :class="[{card: true}, {play: willAcceptActive(card)}]">
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
      'activeCard',
      'players'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand',
    ]),
    scoreColor () {
      let player = this.players.find(p => p.id === this.stack.playerId)
      return player.hurtBy("VIRUS") ? "score-red" : "score-normal"
    }
  },
  methods: {
    ...mapActions([
      'addCardToStack',
      'hackStack'
    ]),
    ...mapMutations([
      'setActiveCard'
    ]),
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

      if (card && card.type === "HACK"
          && this.stack.playerId !== this.activePlayer.id
          && this.stack.isHackable()) {
        this.hackStack({stack: this.stack})
      } else if (card && this.stack.playerId === this.activePlayer.id
          && this.stack.willAccept(card)) {
        // if the card is a variable we want to know if we are adding it
        // to the top or replacing an existing one
        let top = this.stack.getTop()
        let replace = !(top.type === "REPEAT" && top.value === 1)
                      && card.type === "VARIABLE"
                      && this.stack.hasVariable()
                      
        this.addCardToStack({
          card: card,
          stackId: this.stack.stackId,
          playerId: this.activePlayer.id,
          replace: replace
        })
      }
    },
    /**
     * Used to set css class to higlight cards on top of the stack that
     * can have the active card placed on them.
     */
    willAcceptActive (card) {
      if (this.activeCard && this.activeCard.type === "HACK") {
        return this.stack.isHackable() && this.stack.playerId !== this.activePlayer.id
      } else {
        return this.activeCard !== undefined
               && this.stack.willAccept(this.activeCard)
               && this.stack.playerId === this.activePlayer.id
               && this.stack.getTop() === card
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
  border: solid grey 1px;
}

.score-normal {
  color: #fff;
}

.score-red {
  color: red;
}

.play {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  box-shadow: 0 0 24px 4px rgba(255,230,0,1);
}

ul {
  list-style: none;
  margin: 10px;
  padding: 0 0 0 0;
}
</style>

