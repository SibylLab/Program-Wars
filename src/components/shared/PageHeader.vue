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
 * ### Slots
 * - `pageHeading`
 *    + **default:** `empty`
 *    + **purpose:** Allow page specific information to be added to the top
 *                   of the page over the center of the page header. A way to
 *                   add a title for the page, or the score limit for the game.
 *
 * @example
 * <page-header>
 *   <template v-slot:pageHeading> Welcome to Program Wars! </template>
 * </page-header>
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
  top: 0;
  width: 100%;
  height: 5%;
  color: white;
  background-color: #333333;
}

#title {
  position: absolute;
  left: 1%;
  bottom: 0;
  margin: 0;
}

#heading {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
}

#menu {
  position: absolute;
  right: 0.5%;
  margin: 0;
  width: 3%;
  height: 100%;
}
</style>
