<template>
<div id="turn-history" :key="turnPlays.length">
  <ul>
    <li v-for="play in history" v-bind:key="play.playType + Math.random()">
      <img id="play-image" :src="image(play)">
      <img id="player-image" :src="playerImage(play)">
      <img id="target-image" v-if="hasTargetPlayer(play)" :src="targetImage(play)">
    </li>
  </ul>

  <div id="info">
    <info-popup>
      <h3 style="margin: 0">Turn History</h3>
      <p>The last 8 actions taken by players will be displayed with images
         in the Turn History Box.
      </p>
      <p>The main portion of the image shows the card that was played. The
         value of the card is in the top right corner.</p>
      <p>The image of the player who played the card will appear over the top
         right corner of the card image. If the card targeted another player
         the image for that player will appear over the bottom right corner.
      </p>
      <p>The leftmost image is always the last turn that was taken.</p>
    </info-popup>
  </div>
</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import {mapState} from 'vuex'

/**
 */
export default {
  name: 'turn-history',
  components: {
    'info-popup': InfoPopup,
  },
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
    },
    targetImage (play) {
      let path = 'static/playerImages/player'
      let id = '0'
      if (play.card.type === 'VIRUS') {
        id = play.target.playerId
      } else {
        id = play.target.id
      }
      return path + id + '.png'
    },
    hasTargetPlayer (play) {
      if (play.card && (play.card.isAttack() || play.card.type === 'VIRUS')) {
        return true
      }
      return false
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
  top: 1px;
  width: 27px;
  height: 27px;
  border: solid black 2px;
}

#target-image {
  position: absolute;
  left: 38px;
  top: 29px;
  width: 20px;
  height: 20px;
  border: solid black 2px;
}

#info {
  position: absolute;
  top: 5px;
  right: 5px;
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
  margin: 3px 10px;
}
</style>


