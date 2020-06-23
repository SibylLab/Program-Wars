<template>
<div id="turn-history" :key="turnPlays.length">
  <ul>
    <li v-for="play in history" v-bind:key="play.playType">
      <img id="play-image" :src="image(play)">
      <img id="player-image" :src="playerImage(play)">
    </li>
  </ul>
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
      let start = end < 8 ? 0 : Math.abs(end - 8)
      return this.turnPlays.slice(start, end).reverse()
    }
  },
  methods: {
    image (play) {
      let path = 'static/cardImages/effects/'
      if (play.playType === "REDRAW") {
        path += 'REDRAW'
      } else if (play.playType === "DISCARD") {
        path += 'DISCARD'
      } else if (play.card.isSpecial() || play.card.type === 'VIRUS'){
        path += play.card.type
      } else {
        path += play.card.type + play.card.value
      }
      return path + '.png'
    },
    playerImage (play) {
      let path = 'static/playerImages/player'
      return path + play.player.id + '.png'
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
  overflow: hidden;
}

#play-image {
  width: 50px;
  height: 50px;
  border: solid white 1px;
}

#player-image {
  position: absolute;
  left: 35px;
  top: 5px;
  width: 27px;
  height: 27px;
  border: solid black 2px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  text-align: left;
  margin: 2px 10px;
}
</style>


