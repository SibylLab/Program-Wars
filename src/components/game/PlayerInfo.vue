<template>
<div id="info" :key="update" :class="[outside]">
  <h3 id="name" :class="side">
    {{ player.name }}
  </h3>

  <img id="avatar" :class="[side, {active: isActive}]"
      :src="playerImagePath">

  <h5 id="score-title" :class="side" style="position: absolute; top: 44%;">
    <b>Score</b>
  </h5>
  <div id="score-area" :class="side">
    <h5 id="score-text"><b>{{ getScore() }}/{{ scoreLimit }}</b></h5>
    <meter id="score-meter" style="z-index: 20;"
       :max="scoreLimit" min=0
       :value="getScore()"
       :high="scoreLimit * 0.7"
       :low="scoreLimit / 2"
       :optimum="scoreLimit * 0.9">
    </meter>
  </div>

  <div id="effects-area" :class="side">
    <h5 id="good-effects-text" :class="side"><b>Threat Prevention</b></h5>
    <div id="good-effects" :class="side"
        style="position: absolute; top: 5%;">
      <ul>
        <img v-for="effect in player.positiveEffects" v-bind:key="effect"  
            class="effect-icon" :src="effectImagePath(effect)"
            :title="effectTooltip(effect)">
      </ul>
    </div>

    <h5 id="bad-effects-text" :class="side"><b>Active Threats</b></h5>
    <div id="bad-effects" :class="side"
        style="position: absolute; top: 55%;">
      <ul>
        <img v-for="effect in player.negativeEffects" v-bind:key="effect"  
            class="effect-icon" :src="effectImagePath(effect)"
            :title="effectTooltip(effect)">
      </ul>
    </div>
  </div>

  <div id="info-button" v-if="side === 'left'">
    <info-popup>
      <h3 style="margin: 0">Player Info</h3>
      <p>This area shows information about a player. On the players turn their picture is highlighted green.</p>
      <p>Score shows the players current progress toward the score limit. This score will be adjusted to reflect any modifiers the player has that affect score, like the Malware card.</p>
      <p>Threat prevention shows all the safety and remedy cards that are active on the player. You can mouse over them to be reminded of what their effect is.</p>
      <p>Active Threats shows all the cyber attack cards that are active on the player. These effects can be removed or prevented by different remedy and safety cards. eg) Malware can be removed or prevented by Overclock and Anti-Virus cards.</p>
    </info-popup>
  </div>

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import tooltips from '@/data/tooltips'
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

export default {
  name: 'player-info',
  props: ['player', 'side'],
  data () {
    return {
      update: true
    }
  },
  components: {
    'info-popup': InfoPopup,
  },
  computed: {
    ...mapState([
      'scoreLimit',
      'stacks',
      'activePlayer'
    ]),
    playerImagePath () {
      // later change to imageId to get the specific image they want 
      return "/static/playerImages/robo_" + this.player.id + ".jpg"
    },
    isActive () {
      return this.player === this.activePlayer
    },
    outside () {
      return "out-" + this.side
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
    }
  },
  created () {
    bus.$on('card-played', () => {
        // Scores and effect lists must be updated when a card is played
        this.update = !this.update
    })
  }
}
</script>


<style scoped>
#info {
  position: absolute;
  width: 100%;
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
  top: 50%;
  width: 50%;
  height: 24px;
}

#score-text {
  position: absolute;
  margin: 0;
  left: 40%;
  top: 10%;
  z-index: 40;
  color: black;
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
  position: relative;
  margin-top: 1.5%;
  margin-left: 35%;
}

.left {
  left: 0%;
}

.right {
  right: 0%;
}

.out-left {
  left: 5%;
}

.out-right {
  right: 5%;
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
  border: solid black 2px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

h5 {
  margin: 0;
}
</style>

