<template>
<div id="stacks-area" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
  <h3 style="margin: 0; margin-top: 2px; margin-left: 5px; color: #fff;">{{ player.name }}_main:</h3>
  <ul id="stack-list">
      <card-stack class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id" :stack="stack"></card-stack>
  </ul>
</div>
</template>


<script>
import CardStack from '@/components/game/CardStack'
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'play-field',
  props: ['player'],
  components: {
   'card-stack': CardStack
  },
  computed: {
    ...mapState([
      'stacks',
      'activePlayer'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand'
    ]),
    playerStacks () {
      return this.stacks.filter(s => s.playerId === this.player.id)
    }
  },
  methods: {
    ...mapActions([
      'addNewStack'
    ]),
    onDrop (evt) {
      let cardId = parseInt(evt.dataTransfer.getData('cardId'))
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)

      if (card && this.player.id === this.activePlayer.id
          && card.type === "INSTRUCTION") {
        this.addNewStack({card: card, playerId: this.player.id})
      }
    }
  }
}
</script>

<style scoped>
#stacks-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #44b863;
  border: solid black 4px;
  border-radius: 6px;
  overflow: auto;
  text-align: left;
}

.card-stack {
  display: inline-block;
  margin: 5px; 
}

ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 0;
  text-align: left;
}
</style>

