<template>
<div id="header">

  <h4 id="title" class="head-text">Program Wars</h4>

  <h4 id="limit" class="head-text" v-if="isGame">
    Score Limit: {{ scoreLimit }}
  </h4>

  <side-menu id="menu"></side-menu>

</div>
</template>


<script>
import SideMenu from '@/components/shared/SideMenu'
import {mapState} from 'vuex'

/**
 * A component for placing a title bar for the game on top of a page.
 *
 * Displays the game title and a button for the menu at all times. In
 * game it will also display the scoreLimit and a game tips toggle.
 */
export default {
  name: 'landing-page',
  data () {
    return {}
  },
  components: {
    'side-menu': SideMenu,
  },
  computed: {
    ...mapState([
      'scoreLimit',
      'gameState'
    ]),
    isGame () {
      return this.gameState === 'game'
    }
  }
}
</script>


<style scoped>
#header {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 40px;
  background-color: #333333;
  font-family: monospace;
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
  margin-bottom: 0;
  color: #fff;
}

#menu {
  position: absolute;
  top: 2px;
  right: 1%;
}
</style>
