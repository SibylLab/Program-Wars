<template>
<div id="turn-area">
  <button class="btn btn-sm btn-info col-6" v-on:click="redrawHand"
      style="border-radius: 40px; margin-top: 1%;"
      title="Discard your hand and draw 5 new cards">
    REDRAW
  </button>

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
import TurnAreaCard from '@/components/game/TurnAreaCard'
import MessageBox from '@/components/game/MessageBox'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'card-area',
  components: {
    'message-box': MessageBox,
    'turn-area-card': TurnAreaCard
  },
  computed: {
    ...mapGetters([
      'getCurrentPlayerHand',
      'getCurrentPlayer'
    ]),
  },
  methods: {
    ...mapMutations([
      'giveNewHand'
    ]),
    redrawHand () {
      this.giveNewHand({player: this.getCurrentPlayer})
    }
  }
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

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  margin: 7px;
}

button:focus {
  outline-width: 0;
}
</style>


