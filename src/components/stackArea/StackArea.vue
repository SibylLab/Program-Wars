<template>
<div id='stacks-area' :key="activeTab" :class="{ play: showShadow }">

  <div id="tabs" v-if="!pageState.currentPlayer().isAI" :class="tabSide">
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

/**
 * The area of the screen that holds a players play field and side objectives
 * in tabs.
 * Is higlighted when the components player is the active player.
 * side property is to change some of the setup based on what side of the screen
 * the component is on.
 */
export default {
  name: 'stacks-area',
  props: ['player', 'tabSide'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      activeTab: 1
    }
  },
  components: {
    'play-field': PlayField,
    'side-objectives': SideObjectives
  },
  computed: {
    showShadow () {
      return this.player === this.pageState.currentPlayer()
    }
  },
  methods: {
    isActiveTab (tabNum) {
      return this.activeTab === tabNum
    },
    changeTab (tabNum) {
      this.activeTab = tabNum
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
  top: -35px;
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
  -webkit-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  box-shadow: 0 0 24px 10px rgba(0,255,0,1);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  margin: 5px 1px;
  padding: 2px 5px;
  border: solid grey 2px;
  background-color: #333333;
  color: #fff;
  z-index: 40;
}
</style>

