<template>
<div id="turn-history">
  <ul>
    <li v-for="play in history" v-bind:key="play.type + Math.random()">
      <img id="play-image" :src="image(play)">
      <img id="player-image" :src="playerImage(play)">
      <img id="target-image" v-if="hasTargetPlayer(play)" :src="targetImage(play)">
      <img id="trojan-icon" v-if="play.type === 'playMimic'" :src="trojanIcon">
    </li>
  </ul>

  <div id="info">
    <turn-history-info/>
  </div>
</div>
</template>


<script>
import TurnHistoryInfo from '@/components/info/TurnHistoryInfo'
import cardData from '@/classes/card/cardData'

/**
 * Shows the last 8 plays that have been made with the card, player, and target
 * icons.
 * This is to help the players better keep track of what other players are doing.
 */
export default {
  name: 'turn-history',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'turn-history-info': TurnHistoryInfo,
  },
  computed: {
    /**
     * Returns the last 10 plays that were made.
     */
    history () {
      const end = this.pageState.turnHistory.length
      const start = end < 10 ? 0 : Math.abs(end - 10)
      return this.pageState.turnHistory.slice(start, end).reverse()
    },
    trojanIcon () { return 'static/cardImages/effects/TROJAN.png' }
  },
  methods: {
    /**
     * Given a play it will return the image path that is needed for the card
     * or effect.
     */
    image (play) {
      const card = play.type === 'playMimic' ? play.playedCard : play.card
      let path = 'static/cardImages/effects/'
      if (play.type === "discardHand") {
        path += 'REDRAW'
      } else if (play.type === "discardCard") {
        path += 'DISCARD'
      } else if (play.type === 'pass') {
        path += 'PASS'
      } else if (cardData.isSpecial(card.type) || card.type === 'VIRUS'
                 || card.type === 'METHOD'){
        path += card.type
      } else {
        path += card.type + card.value
      }

      return path + '.png'
    },
    /**
     * Return the path for the player's image.
     */
    playerImage (play) {
      let path = 'static/playerImages/player'
      return path + play.player.id + '.png'
    },
    /**
     * Return the path for the target player's image.
     */
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
    /**
     * Checks to see if a play should have a target player.
     */
    hasTargetPlayer (play) {
      if (play.type !== 'discardCard' && play.card
          && cardData.isAttack(play.card.type)) {
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

#trojan-icon {
  position: absolute;
  top: 27px;
  left: -3px;
  width: 20px;
  height: 20px;
  border: solid darkgrey 1px;
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


