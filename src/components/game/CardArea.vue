<template>
<div id="turn-area">
  <button class="btn btn-sm btn-danger" v-on:click="redrawHand"
      style="border-radius: 40px; margin-top: 1%;"
      title="Discard your hand and draw 5 new cards">
    REDRAW
  </button>

  <div id="info">
    <card-area-info/>
  </div>

  <div id="cards" :key="update">
    <ul>
      <li v-for="card in getCurrentPlayerHand.cards" v-bind:key="card.id">
        <turn-area-card :card="card"></turn-area-card>
      </li>
    </ul>
  </div>

  <div id="turns">
    <turn-history></turn-history>
  </div>
</div>
</template>


<script>
import CardAreaInfo from '@/components/info/CardAreaInfo'
import TurnAreaCard from '@/components/game/TurnAreaCard'
import TurnHistory from '@/components/game/TurnHistory'
import {bus} from '@/components/shared/Bus'
import {mapGetters, mapState, mapActions} from 'vuex'

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
      update: 1
    }
  },
  components: {
    'card-area-info': CardAreaInfo,
    'turn-history': TurnHistory,
    'turn-area-card': TurnAreaCard
  },
  computed: {
    ...mapState([
      'activePlayer',
    ]),
    ...mapGetters([
      'getCurrentPlayerHand',
    ])
  },
  methods: {
    ...mapActions([
      'executeTurn',
    ]),
    redrawHand () {
      if (!this.activePlayer.isAi) {
        this.executeTurn({
          playType: "REDRAW",
          card: undefined,
          player: this.activePlayer,
          target: this.activePlayer
        })
      }
    }
  },
  created () {
    bus.$on('card-played', () => {
      // Required to redraw the screen when a card is played
      this.update = !this.update
    })
  }
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

#cards {
  margin-top: 2%;
}

#turns {
  position: absolute;
  bottom: 17%;
  left: 10%;
  width: 80%;
  height: 80px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  text-align: center;
  margin: 7px;
}

.btn:focus {
  outline-width: 0;
}

.btn:active {
  outline-width: 0;
}
</style>



