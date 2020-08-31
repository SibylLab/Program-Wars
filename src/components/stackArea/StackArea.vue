<template>
<div id='stacks-area' :key="activeTab" :class="{ play: showShadow }">

  <div id="tabs" v-if="!player.isAI" :class="tabSide">
    <ul>
      <li v-on:click="changeTab(1)" :class="['tab', { active: isActiveTab(1) }]">
        Stacks </li>
      <li v-on:click="changeTab(2)" :class="['tab', { active: isActiveTab(2) }]">
        Bonus </li>
    </ul>
  </div>

  <play-field v-if="isActiveTab(1)" :player="player"/>
  <side-objectives v-if="isActiveTab(2)" :player="player"/>

</div>
</template>


<script>
import SideObjectives from '@/components/stackArea/SideObjectives'
import PlayField from '@/components/stackArea/PlayField'
import { mapGetters } from 'vuex'

/**
 * Holds the PlayField and SideObjectives components for a player and adds tabs
 * to switch between them.
 *
 * @vue-prop {Player} player - The player the playField belongs to.
 * @vue-prop {string} tabSide - A string indicating the side to put the tabs on
 * `left | right`.
 * @vue-data {int} activeTab - The number of the tab that is active, (starts at 1).
 *
 * @vue-computed {bool} showShadow - True if the player is the current player and
 * the play area should be highlighted.
 */
export default {
  name: 'stacks-area',
  props: ['player', 'tabSide'],
  data () {
    return {
      activeTab: 1
    }
  },
  components: {
    'play-field': PlayField,
    'side-objectives': SideObjectives
  },
  computed: {
    ...mapGetters(['game']),
    showShadow () {
      return this.player === this.game.currentPlayer()
    }
  },
  methods: {
    /**
     * Checks to see if the given tab number is the active tab.
     * @param {int} tabNum - The tab number to check.
     * @return {bool} True if the tabNum tab is the active tab.
     */
    isActiveTab (tabNum) {
      // so AI PlayField is always showing for AI players
      if (this.player.isAI) {
        return tabNum === 1
      }
      return this.activeTab === tabNum
    },
    /**
     * Changes the active tab to the given tabNum.
     *
     * This is added in the template above to a tab button. If there is no component
     * that has been given that tabNum then it will break and show nothing. This could
     * be improved upon if tabs were added programmatically instead of as HTML in the
     * template, but for a small number of tabs this works.
     *
     * @param {int} tabNum - The number of the tab to change to.
     */
    changeTab (tabNum) {
      // so AI doesn't end up on a tab other than PlayField
      if (!this.player.isAI) {
        this.activeTab = tabNum
      }
    }
  }
}
</script>

<style scoped>
#stacks-area {
  position: absolute;
  width: 100%;
  height: 100%;
}

#tabs {
  position: absolute;
  font-size: 0.7rem;
  top: -1.8rem;
}

.left {
  left: 1%;
}

.right {
  right: 1%;
}

.tab {
  cursor: pointer;
}

.active {
  background-color: #fff;
  color: #333333;
}

.play {
  -webkit-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  -moz-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  margin: 0.1rem;
  padding: 0.2rem;
  border: solid grey 0.2rem;
  background-color: #333333;
  color: #fff;
  z-index: 40;
}
</style>

