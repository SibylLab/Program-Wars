<template>
<div id="turn-area">
  <slot name="buttons">
    <button class="btn btn-sm btn-danger" v-on:click="redraw"
        style="border-radius: 40px; margin-top: 1%;"
        title="Discard your hand and draw 5 new cards">
      REDRAW
    </button>
  </slot>

  <slot id="info">
    <div id="info">
      <turn-area-info/>
    </div>
  </slot>

  <slot name="hand">
    <div id="hand">
      <player-hand :player="pageState.currentPlayer()"/>
    </div>
  </slot>

  <slot name="history">
    <div id="turns">
      <turn-history></turn-history>
    </div>
  </slot>
</div>
</template>


<script>
import TurnAreaInfo from '@/components/info/TurnAreaInfo'
import playerHand from '@/components/game/PlayerHand'
import TurnHistory from '@/components/game/TurnHistory'

/**
 * Displays the active components needed for players to take their turn.
 * These components include the Redraw button, the active players hand,
 * and a message area to display information about game actions and other
 * game tips.
 */
export default {
  name: 'card-area',
  data () {
    return {
      update: 1,
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'turn-area-info': TurnAreaInfo,
    'turn-history': TurnHistory,
    'player-hand': playerHand
  },
  methods: {
    redraw () {
      if (!this.pageState.currentPlayer().isAi) {
        const player = this.pageState.currentPlayer()
        this.pageState.takeTurn({type: "discardHand", player: player})
      }
    }
  },
}
</script>

<style scoped>
#turn-area {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
}

#info {
  position: absolute;
  right: 38%;
  top: 1.5%;
}

#hand {
  margin-top: 2%;
}

#turns {
  position: absolute;
  bottom: 17%;
  left: 10%;
  width: 80%;
  height: 80px;
}
</style>



