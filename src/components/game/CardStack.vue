<template>
<div id="stack" ondragstart="return false;">
  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;">Score: 50</h5>
  </div>
  <ul id="card-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
      <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image" class="card">
  </ul>
</div>
</template>


<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'card-stack',
  props: ['stack'],
  components: {
  },
  computed: {
    ...mapState([
      'activePlayer'
    ]),
    ...mapGetters([
      'getCurrentPlayerHand',
    ])
  },
  methods: {
    onDrop (evt) {
      let cardId = parseInt(evt.dataTransfer.getData('cardId'))
      let hand = this.getCurrentPlayerHand
      let card = hand.cards.find(c => c.id === cardId)
      if (this.stack.playerId === this.activePlayer.id
          && this.stack.willAccept(card)) {
        console.log("Will Accept: " + card.type)
      }
    }
  },
}
</script>

<style scoped>
#stack {
  min-width: 235px;
}

.card {
  margin-right: -27px;
  max-width: 90px;
  max-height: 100px;
}

ul {
  list-style: none;
  margin: 10px;
  padding: 0 0 0 0;
}
</style>


