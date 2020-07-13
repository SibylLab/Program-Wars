<template>
<div id='play-area' :key="activeTab" :class="{ shadow: showShadow }">

  <div id="tabs" v-if="!player.isAi" :class="[side]">
    <ul>
      <li v-on:click="changeTab(1)" :class="['tab', { active: isActiveTab(1) }]">Stacks</li>
      <li v-on:click="changeTab(2)" :class="['tab', { active: isActiveTab(2) }]">Bonus</li>
    </ul>
  </div>

  <play-field v-if="isActiveTab(1)" :player="player"></play-field>
  <side-objectives v-if="isActiveTab(2)" :player="player"></side-objectives>

</div>
</template>


<script>
import SideObjectives from '@/components/game/SideObjectives'
import PlayField from '@/components/game/PlayField'
import {mapState} from 'vuex'

/**
 * The area of the screen that holds a players play field and side objectives
 * in tabs.
 * Is higlighted when the components player is the active player.
 * side property is to change some of the setup based on what side of the screen
 * the component is on.
 */
export default {
  name: 'play-area',
  props: ['player', 'side'],
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
    ...mapState([
      'activePlayer'
    ]),
    showShadow () {
      return this.player === this.activePlayer
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
#play-area {
  position: absolute;
  width: 100%;
  height: 100%;
}

#tabs {
  position: absolute;
  top: -35px;
}

.right {
  left: 1%;
}

.left {
  right: 1%;
}

.tab {
  cursor: pointer;
}

.active {
  background-color: #fff;
  color: #333333;
}

.shadow {
  -webkit-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,230,0,1);
  box-shadow: 0 0 24px 10px rgba(0,230,0,1);
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
