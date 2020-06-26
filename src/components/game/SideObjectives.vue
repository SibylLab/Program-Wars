<template>
<div id="side-objectives" :key="bonuses.total">
  <h3 id="title-text">bonus_points = {{ bonuses.total }}</h3>

  <!-- The small divisions give simple syntax higlighting to objective text -->
  <ul style="color: #fff">
    <li v-for="cond in conditions" v-bind:key="cond.if">
      <div class="keyword">if</div>
      ( <div class="cond"> {{ cond.if }}</div> ) { 
      <div :class="['reward', {have: cond.val > 0}]">{{ cond.reward }}</div>
      }
    </li>
  </ul>

  <div id="info-button">
    <info-popup>
      <h3 style="margin: 0">Side Objectives</h3>
      <p>This area tracks a player's progress toward side objectives that will award
         bonus points at the end of the game. The bonus points do not contribute to
         the players progress toward the score limit.</p>
      <p>Each objective is written in the form of an <b>if</b> statement. The text
         inside the round brackets represents the condition that must be met for the
         objective. The portion in the curly brackets is the reward if the condition
         is met. When a condition is met the reward will appear green and the total
         at the top of the window will be increased</p>
      <p>Some objectives are applied for each card of that type that is played. Other
         objectives track the state of the player and update when a player gains or
         loses an effect.</p>
    </info-popup>
  </div>

</div>
</template>


<script>
import InfoPopup from '@/components/shared/InfoPopup'
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

/**
 * Displays available side objectives and a players progress by higlighting
 * objectives that have been achieved.
 */
export default {
  name: 'side-objectives',
  props: ['player'],
  data () {
    return {
      bonuses: undefined
    }
  },
  components: {
   'info-popup': InfoPopup
  },
  computed: {
    ...mapState([
      'stacks',
      'hands'
    ]),
    /**
     * Returns a list of all the condition data.
     * Each item text for in the if statement, text for in the body,
     * and a value to use to check if an item has any bonus points.
     */
    conditions () {
      let conds = []
      conds.push({if: "group_card_played", reward: "+5 pts/card",
                  val: this.bonuses.group})
      conds.push({if: "repeat_card_played", reward: "+3 pts/card",
                  val: this.bonuses.repeat})
      conds.push({if: "variable_card_played", reward: "+2 pts/card",
                  val: this.bonuses.variable})
      conds.push({if: "safety_card_played",  reward: "+3 pts/card",
                  val: this.bonuses.safety})
      conds.push({if: "defensive_bonus", reward: "Antivirus +10 || Firewall +5",
                  val: this.bonuses.defensive})
      conds.push({if: "no_malware", reward: "+10 pts",
                  val: this.bonuses.clean})
      conds.push({if: "nested_loops", reward: "+5 pts/per nested loop",
                  val: this.bonuses.complete})
      return conds
    }
  },
  methods: {
    /**
     * Get an object with all the player's bonus scores.
     */
    getBonuses () {
      let stacks = this.stacks.filter(s => s.playerId === this.player.id)
      let hand = this.hands.find(h => h.playerId === this.player.id)
      return this.player.objectives.getBonuses(hand, stacks)
    }
  },
  created () {
    this.bonuses = this.getBonuses()

    bus.$on('end-turn', () => {
      this.bonuses = this.getBonuses()
    })
  }
}
</script>


<style scoped>
#side-objectives {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge #a0a0a0 8px;
  border-radius: 6px;
  overflow: auto;
  text-align: left;
  font-family: monospace;
}

#title-text {
  margin: 0;
  margin-top: 2px;
  margin-left: 5px;
  color: #fff;
}

#info-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

ul {
  font-size: 18px;
}

li {
  margin: 0;
}

.cond {
  display: inline;
  color: #3385ff;
}

.reward {
  display: inline;
  color: red;
}

.have {
  color: lightgreen;
  text-shadow: 0px 2px 6px green;
}

.keyword {
  display: inline;
  color: #ff00ff;
}

.val {
 color: #ff8533;
 display: inline;
}
</style>

