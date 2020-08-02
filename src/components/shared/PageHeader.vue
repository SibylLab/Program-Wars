<template>
<div id="header">

  <h4 id="title"> Program Wars </h4>

  <h3 id="heading">
    <slot name="pageHeading"></slot>
  </h3>

  <side-menu id="menu"/>

</div>
</template>


<script>
import SideMenu from '@/components/shared/SideMenu'
import { mapGetters } from 'vuex'

/**
 * A component for placing a title bar for the game on top of a page.
 *
 * Displays the game title and a button for the menu at all times. In
 * game it will also display the scoreLimit and a game tips toggle.
 */
export default {
  name: 'page-header',
  components: {
    'side-menu': SideMenu,
  },
  computed: {
    ...mapGetters(['game', 'inGame']),
  }
}
</script>


<style scoped>
#header {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 40px;
  color: white;
  background-color: #333333;
}

#title {
  position: absolute;
  top: 10px;
  left: 1%;
}

#heading {
  position: relative;
  top: 10px;
  text-align: 'center';
  color: white;
}

#menu {
  position: absolute;
  top: 2px;
  right: 1%;
}
</style>
