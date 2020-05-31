<template>
<div id="info" :key="update">
  <h3 id="name" :class="{ left: isLeft, right: !isLeft }">
    {{ player.name }}
  </h3>

  <img id="avatar" :class="{ left: isLeft, right: !isLeft, active: isActive }"
      :src="playerImagePath">

  <meter id="score-meter" :class="{ left: isLeft, right: !isLeft }"
     :max="scoreLimit" min=0
     :value="getPlayerScore()"
     :high="scoreLimit * 0.7"
     :low="scoreLimit / 2"
     :optimum="scoreLimit * 0.9">
  </meter>

  <div id="good-effects" :class="{ left: isLeft, right: !isLeft }"
      style="position: absolute; top: 65%;">
    <ul>
      <img v-for="effect in player.positiveEffects" v-bind:key="effect"  
          class="effect-icon" :src="effectImagePath(effect)">
    </ul>
  </div>

  <div id="bad-effects" :class="{ left: isLeft, right: !isLeft }"
      style="position: absolute; top: 80%;">
    <ul>
      <img v-for="effect in player.negativeEffects" v-bind:key="effect"  
          class="effect-icon" :src="effectImagePath(effect)">
    </ul>
  </div>
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

export default {
  name: 'player-info',
  props: ['player', 'isLeft'],
  data () {
    return {
      update: true
    }
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
    }
  },
  methods: {
    effectImagePath (effect) {
      return "/static/cardImages/effects/" + effect + ".png"
    },
    /**
     * Get the players total score from their stacks.
     * Apply any special effects and round down to the nearest integer.
     */
    getPlayerScore () {
      // Tried making this a getter so it could be reused, but this method
      // did not always allow visual updates when a special card was played.
      let stacks = this.stacks.filter(s => s.playerId === this.player.id)
      let total = stacks.reduce((acc, stack) => {
        let score = stack.getScore()
        let helped = this.player.positiveEffects.has("OVERCLOCK")
        let hurt = this.player.negativeEffects.has("VIRUS")

        if (helped && !hurt) {
          score *= 1.25
        } else if (!helped && hurt) {
          score *= 0.75
        }
        return acc + score
      }, 0)

      return Math.floor(total)
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
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
}

#name {
  position: absolute;
  top: 2%;
  margin-top: 0;
  margin-bottom: 0;
}

#avatar {
  position: absolute;
  top: 15%;
  width: 45%;
  height: 35%;
  border: solid black 3px;
  border-radius: 5px;
}

#score-meter {
  position: absolute;
  top: 55%;
  width: 50%;
  height: 15px;
}

.left {
  left: 5%;
}

.right {
  right: 5%;
}

.active {
  -webkit-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 4px rgba(0,230,0,1);
  box-shadow: 0 0 24px 4px rgba(0,0,255,1);
}

.effect-icon {
  width: 30px;
  height: 30px;
  margin: 5px 5px; 
  border: solid black 2px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: inline-block;
  margin: 5px 5px;
  width: 30px;
  height: 30px;
}
</style>

