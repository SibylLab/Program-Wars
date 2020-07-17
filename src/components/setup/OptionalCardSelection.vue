<template>
<div id="optional-card-selection">

  <div id="optional-cards" class="my-border"
      v-on:drop="dropInOptional($event)" @dragover.prevent @dragenter.prevent>
    <h4 style="color: black">Additional Cards
      <div :style="{color: pickedColor, display: 'inline'}">
        <b>{{ pageState.optionalCards.length }} / 10</b> </div>
    </h4>

    <div class="card-list">
      <img v-for="[idx, card] in Object.entries(pageState.optionalCards)" v-bind:key="idx"
          :src="cardImage(card.type, card.val)" class="card-lg" draggable
          v-on:dragstart="dragStart($event, idx, 'option')">
    </div>
  </div>

  <div id="card-pool" class="my-border"
      v-on:drop="dropInPool($event)" @dragover.prevent @dragenter.prevent>
    <h4 style="color: black">Available Cards</h4>
    <div class="card-list">
      <img v-for="[idx, card] in Object.entries(pageState.cardPool)" v-bind:key="idx"
          :src="cardImage(card.type, card.val)" class="card-lg" draggable
          v-on:dragstart="dragStart($event, idx, 'pool')">
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'optional-card-selection',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  computed: {
    pickedColor () {
      return this.pageState.optionalCards.length === 10 ? 'green' : 'red'
    }
  },
  methods: {
    cardImage (type, val) {
      return 'static/cardImages/' + type.toLowerCase() + val + '.png'
    },
    dragStart (event, idx, from) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('idx', idx)
      event.dataTransfer.setData('from', from)
    },
    dropInOptional (event) {
      const from = event.dataTransfer.getData('from')
      const fromIdx = event.dataTransfer.getData('idx')
      if (from === 'option' || this.pageState.optionalCards.length >= 10) { return }
      this.pageState.poolToOptional(fromIdx)  
    },
    dropInPool (event) {
      const from = event.dataTransfer.getData('from')
      const fromIdx = event.dataTransfer.getData('idx')
      if (from === 'pool') { return }
      this.pageState.optionalToPool(fromIdx)  
    }
  }
}
</script>

<style scoped>
#optional-card-selection {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}

#optional-cards {
  position: absolute;
  top: 0%;
  width: 100%;
  height: 49%;
}

#card-pool {
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 49%;
}

.card-lg {
  display: inline-block;
  width: 90px;
  height: auto;
  margin: 5px;
  margin-top: 30px;
}

.my-border {
  border: 8px ridge grey;
  border-radius: 10px;
}

.card-list {
  position: absolute;
  top: 18%;
  left: 0%;
  width: 100%;
  height: 82%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

h4 {
  margin: 0;
  margin-top: 10px;
}

</style>
