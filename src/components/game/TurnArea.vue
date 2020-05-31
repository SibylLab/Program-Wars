<template>
<div id="turn-area" v-bind:key="update">
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
import {bus} from '@/components/shared/Bus'
import TurnAreaCard from '@/components/game/TurnAreaCard'
import MessageBox from '@/components/game/MessageBox'
import {mapGetters, mapMutations, mapState, mapActions} from 'vuex'

export default {
  name: 'card-area',
  data () {
    return {
      update: 1
    }
  },
  components: {
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
    ...mapMutations([
      'giveNewHand',
    ]),
    ...mapActions([
      'endTurn'
    ]),
    redrawHand () {
      this.giveNewHand({player: this.activePlayer})
      this.endTurn({draw: false})
    }
  },
  created () {
    bus.$on('card-played', () => {
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
  border-radius: 5px;
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

.btn:focus {
  outline-width: 0;
}

.btn:active {
  outline-width: 0;
}
</style>


