<template>
<div id="stack">
  <div style="text-align: center">
    <h5 style="margin:0; margin-top: 5px;">Score: 50</h5>
  </div>
  <ul id="card-list" @drop="onDrop($event)" @dragover.prevent @dragenter.prevent>
      <img v-for="card in stack.cards" v-bind:key="card.id" :src="card.image" class="card">
  </ul>
</div>
</template>


<script>
//import {mapState, mapActions} from 'vuex'

export default {
  name: 'card-stack',
  props: ['stack'],
  components: {
  },
  computed: {
  },
  methods: {
    onDrop (evt) {
      let cardId = evt.dataTransfer.getData('cardId')
      let playerId = evt.dataTransfer.getData('playerId')
      let canDrop = evt.dataTransfer.getData('canDrop')
      console.log(cardId + " " + playerId + " " + canDrop)
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


