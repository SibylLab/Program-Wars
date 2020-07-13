<template>
<div id="info" :key="update" :class="opposite">
  <h3 id="name" :class="side">
    {{ player.name }}
  </h3>

  <button id="spy-button" v-if="canSpy" :class="['btn', 'btn-sm', spyStyle]"
      v-on:click="spyHand()">
    {{ spyText }}
  </button>

  <div id="hand-box" v-if="showHand">
    <h3 style="margin: 0;">
      {{ player.name }}'s hand
    </h3>
    <ul>
      <li v-for="card in playerCards" v-bind:key="card.id">
        <img :src="card.image" class="spy-card" ondragstart="return false">
      </li>
    </ul>
  </div>

  <img id="avatar" :class="[side, {active: isActive}]"
      :src="player.image">

  <div id="score-area" :class="side">
    <slot>
      <h5 id="score-title" :class="side" style="position: absolute;">
        <b>Score:</b> <b>{{ getScore() }}/{{ scoreLimit }}</b>
      </h5>
      <meter id="score-meter" :class="side"
         :max="scoreLimit" min=0
         :value="getScore()"
         :high="scoreLimit * 0.7"
         :low="scoreLimit / 2"
         :optimum="scoreLimit * 0.9">
      </meter>
    </slot>
  </div>

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

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import tooltips from '@/data/tooltips'
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

/**
 * Displays the information for a single player.
 * Organizes the players name, avatar, score, and active effects together.
 * Is highlighted when the player is the active player.
 */
export default {
  name: 'player-info',
  props: ['player', 'side'],
  data () {
    return {
      update: true,
      showHand: false
    }
  },
  components: {
    'info-popup': InfoPopup,
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
      // Must access get player scores as a getters method instead of normal
      // mapGetters to avoid caching and not returning an updated score
      let scores = this.$store.getters.getPlayerScores()
      let scoreInfo = scores.find(scr => scr.playerId === this.player.id)
      return scoreInfo.score
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
#info {
  position: absolute;
  width: 95%;
  height: 100%;
}

#name {
  position: absolute;
  top: 2%;
  margin-top: 0;
  margin-bottom: 0;
  color: #333333;
}

#avatar {
  position: absolute;
  top: 15%;
  width: auto;
  height: 25%;
  border: solid black 3px;
  border-radius: 5px;
}

#score-area {
  position: absolute;
  top: 45%;
  width: 60%;
  height: 50px;
}

#score-meter {
  position: absolute;
  top: 45%;
  width: 100%;
  height: 30px;
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
  top: 4%;
  right: 20%;
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

