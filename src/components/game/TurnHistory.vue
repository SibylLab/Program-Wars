<template>
<div id="turn-history" :key="turnPlays.length">
  <p v-for="play in history" v-bind:key="play.card.id">
    {{ play.playType }}
  </p>
</div>
</template>


<script>
import {mapState} from 'vuex'

/**
 */
export default {
  name: 'turn-history',
  computed: {
    ...mapState([
      'turnPlays'
    ]),
    history () {
      let end = this.turnPlays.length
      let start = end < 10 ? 0 : Math.abs(end - 10)
      return this.turnPlays.slice(start, end).reverse()
    }
  }
}
</script>


<style scoped>
#turn-history {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge grey 8px;
  border-radius: 6px;
  color: #fff;
  font-size: 18px;
  text-align: left;
  line-height: 22px;
  padding: 5px;
  overflow: auto;
}
</style>


