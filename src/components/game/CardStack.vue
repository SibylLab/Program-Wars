<template>
<div id="stack">
  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;" :class="[scoreColor]">
      Score: {{ stack.getScore() }}
    </h5>
  </div>
  <ul id="card-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
    <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image"
        :class="[{card: true}, shadow(card)]"
        draggable="false">
  </ul>
</div>
</template>


<script>
import {mapState, mapGetters, mapActions} from 'vuex'

/**
 * Displays a stack of cards and its total score.
 * Lights up when the active card can be played on it. Score is displayed
 * in red if the stack is not counting for its full amount because of
 * an active effect on the player, but it will still show the full total.
 * Responsible for handling events when cards are dropped on the stack by
 * calling the appropriate actions.
 */
export default {
  name: 'card-stack',
  props: ['stack'],
  computed: {
    ...mapState([
      'activePlayer',
      'activeCard',
      'players'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand',
    ]),
    /**
     * Determines the score color based on whether the stacks owner is under
     * an effect that changes how much of the stack score is added to the
     * players total score.
     */
    scoreColor () {
      let player = this.players.find(p => p.id === this.stack.playerId)
      return player.hurtBy("VIRUS") ? "score-red" : "score-normal"
    }
  },
  methods: {
    ...mapActions([
      'executeTurn'
    ]),
    /**
     * Handles the event where a card is dropped on the stack.
     * If the stack belongs to the current player and the card can be
     * added to the stack it is. The card will be removed from the players
     * hand and the player's turn will end.
     */
    onDrop (evt) {
      let cardId = evt.dataTransfer.getData('cardId')
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)

      // ensure we can play this card on the stack
      if (card.type === 'VIRUS') {
        let targetPlayer = this.players.find(p => p.id === this.stack.playerId)
        if (this.stack.playerId === this.activePlayer.id
            || targetPlayer.isProtectedFrom('VIRUS')) {
          return
        }
      } else if (this.stack.playerId !== this.activePlayer.id) {
          return
      }

      if (this.stack.willAccept(card)) {
        this.executeTurn({
          playType: "playCardOnStack",
          card: card,
          player: this.activePlayer,
          target: this.stack,
        })
      }
    },
    /**
     * Decide what shadow the given card should have around it based on its
     * type and position in the stack as well as the active card type.
     */
    shadow (card) {
      let result = ''
      if (!this.activeCard || this.stack.getTop() !== card) {
        return result
      } else if (this.activeCard.type === 'VIRUS') {
          let targetPlayer = this.players.find(p => p.id === this.stack.playerId)
          if (this.stack.playerId !== this.activePlayer.id
              && !targetPlayer.isProtectedFrom('VIRUS')) {
            result = 'attack'
          }
      } else if (this.stack.playerId === this.activePlayer.id) {
        result = 'play'
      }
      return this.stack.willAccept(this.activeCard) ? result : ''
    },
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
  -webkit-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  box-shadow: 0 0 24px 10px rgba(255,255,0,1);
}

.attack {
  -webkit-box-shadow: 0 0 24px 10px rgba(255,0,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(255,0,0,1);
  box-shadow: 0 0 24px 10px rgba(255,0,0,1);
}

ul {
  list-style: none;
  margin: 10px;
  padding: 0 0 0 0;
}
</style>

