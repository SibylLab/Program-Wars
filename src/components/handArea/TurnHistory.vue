<template>
<div id="turn-history">
  <ul>
    <li v-for="play in history" v-bind:key="play.type + Math.random()">
      <img id="play-image" :src="image(play)">
      <img id="player-image" :src="playerImage(play)">
      <img id="target-image" v-if="hasTargetPlayer(play)" :src="targetImage(play)">
      <img id="effect-icon" v-if="hasEffectIcon(play)" :src="effectImage(play)">
    </li>
  </ul>

  <div id="info">
    <turn-history-info/>
  </div>
</div>
</template>


<script>
import TurnHistoryInfo from '@/components/info/TurnHistoryInfo'
import { isAttack, isSpecial } from '@/classes/card/cardData'
import { mapGetters } from 'vuex'

/**
 * Shows the last 8 plays that have been made with the card, player, and target
 * icons.
 * This is to help the players better keep track of what other players are doing.
 */
export default {
  name: 'turn-history',
  components: {
    'turn-history-info': TurnHistoryInfo,
  },
  computed: {
    ...mapGetters(['game']),
    /**
     * Returns the last 15 plays that were made.
     */
    history () {
      const end = this.game.turnHistory.length
      const start = end < 15 ? 0 : Math.abs(end - 15)
      return this.game.turnHistory.slice(start, end).reverse()
    }
  },
  methods: {
    /**
     * Given a play it will return the image path that is needed for the card
     * or effect.
     */
    image (play) {
      let path = 'static/cardImages/effects/'
      if (play.type === "discardHand") {
        path += 'REDRAW'
      } else if (play.type === "discardCard") {
        path += 'DISCARD'
      } else if (play.type === 'pass') {
        path += 'PASS'
      } else if (isSpecial(play.card.type) || play.card.type === 'VIRUS'
                 || play.card.type === 'METHOD'){
        path += play.card.type
      } else {
        path += play.card.type + play.card.value
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
        id = play.stack.player.id
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
          && isAttack(play.card.type)) {
        return true
      }
      return false
    },
    hasEffectIcon (play) {
      return (play.card && play.card.type === 'SCAN' && play.targetType !== 'player')
          || play.replaced || play.scanned
    },
    effectImage (play) {
      const path = 'static/cardImages/effects/'
      if (play.card.type === 'SCAN') {
        if (play.targetType === 'effect') {
          return play.target.image
        } else if (play.targetType === 'stack') {
          return path + 'VIRUS.png'
        } else {
          return path + 'TROJAN.png'
        }
      } else if (play.replaced) {
        return path + 'TROJAN.png'
      } else if (play.scanned) {
        return path + 'SCAN.png'
      }
    }
  }
}
</script>


<style scoped>
#turn-history {
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge grey 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: left;
  overflow: hidden;
}

#play-image {
  width: 3.2rem;
  height: 3.2rem;
  border: solid white 0.05rem;
}

#player-image {
  position: absolute;
  left: 2.2rem;
  top: 0.1rem;
  width: 1.55rem;
  height: 1.55rem;
  border: solid black 0.05rem;
}

#target-image {
  position: absolute;
  left: 2.35rem;
  top: 1.85rem;
  width: 1.2rem;
  height: 1.2rem;
  border: solid black 0.05rem;
}

#effect-icon {
  position: absolute;
  top: 1.85rem;
  left: -0.2rem;
  width: 1.2rem;
  height: 1.2rem;
  border: solid darkgrey 0.05rem;
}

#info {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
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
  margin: 0.45rem 0.6rem;
}
</style>


