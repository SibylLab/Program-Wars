<template>
<div id="stack" :key="update" @drop="onDrop"
    @dragover.prevent @dragenter.prevent>

  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 0.2rem;" :class="[scoreClass]">
      {{ scoreText }}: {{ stack.getScore() }}
    </h5>
  </div>

  <ul id="card-list">
    <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image"
        :class="['card', shadow(card)]" :style="{'margin-right': overlap}"
        draggable="false">
  </ul>

</div>
</template>

<script>
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

/**
 * Displays a stack of cards and its total score.
 * Lights up when the active card can be played on it. Score is displayed
 * in red if the stack is not counting for its full amount because of
 * an active effect on the player, but it will still show the full total.
 * Responsible for handling events when cards are dropped on the stack by
 * calling the appropriate actions.
 *
 * @vue-prop {Stack} stack - The stack to display
 *
 * @vue-computed {bool} ownedByCurrentPlayer - True if the stack is owned by the
 * current player
 * @vue-computed {bool} willAcceptVirus - True if this.stack will accept a virus card
 * @vue-computed {bool} ownerHurtBySql - True if the player that owns the
 * stack is hurt by an SQL effect
 * @vue-computed {string} scoreClass - The CSS class to use for coloring score text.
 * 'score-red' if the stack is not providing full value,
 * 'score-green' if the stack is complete, and 'score-normal' otherwise.
 * @vue-computed {string} overlap - How much to overlap the cards in the stack by
 * in CSS units. Should be negative.
 * @vue-computed {string} scoreText - The text to identify the stack score.
 * 'Score' for normal stacks and 'MethodStack' for method stacks.
 */
export default {
  name: 'card-stack',
  props: ['stack'],
  data () {
    return {
      update: true
    }
  },
  computed: {
    ...mapGetters(['game']),
    ownedByCurrentPlayer () {
      return this.stack.player === this.game.currentPlayer()
    },
    willAcceptVirus () {
      return !this.ownedByCurrentPlayer && !this.stack.player.protectedFrom('VIRUS')
    },
    ownerHurtBySql () {
      return (this.stack.isMethod || this.stack.getBase().type === 'METHOD')
          && this.stack.player.hurtBy('SQL_INJECTION')
    },
    scoreClass () {
      const top = this.stack.getTop()
      if ((top && top.type  === 'VIRUS') || this.ownerHurtBySql) {
        return 'score-red'
      } else if (this.stack.isComplete()) {
        return 'score-green'
      } else {
        return 'score-normal'
      }
    },
    overlap () {
      return this.stack.isMethod ? '-2.5rem' : '-2.2rem'
    },
    scoreText () {
      return this.stack.isMethod ? 'MethodStack' : 'Score'
    }
  },
  methods: {
    /**
     * Checks whether or not the given card can be played on the stack.
     * @param {Card} card - The card to play on the stack
     * @return {bool} True if the card can be played on the stack otherwise false
     */
    canPlayOnStack (card) {
      if (this.stack.willAccept(card)) {
        if (card.type === 'VIRUS') {
          return this.willAcceptVirus
        }
        return this.ownedByCurrentPlayer
      }
      return false
    },
    /**
     * Checks whether or not given card in the stack will accept the current
     * selected card. This is used for higlighting a card in the stack when
     * the current card can be played on the stack. As it is for the stack,
     * only the top card is considered for highlighting.
     * @return {bool} True if the card will accept the current card.
     */
    cardWillAcceptCurrent (card) {
      return this.game.currentCard && !this.game.currentPlayer.isAI && !this.game.wait
          && card === this.stack.getTop() && this.canPlayOnStack(this.game.currentCard)
    },
    /**
     * Decide what shadow CSS class the given card should have. This is based on the
     * type and position in the stack as well as the currently selected card type.
     * @param {Card} card - The card in the stack to check
     * @return {string} The CSS class to give the card. 'attack', 'play' or ''.
     */
    shadow (card) {
      if (this.cardWillAcceptCurrent(card)) {
        if (this.game.currentCard.type === 'VIRUS') {
          return this.willAcceptVirus ? 'attack' : ''
        } else {
          return this.ownedByCurrentPlayer ? 'play' : ''
        }
      } else {
        return ''
      }
    },
    /**
     * Handles the event where a card is dropped on the stack.
     * If the stack belongs to the current player and the card can be
     * added to the stack it is. The card will be removed from the players
     * hand and the player's turn will end.
     * @param {Event} event - The drag event for a card being dropped on the stack
     */
    onDrop (event) {
      const id = event.dataTransfer.getData('playerId')
      const owner = this.game.getPlayer(id)
      const cardId = event.dataTransfer.getData('cardId')
      const card = owner.hand.getCardById(cardId)
      event.preventDefault()

      if (this.canPlayOnStack(card)) {
        event.stopPropagation();
        this.game.takeTurn({
          type: "playOnStack", player: this.game.currentPlayer(),
          card: card, cardOwner: owner,
          stack: this.stack
        })
      } else if (this.stack.isMethod) {
        event.stopPropagation();
      }
    },
    // Forces the component to redraw itself. Update is the :key for the whole
    // thing, so when its value changes the component will redraw. The value
    // is unimportant all that matters is that it changes.
    refresh () {
      this.update = !this.update
    },
    /**
     * Refreshes the component if the card the play information for a played card
     * affects the stack.
     * @param {Object} playInfo - The play information for the play that was made
     */
    cardPlayed (playInfo) {
      if (playInfo.stack && playInfo.stack.id === this.stack.id) {
        this.refresh()
      }
    }
  },
  created () {
    // Sets the component up to listen for these events
    bus.$on('select-card', this.refresh)
    bus.$on('card-played', this.cardPlayed)
  },
  beforeDestroy () {
    // Removes listeners for these events when the component is destroyed
    bus.$off('select-card', this.refresh)
    bus.$off('card-played', this.cardPlayed)
  }
}
</script>

<style scoped>
#stack {
  width: 14rem;
  height: 9rem;
}

.card {
  display: inline;
  height: 5.9rem;
  border: solid white 0.05rem;
}

.score-normal {
  color: #fff;
}

.score-red {
  color: red;
}

.score-green {
  color: lightgreen;
}

.play {
  -webkit-box-shadow: 0 0 0.7em 0.7em rgba(0,230,0,1);
  -moz-box-shadow: 0 0 0.7em 0.7em rgba(0,230,0,1);
  box-shadow: 0 0 0.7em 0.7em rgba(255,255,0,1);
}

.attack {
  -webkit-box-shadow: 0 0 0.7em 0.7em rgba(255,0,0,1);
  -moz-box-shadow: 0 0 0.7em 0.7em rgba(255,0,0,1);
  box-shadow: 0 0 0.7em 0.7em rgba(255,0,0,1);
}

#card-list {
  list-style: none;
  margin: 0.5rem;
  padding: 0 0 0 0;
}
</style>

