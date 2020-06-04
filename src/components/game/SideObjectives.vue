<template>
<div id="side-objectives">
  <h3 id="title-text">Bonus Points = {{ bonuses.total }}</h3>

  <ul style="color: #fff">
    <li v-for="cond in conditions" v-bind:key="cond.if">
      <div class="keyword">if</div>
      ( <div class="cond"> {{ cond.if }}</div> ) { 
      <div :class="['reward', {have: cond.val > 0}]">{{ cond.reward }}</div>
      }
    </li>
  </ul>

</div>
</template>


<script>
import {mapState} from 'vuex'

export default {
  name: 'side-objectives',
  props: ['player'],
  data () {
    return {
      bonuses: undefined
    }
  },
  computed: {
    ...mapState([
      'stacks'
    ]),
    /**
     * Get an object with all the player's bonus scores.
     */
    getBonuses () {
      let stacks = this.stacks.filter(s => s.playerId === this.player.id)
      return this.player.objectives.getBonuses(stacks)
    },
    /**
     * Returns a list of all the condition data.
     * Each item text for in the if statement, text for in the body,
     * and a value to use to check if an item has any bonus points.
     */
    conditions () {
      let conds = []
      conds.push({if: "group_card_played", reward: "+5 pts/card",
                  val: this.bonuses.group})
      conds.push({if: "repeat_card_played", reward: "+5 pts/card",
                  val: this.bonuses.repeat})
      conds.push({if: "variable_card_played", vareward: "+5 pts/card",
                  val: this.bonuses.variable})
      conds.push({if: "safety_card_played",  reward: "+5 pts/card",
                  val: this.bonuses.safety})
      conds.push({if: "all_safeties", reward: "+10 pts",
                  val: this.bonuses.defensive})
      conds.push({if: "no_malware", reward: "+10 pts",
                  val: this.bonuses.clean})
      conds.push({if: "complete_program", reward: "+10 pts",
                  val: this.bonuses.complete})
      return conds
    }
  },
  created () {
    this.bonuses = this.getBonuses
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

