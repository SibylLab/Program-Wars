<template>
<div id="turn-area">
  <button class="btn btn-sm btn-info col-6" v-on:click="redrawHand"
      style="border-radius: 40px; margin-top: 1%;"
      title="Discard your hand and draw 5 new cards">
    REDRAW
  </button>

  <div id="cards">
    <ul>
      <li v-for="card in currentHand" v-bind:key="card.id">
        <img v-if="isAiTurn" :src="card.image" class="turn-card">
        <img v-else src="static/cardImages/backOfCard.png" class="turn-card">
      </li>
    </ul>
  </div>

  <div id="messages">
    <message-box></message-box>
  </div>
</div>
</template>


<script>
import MessageBox from '@/components/game/MessageBox'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'card-area',
  components: {
    'message-box': MessageBox
  },
  computed: {
    isAiTurn () {
      return !this.getCurrentPlayer().isAi
    },
    currentHand () {
      let hand = this.getCurrentPlayerHand().cards
      console.log(hand)
      return hand
    }
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayerHand',
      'getCurrentPlayer'
    ]),
    ...mapMutations([
      'giveNewHand'
    ]),
    currentPlayerName () {
      return this.getCurrentPlayer().name
    },
    redrawHand () {
      this.giveNewHand({player: this.getCurrentPlayer()})
    }
  }
  // Add created and bus.on to check when players change if needed to refresh
  // the hand being shown
}
</script>

<style scoped>
#turn-area {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}

#cards {
  margin-top: 1%;
}

#messages {
  position: absolute;
  top: 60%;
  left: 10%;
  width: 80%;
  height: 30%;
  border: solid black 5px;
}

.turn-card {
  max-width: 90px;
  max-height: 134px;
  margin: 5px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
}
</style>


