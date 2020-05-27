<template>
  <!--
    Landing page starts with the backstory modal
    Then transitions to a setup component to allow you to get the game going
      once all options are in place this will start a game
    Also, should have a menu Icon for accessing the other menu stuff

    Can use a shared status bar component for the top of the screen and
      access to the menus. This component can take care of all the menu stuff
      and anything else we want to show up there. The side menu should be
      its own component that can have a v-if for wether we show it or not.
    Can also use a settings component for the setup. That component may be
      able to hold all of the stuff it need or be broken up into smaller components.
  -->
<div>
  <page-header></page-header>

  <div id="page">
    <button v-on:click="game">Game Page</button>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import {mapActions} from 'vuex'

export default {
  name: 'landing-page',
  components: {
    'page-header': PageHeader
  },
  methods: {
    ...mapActions([
      'newGame'
    ]),
    game () {
      this.newGame({players: [{name: 'Steven', ai: false}, {name: 'n00b_bot mk1.', ai: true}]})
    }
  }
}
</script>

<style scoped>
#page {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 100%;
  background-image: url('/static/backgroundImg/helloWorld.png');
}
</style>
