<template>
<div id="stack" :key="update" @drop="onDrop($event)"
    @dragover.prevent @dragenter.prevent>

  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;" :class="[scoreColor]">
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
    stackOwner () {
      return this.game.getPlayer(this.stack.playerId)
    },
    ownedByCurrentPlayer () {
      return this.stackOwner === this.game.currentPlayer()
    },
    willAcceptVirus () {
      return !this.ownedByCurrentPlayer && !this.stackOwner.protectedFrom('VIRUS')
    },
    ownerHurtBySql () {
      return (this.stack.isMethod || this.stack.getBase().type === 'METHOD')
          && this.stackOwner.hurtBy('SQL_INJECTION')
    },
    /**
     * Determines the score color based on whether the stacks owner is under
     * an effect that changes how much of the stack score is added to the
     * players total score.
     */
    scoreColor () {
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
      return this.stack.isMethod ? '-44px' : '-36px'
    },
    scoreText () {
      return this.stack.isMethod ? 'MethodStack' : 'Score'
    }
  },
  methods: {
    canPlayOnStack (card) {
      if (this.stack.willAccept(card)) {
        if (card.type === 'VIRUS') {
          return this.willAcceptVirus
        }
        return true
      }
      return false
    },
    cardWillAcceptCurrent (card) {
      return this.game.currentCard && !this.game.currentPlayer.isAI && !this.game.wait
          && card === this.stack.getTop() && this.canPlayOnStack(this.game.currentCard)
    },
    /**
     * Decide what shadow the given card should have around it based on its
     * type and position in the stack as well as the active card type.
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
     */
    onDrop (event) {
      const id = event.dataTransfer.getData('playerId')
      const owner = this.game.getPlayer(id)
      const cardId = event.dataTransfer.getData('cardId')
      const card = owner.hand.getCardById(cardId)

      if (this.canPlayOnStack(card)) {
        event.stopPropagation();
        this.game.takeTurn({
          type: "playOnStack", player: this.game.currentPlayer(),
          stack: this.stack, stackOwner: this.stackOwner,
          card: card, cardOwner: owner
        })
      }
    },
    refresh () {
      this.update = !this.update
    }
  },
  created () {
    bus.$on('select-card', this.refresh)
  },
  beforeDestroy () {
    bus.$off('select-card', this.refresh)
  }
}
</script>

<style scoped>
#stack {
  width: 240px;
  height: 150px;
}

.card {
  display: inline;
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

.score-green {
  color: lightgreen;
}

.play {
  -webkit-box-shadow: 0 0 15px 10px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 15px 10px rgba(0,230,0,1);
  box-shadow: 0 0 15px 10px rgba(255,255,0,1);
}

.attack {
  -webkit-box-shadow: 0 0 15px 10px rgba(255,0,0,1);
  -moz-box-shadow: 0 0 15px 10px rgba(255,0,0,1);
  box-shadow: 0 0 15px 10px rgba(255,0,0,1);
}

ul {
  list-style: none;
  margin: 10px;
  padding: 0 0 0 0;
}
</style>

