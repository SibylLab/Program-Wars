<template>
<div id="card-list">

  <h3>{{ title }}</h3>

  <img v-for="[idx, card] in cards.entries()" v-bind:key="idx"
    :src="cardImage(card)" class="card">

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
    }
  }
}
</script>

<style scoped>
#card-list {
  position: relative;
  width: 100%;
  height: 100%;
  border: 10px ridge darkgrey;
  border-radius: 20px;
  background-color: #333333;
}

.card {
  display: inline;
  margin: 20px;
  height: 70%;
  width: auto;
}

h3 {
  margin: 0;
  margin-top: 10px;
  color: #3385ff;
}
</style>
