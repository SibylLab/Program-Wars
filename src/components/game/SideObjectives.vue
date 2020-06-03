<template>
<div id="side-objectives">
  <h3 id="title-text">Bonus Objectives</h3>
  <h5 class="bonus">Group Bonus {{ bonuses.group }}</h5>
  <h5 class="bonus">Repeat Bonus {{ bonuses.repeat }}</h5>
  <h5 class="bonus">Variable Bonus {{ bonuses.variable }}</h5>
  <h5 class="bonus">Safety Bonus {{ bonuses.safety }}</h5>
  <h5 class="bonus">Defensive Programmer {{ bonuses.defensive }}</h5>
  <h5 class="bonus">Clean System {{ bonuses.clean }}</h5>
  <h5 class="bonus">Complete Program {{ bonuses.complete }}</h5>
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
}

#title-text {
  margin: 0;
  margin-top: 2px;
  margin-left: 5px;
  color: #fff;
}

.bonus {
  color: #fff
}
</style>

