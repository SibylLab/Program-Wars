<template>
<div id="target-overlay">

  <h5> {{ titleText }} </h5>

  <button id="target-button" class="btn btn-sm btn-primary my-btn"
      v-for="target in targetPlayers" v-bind:key="target.id"
      v-on:click="playSpecialCard(target)">
    {{ buttonText(target) }}
  </button>

</div>
</template>


<script>
import { isSafety } from '@/classes/card/cardData'
import { mapGetters } from 'vuex'

/**
 * Displays buttons for targeting players or activating special cards, or
 * text to indicate the card can't be played.
 * Attached to a card and is visible when a special card is active.
 * Responsible for getting possible targets for a card and calling the
 * appropriate actions when a special card is played.
 */
export default {
  name: 'target-overlay',
  props: ['card', 'player'],
  computed: {
    ...mapGetters(['game']),
    titleText () {
      if (isSafety(this.card.type)) {
        return this.game.currentPlayer().helpedBy(this.card.type) ? 'Protected' : 'Activate'
      } else {
        return this.game.getAttackablePlayers(this.card.type).length > 0 ? 'Targets' : 'No Targets'
      }
    },
    noButtonsText () {
      if (!isSafety(this.card.type)) {
        return 'None'
      }
      return ''
    },
    targetPlayers () {
      if (isSafety(this.card.type)) {
        return [this.game.currentPlayer()]
      } else {
        return this.game.getAttackablePlayers(this.card.type)
      }
    }
  },
  methods: {
    buttonText (player) {
      if (isSafety(this.card.type)) {
        return 'OK'
      }
      return player.name
    },
    playSpecialCard (player) {
      if (!this.game.currentPlayer().isAi) {
        this.game.takeTurn({
          type: 'playSpecialCard', player: this.game.currentPlayer(),
          target: player, card: this.card, cardOwner: this.player
        })
      }
    }
  }
}
</script>


<style scoped>
#target-overlay {
  position: absolute;
  width: 100%;
  border: solid black 0.1rem;
  border-radius: 0.5rem;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2%;
}

h5 {
  margin: 2%;
}
</style>

