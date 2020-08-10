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
 * Displays available side objectives and a players progress by higlighting
 * objectives that have been achieved.
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
    /**
     * Returns a list of all the condition data.
     * Each item text for in the if statement, text for in the body,
     * and a value to use to check if an item has any bonus points.
     */
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
    setBonuses () {
      this.bonuses = this.game.getPlayerBonuses(this.player)
    }
  },
  created () {
    this.setBonuses()
    bus.$on('end-turn', this.setBonuses)
  },
  beforeDestroy () {
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
  list-style: none;
  padding: 10px 0 0 10px;
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

