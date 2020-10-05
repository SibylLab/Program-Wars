<template>
<div id="hand-area">
  <slot name="buttons">
    <button class="btn btn-sm btn-primary my-btn"
        v-if="canPass" v-on:click="pass"
        title="Discard your hand and draw 5 new cards">
      <b>PASS</b>
    </button>
    <button class="btn btn-sm btn-danger my-btn" v-on:click="redraw"
        title="Discard your hand and draw 5 new cards"
        :disabled="!canRedraw">
      <b>REDRAW</b>
      <span v-if="redrawOnCD"> (ready in {{ redrawCD }}) </span>
    </button>
  </slot>

  <div id="info">
    <slot id="info">
      <turn-area-info/>
    </slot>
  </div>

  <div id="hand">
    <slot name="hand">
      <player-hand :player="game.currentPlayer()"/>
    </slot>
  </div>

  <div id="turns">
    <slot name="history">
      <turn-history/>
    </slot>
  </div>

</div>
</template>


<script>
import TurnAreaInfo from '@/components/info/TurnAreaInfo'
import playerHand from '@/components/handArea/PlayerHand'
import TurnHistory from '@/components/handArea/TurnHistory'
import { mapGetters } from 'vuex'

/**
 * This area of the screen holds the active players hand and other related
 * components.
 *
 * The buttons for pass and redraw that appear above the hand,
 * The cards in the hand, the info button for information on the hand area,
 * and the turn history component.
 * 
 * ### Slots
 * - **buttons**
 *    + **default:** `Pass` and `Redraw` buttons.
 *    + **purpose:** Holds buttons that give the player other turn options.
 * - **info**
 *    + **default:** {@link TurnAreaInfo}
 *    + **purpose:** Holds an info popup component for the area.
 * - **hand**
 *    + **default:** {@link PlayerHand}
 *    + **purpose:** Holds a component to display the current player's hand.
 * - **history**
 *    + **default:** {@link TurnHistory}
 *    + **purpose:** Holds the turn history component
 *
 * @vue-computed {bool} canRedraw - Checks to see if the current player is able to redraw
 * their hand.
 * @vue-computed {int} redrawCD - The number of turns until the current player can
 * use the redraw button again.
 * @vue-computed {bool} redrawOnCd - True if the current player's redraw is unavailable
 * because of a a REDRAW_CD, false otherwise.
 * @vue-computed {bool} canPass - True if the current player can use the pass button,
 * false otherwise.
 */
export default {
  name: 'hand-area',
  components: {
    'turn-area-info': TurnAreaInfo,
    'turn-history': TurnHistory,
    'player-hand': playerHand
  },
  computed: {
    ...mapGetters(['game']),
    canRedraw () {
      const player = this.game.currentPlayer()
      return !player.hurtBy('DDOS') && !player.hurtBy('REDRAW_CD')
    },
    redrawCD () {
      const player = this.game.currentPlayer()
      return player.effects.negative.find(e => e.type === 'REDRAW_CD').turnsLeft
    },
    redrawOnCD () {
      return this.game.currentPlayer().hurtBy('REDRAW_CD')
    },
    canPass () {
      const player = this.game.currentPlayer()
      return player.hurtBy('DDOS') || player.hurtBy('STACK_OVERFLOW')
        || player.hurtBy('STACK_UNDERFLOW')
    }
  },
  methods: {
    /**
     * Takes a redraw turn for the current player.
     */
    redraw () {
      if (!this.game.currentPlayer().isAI) {
        this.game.takeTurn({
          type: 'discardHand', player: this.game.currentPlayer()
        })
      }
    },
    /**
     * Takes a pass turn for the current player.
     */
    pass () {
      if (!this.game.currentPlayer().isAI) {
        this.game.takeTurn({
          type: 'pass', player: this.game.currentPlayer()
        })
      }
    }
  },
}
</script>

<style scoped>
#hand-area {
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
}

#info {
  display: inline-block;
}

#hand {
  width: 96%;
  height: 40%;
  margin: 2%;
}

#turns {
  display: inline-block;
  width: 80%;
  height: 25%;
}

.my-btn {
  border-radius: 1rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}
</style>
