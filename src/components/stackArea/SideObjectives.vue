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
    <side-objectives-info/>
  </div>

</div>
</template>


<script>
import SideObjectivesInfo from '@/components/info/SideObjectivesInfo'
import {bus} from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

/**
 * Displays the `standard` mode bonus objectives.
 *
 * Indicates the total bonus score for the player. Shows each bonus in a
 * C style pseudo code `if` statement. The condition body changes from `red` to
 * `green` in color when a condition is met, and back again if it is lost.
 *
 * @vue-prop {Player} player - The player the playField belongs to.
 * @vue-data {Object} bonuses - Object holding player bonus scores for each category.
 * 
 * @vue-computed {Object[]} conditions - A list of objects that contain info for
 * a conditional statement. `{if: condition text, reward: body text, val: points given}`.
 */
export default {
  name: 'side-objectives',
  props: ['player'],
  data () {
    return {
      bonuses: null
    }
  },
  components: {
   'side-objectives-info': SideObjectivesInfo
  },
  computed: {
    ...mapGetters(['game']),
    conditions () {
      let conds = []
      conds.push({if: "repeat_card_played", reward: "+3 pts/card",
                  val: this.bonuses.repeat})
      conds.push({if: "variable_card_played", reward: "+2 pts/card",
                  val: this.bonuses.variable})
      conds.push({if: "safety_card_played",  reward: "+3 pts/card",
                  val: this.bonuses.safety})
      conds.push({if: "nested_loop_made", reward: "+5 pts/stack",
                  val: this.bonuses.nested})
      conds.push({if: "antivirus || firewall", reward: "+10 pts",
                  val: this.bonuses.defensive})
      conds.push({if: "no_malware && no_hacks", reward: "+10 pts",
                  val: this.bonuses.clean})
      conds.push({if: "complete_method", reward: "+10 pts",
                  val: this.bonuses.method})
      return conds
    }
  },
  methods: {
    /**
     * Sets `bonuses` with the bonuses for the player.
     */
    setBonuses () {
      this.bonuses = this.game.getPlayerBonuses(this.player)
    }
  },
  created () {
    // Set bonuses and add listener to update bonuses on 'end-turn' events
    this.setBonuses()
    bus.$on('end-turn', this.setBonuses)
  },
  beforeDestroy () {
    // Remove listener for 'end-turn' events when destroyed
    bus.$off('end-turn', this.setBonuses)
  }
}
</script>


<style scoped>
#side-objectives {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge #a0a0a0 0.5rem;
  border-radius: 0.5rem;
  overflow: auto;
  text-align: left;
  font-family: monospace;
}

#title-text {
  margin: 0;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
  color: #fff;
}

#info-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

ul {
  list-style: none;
  font-size: 1.3rem;
  padding: 0.5rem;
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
  text-shadow: 0 0.1rem 0.2rem green;
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

