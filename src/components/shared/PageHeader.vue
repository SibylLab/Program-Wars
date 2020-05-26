<template>
<div>
  <div id="header">

    <h4 id="title" class="head-text">Program Wars</h4>

    <h4 id="limit" class="head-text" v-if="isGame">
      Score Limit: {{ scoreLimit }}
    </h4>

    <label id="tips-check" v-if="isGame">
      <input type="checkbox" value="true" v-on:click="toggleTips" checked>Game Tips
    </label>

    <timer id="timer" v-if="isGame"></timer>

    <side-menu id="menu"></side-menu>

  </div>
</div>
</template>


<script>
import SideMenu from '@/components/shared/SideMenu'
import Timer from '@/components/shared/Timer'
import {mapState, mapMutations} from 'vuex'

export default {
  name: 'landing-page',
  data () {
    return {}
  },
  components: {
    'side-menu': SideMenu,
    'timer': Timer
  },
  computed: {
    ...mapState([
      'scoreLimit',
      'gameState',
    ]),
    isGame () {
      return this.gameState === 'game'
    }
  },
  methods: {
    ...mapMutations([
      'toggleTips'
    ])
  }
}
</script>


<style scoped>
#header {
  width: 100%;
  height: 40px;
  background-color: white;
  position: relative;
}

#title {
  position: absolute;
  top: 10px;
  left: 1%;
}

#limit {
  position: relative;
  top: 10px;
  text-align: 'center';
}

.head-text {
  margin-top: 0;
  margin-botrom: 0;
}

#tips-check {
  position: absolute;
  top: 10px;
  right: 140px;
}

#timer {
  width: 70px;
  position: absolute;
  top: 5px;
  right: 60px;
}

#menu {
  position: absolute;
  top: 2px;
  right: 1%;
}
</style>
