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
      <span v-if="!canRedraw"> (ready in {{ redrawCD }}) </span>
    </button>
  </slot>

  <slot id="info">
    <div id="info">
      <turn-area-info/>
    </div>
  </slot>

  <slot name="hand">
    <div id="hand">
      <player-hand :player="game.currentPlayer()"/>
    </div>
  </slot>

  <slot name="history">
    <div id="turns">
      <turn-history/>
    </div>
  </slot>
</div>
</template>


<script>
import TurnAreaInfo from '@/components/info/TurnAreaInfo'
import playerHand from '@/components/handArea/PlayerHand'
import TurnHistory from '@/components/handArea/TurnHistory'
import { mapGetters } from 'vuex'

/**
 * Displays the active components needed for players to take their turn.
 * These components include the Redraw button, the active players hand,
 * and a message area to display information about game actions and other
 * game tips.
 */
export default {
  name: 'hand-area',
  data () {
    return {
      update: 1,
    }
  },
  components: {
    'turn-area-info': TurnAreaInfo,
    'turn-history': TurnHistory,
    'player-hand': playerHand
  },
  computed: {
    ...mapGetters(['game']),
    canRedraw () {
      const player = this.game.currentPlayer()
      // on DDoS player can pass so redraw cd does not affect the button
      return player.hurtBy('DDOS') || !player.hurtBy('REDRAW_CD')
    },
    redrawCD () {
      const player = this.game.currentPlayer()
      return player.effects.negative.find(e => e.type === 'REDRAW_CD').turnsLeft
    },
    canPass () {
      const player = this.game.currentPlayer()
      return player.hurtBy('DDOS') || player.hurtBy('STACK_OVERFLOW')
        || player.hurtBy('STACK_UNDERFLOW')
    }
  },
  methods: {
    redraw () {
      if (!this.game.currentPlayer().isAI) {
        this.game.takeTurn({
          type: 'discardHand', player: this.game.currentPlayer()
        })
      }
    },
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
