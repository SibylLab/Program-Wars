<template>
<div id="player-area" :key="update" :class="opposite">

  <div id="details">
    <slot name="details">
      <player-details :player="player" :side="side"/>
    </slot>
  </div>

  <slot name="score">
    <h5 id="score-title" :class="side" style="position: absolute; top: 44%;">
      <b>Score:</b> <b>{{ getScore() }}/{{ scoreLimit }}</b>
    </h5>
    <div id="score-area" :class="side">
      <meter id="score-meter"
         :max="scoreLimit" min=0
         :value="getScore()"
         :high="scoreLimit * 0.7"
         :low="scoreLimit / 2"
         :optimum="scoreLimit * 0.9">
      </meter>
    </div>
  </slot>

  <slot name="player-effects">
    <div id="effects-area" :class="side">
      <h5 id="good-effects-text" :class="side"><b>Threat Prevention</b></h5>
      <div id="good-effects" :class="side"
          style="position: absolute; top: 5%;">
        <ul>
          <img v-for="effect in player.positiveEffects" v-bind:key="effect.id"
              class="effect-icon" :src="effect.image"
              :title="effectTooltip(effect.type)">
        </ul>
      </div>

      <h5 id="bad-effects-text" :class="side"><b>Active Threats</b></h5>
      <div id="bad-effects" :class="side"
          style="position: absolute; top: 55%;">
        <ul>
          <img v-for="effect in player.negativeEffects" v-bind:key="effect.id"  
              class="effect-icon" :src="effect.image"
              :title="effectTooltip(effect.type)">
        </ul>
      </div>
    </div>
  </slot>

  <slot name="info">
    <div id="info-button" v-if="side === 'left' && player.id === 0">
      <info-popup>
        <h3 style="margin: 0">Player Info</h3>
        <p>This area shows information about a player. On the players turn their picture
           is highlighted green.</p>
        <p>Score shows the players current progress toward the score limit. This score
           will be adjusted to reflect any modifiers the player has that affect score,
           like the Malware card.</p>
        <p>Threat prevention shows all the safety and remedy cards that are active on the
           player. You can mouse over them to be reminded of what their effect is.</p>
        <p>Active Threats shows all the cyber attack cards that are active on the player.
           These effects can be removed or prevented by safety cards.
           eg) Antivirus removes all malware effects.</p>
      </info-popup>
    </div>
  </slot>

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import PlayerDetails from '@/components/game/PlayerDetails'
import tooltips from '@/data/tooltips'
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

/**
 * Displays the information for a single player.
 * Organizes the players name, avatar, score, and active effects together.
 * Is highlighted when the player is the active player.
 */
export default {
  name: 'player-area',
  props: ['player', 'side'],
  data () {
    return {
      update: true,
      showHand: false
    }
  },
  components: {
    'info-popup': InfoPopup,
    'player-details': PlayerDetails,
  },
  computed: {
    ...mapState([
      'scoreLimit',
      'stacks',
      'activePlayer',
      'hands'
    ]),
    playerImagePath () {
      // later change to imageId to get the specific image they want 
      return "/static/playerImages/robo_" + this.player.id + ".jpg"
    },
    isActive () {
      return this.player === this.activePlayer
    },
    opposite () {
      return this.side === 'right' ? 'left' : 'right'
    },
    canSpy () {
      let spies = this.player.negativeEffects.filter(e => e.type === 'SPYWARE')
      return spies.find(s => s.attackerId === this.activePlayer.id) !== undefined
    },
    playerCards () {
      let hand = this.hands.find(h => h.playerId === this.player.id)
      return hand.cards
    },
    spyText () {
      return this.showHand ? 'End Spy' : 'Spy'
    },
    spyStyle () {
      return this.showHand ? 'btn-danger' : 'btn-primary'
    }
  },
  methods: {
    effectImagePath (effect) {
      return "/static/cardImages/effects/" + effect + ".png"
    },
    effectTooltip (effect) {
      return tooltips.effects[effect]
    },
    /**
     * Get the players total score from their stacks.
     * Apply any special effects and round down to the nearest integer.
     */
    getScore () {
      return 20
    },
    spyHand () {
      this.showHand = !this.showHand
    }
  },
  created () {
    bus.$on('card-played', () => {
      // Scores and effect lists must be updated when a card is played
      this.update = !this.update
    })
    bus.$on('end-turn', () => {
      this.showHand = false
    })
  }
}
</script>


<style scoped>
#player-area {
  position: absolute;
  width: 95%;
  height: 100%;
  font-family: monospace;
}

#details {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 40%;
}

#score-area {
  position: absolute;
  top: 50%;
  width: 50%;
  height: 24px;
}

#score-meter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
}

#effects-area {
  position: absolute;
  top: 60%;
  width: 100%;
  height: 35%;
}

#good-effects-text {
  position:absolute;
  top: 0;
}

#bad-effects-text {
  position:absolute;
  top: 50%;
}

#info-button {
  position: absolute;
  top: 10%;
  left: 35%;
}

#spy-button {
  position: absolute;
  top: 17%;
}

#hand-box {
  position: fixed;
  min-width: 650px;
  width: 45%;
  top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #DFDFDF;
  border: solid black 3px;
  border-radius: 5px;
  z-index: 200;
}

.left {
  left: 0%;
}

.right {
  right: 0%;
}

.active {
  -webkit-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  box-shadow: 0 0 24px 10px rgba(0,230,0,1);
}

.effect-icon {
  width: 30px;
  height: 30px;
  margin: 20px 5px; 
}

.spy-card {
  margin: 10px;
  width: 100px;
  height: auto;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline;
}

h5 {
  margin: 0;
}
</style>


