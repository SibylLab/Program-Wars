<template>
<div id="turn-area" v-bind:key="update">
  <button class="btn btn-sm btn-info col-6" v-on:click="redrawHand"
      style="border-radius: 40px; margin-top: 1%;"
      title="Discard your hand and draw 5 new cards">
    REDRAW
  </button>

  <div id="info">
    <info-popup>
      <h3 style="margin: 0">Turn Area</h3>
      <p>Play instruction cards by dragging them to your play area.</p>
      <p>Other cards can be played on stacks with the top card higlighted.</p>
      <p>Special cards will tell you where you can play them. You can activate or
         play a special card by clicking the button that appears over it when it is
         useable.</p>
      <p>Any card can be discarded by clicking the trash icon in the left corner when
         the card is selected</p>
      <p>You can discard your entire hand if you don't like your options. You will draw a
         fresh new hand to replace it.</p>
      <p>Any of the above actions will end your turn.</p>
    </info-popup>
  </div>

  <div id="cards">
    <ul>
      <li v-for="card in getCurrentPlayerHand.cards" v-bind:key="card.id">
        <turn-area-card :card="card"></turn-area-card>
      </li>
    </ul>
  </div>

  <div id="messages">
    <message-box></message-box>
  </div>
</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import TurnAreaCard from '@/components/game/TurnAreaCard'
import MessageBox from '@/components/game/MessageBox'
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
    'info-popup': InfoPopup,
    'message-box': MessageBox,
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
  margin-top: 1%;
}

#messages {
  position: absolute;
  top: 56%;
  left: 10%;
  width: 80%;
  height: 30%;
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


