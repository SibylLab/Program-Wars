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
 * The overlay that appears over an attack or safety card to allow players to play it.
 *
 * Displays buttons for each attackable target that when clicked will add the
 * attack the that player. Right now safety cards can only work for the card owner
 * so a button appears that just says 'OK', if they can play it on themselves.
 *
 * @vue-prop {Card} card - The attack card to overlay.
 * @vue-prop {Player} owner - The player that the card belongs to.
 * @vue-computed {string} titleText - For safety cards either 'Activate' or 'Protected,
 * and for attack cards either 'Targets' or 'No Targets'.
 * @vue-computed {Players[]} targetPlayers - Returns a list of players that the card
 * can be played on, can be empty if there are no valid players.
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
    targetPlayers () {
      if (isSafety(this.card.type)) {
        return [this.game.currentPlayer()]
      } else {
        return this.game.getAttackablePlayers(this.card.type)
      }
    }
  },
  methods: {
    /**
     * Gives the text to put on the button for the player.
     *
     * If the card is a safety card this is 'OK', otherwise it is the player's name.
     * @param {Player} player - The player to provide button text for.
     * @return {string} The text to put on a button for the given player.
     */
    buttonText (player) {
      if (isSafety(this.card.type)) {
        return 'OK'
      }
      return player.name
    },
    /**
     * Takes a turn for the current player to play the card on the given target player.
     * @param {Player} player - The player the card is being played on.
     */
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

