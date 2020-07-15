<template>
<div id="card-list">

  <img v-for="[idx, card] in cards.entries()" v-bind:key="idx"
    :src="cardImage(card)" v-on:click="select(idx)"
    :class="['card', {active: activeCard(idx)}]">

</div>
</template>

<script>
export default {
  name: 'card-list',
  props: ['title', 'cards'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  methods: {
    cardImage (card) {
      return 'static/cardImages/requirements/' + card + '.png'
    },
    activeCard (idx) {
      return this.pageState.reqNum === idx
    },
    select (idx) {
      this.pageState.reqNum = idx
    }
  }
}
</script>

<style scoped>
#card-list {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  display: inline;
  top: 10%;
  height: 80%;
  width: auto;
  margin: 0 10px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>
