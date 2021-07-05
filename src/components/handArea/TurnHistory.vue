<template>
<div id="turn-history">
  <div id="tag"><b>Last Play</b></div>
  <div id="last-move">
    <div id="last-move-image" v-if="firstPlay">
      <img id="play-image" :src="image(firstPlay)">
      <img id="player-image" :src="playerImage(firstPlay)">
      <img id="target-image" v-if="hasTargetPlayer(firstPlay)" :src="targetImage(firstPlay)">
      <img id="effect-icon" v-if="hasEffectIcon(firstPlay)" :src="effectImage(firstPlay)">
    </div>
  </div>

  <div id="prev-moves">
    <ul>
      <li v-for="play in history" v-bind:key="play.type + Math.random()">
        <img id="play-image" :src="image(play)">
        <img id="player-image" :src="playerImage(play)">
        <img id="target-image" v-if="hasTargetPlayer(play)" :src="targetImage(play)">
        <img id="effect-icon" v-if="hasEffectIcon(play)" :src="effectImage(play)">
      </li>
    </ul>
  </div>

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
 * Shows a number of the last plays taken in the game.
 *
 * Each play consists of large card icon to show which card was played. It also
 * will have a small image in the top right corner for the player who played the card.
 * If there was a target of the card an icon for the target player will be shown in
 * the bottom right corner. For scan cards an image for the scanned effect will
 * be shown in the bottom left corner, and for mimic cards an image of the Trojan
 * card will be shown here to indicate that the card was replaced.
 *
 * @vue-computed {Object[]} history - Returns a collection of the last 15
 * `playInfo` objects that were created. See {@link AIHandler} for more information
 * on what can be in a `playInfo` object. Not all of these are guranteed to be shown
 * but are included as different aspect ratios may change the number of icons
 * that will fit in the display.
 */
export default {
  name: 'turn-history',
  components: {
    'turn-history-info': TurnHistoryInfo,
  },
  computed: {
    ...mapGetters(['game']),
    firstPlay () {
      const len = this.game.turnHistory.length
      if (len > 0) {
        return this.game.turnHistory[len - 1]
      } else {
        return null
      }
    },
    history () {
      const end = this.game.turnHistory.length - 1
      const start = end < 15 ? 0 : Math.abs(end - 15)
      return this.game.turnHistory.slice(start, end).reverse()
    }
  },
  methods: {
    /**
     * Returns an image path for the card icon of the given play.
     * @param {Object} play - The `playInfo` object for a play.
     * @param {string} play.type - The card type for the play.
     * @param {int} play.value - The value of the card that was played.
     * @return {string} An image path for the card icon.
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
     * Returns the path to the image for the player who made the given play.
     * @param {Object} play - The `playInfo` object for a play.
     * @param {Player} play.player - The player who made the play.
     */
    playerImage (play) {
      let path = 'static/playerImages/player'
      return path + play.player.id + '.png'
    },
    /**
     * Checks to see if a play should have a target player.
     * @param {Object} play - The play to check.
     * @param {string} play.type - The type of the play.
     * @param {Card} play.card - The card that was part of the play (if applicable).
     * @return {bool} True if the play type can have a target player, false otherwise.
     */
    hasTargetPlayer (play) {
      if (play.type !== 'discardCard' && play.card
          && isAttack(play.card.type)) {
        return true
      }
      return false
    },
    /**
     * Returns the path to the image for the player who was the target of the given play.
     *
     * The caller is responsible for making sure the given play had a target before
     * calling this method.
     *
     * @param {Object} play - The `playInfo` object for a play.
     * @param {string} play.type - The card type for the play.
     * @param {Stack} play.stack - The stack that was the target of the play, which
     * will contain the player who owns it and is the target for the attack. Only
     * present if the card type is `VIRUS`.
     * @param {Player} play.target - The player that is the target of the play.
     * @return {string} The image path for the target player.
     */
    targetImage (play) {
      let path = 'static/playerImages/player'
      let id
      if (play.card.type === 'VIRUS') {
        id = play.stack.player.id
      } else {
        id = play.target.id
      }
      return path + id + '.png'
    },
    /**
     * Checks the given play to see if it should have an effect icon in the lower
     * left corner.
     * @param {Object} play - The play object to check. The possible members are not
     * listed as the choice is made based on whether or not they are there, non are
     * required.
     * @return {bool} True if the play should have an effect icon, i.e. `SCAN`.
     */
    hasEffectIcon (play) {
      return (play.card && play.card.type === 'SCAN' && play.targetType !== 'player')
          || play.replaced || play.scanned
    },
    /**
     * Returns the path to the image for an effect icon that will be placed in
     * the lower right corner.
     *
     * The caller is responsible for making sure that the play has an effect image
     * before calling this function or the resulting image path will be `undefined`.
     *
     * @param {Object} play - The `playInfo` object for a play.
     * @param {card} play.card - The card that was played, **required**.
     * @param {string} play.targetType - The type of the target that was scanned,
     * if applicable.
     * @return {string|undefined} The path to the image for the effect, or `undefined`
     * if the play does not need an effect image.
     */
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
}

#tag {
  position: absolute;
  left: 0rem;
  bottom: -1.4rem;
}

#last-move {
  position: absolute;
  left: 0;
  top: 0;
  width: 5.7rem;
  height: 100%;
  background-color: #333333;
  border: ridge grey 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: left;
  overflow: hidden;
}

#last-move-image {
  position: absolute;
  top: 10%;
  left: 13%;
}

#prev-moves {
  position: absolute;
  left: 6rem;
  width: 84%;
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
  top: 0.5rem;
  left: -1.5rem;
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


