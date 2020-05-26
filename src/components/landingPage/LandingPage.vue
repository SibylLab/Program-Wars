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
  <h1>Landing Page</h1>
  <button v-on:click="game">Game Page</button>
  </div>

</template>


<script>
export default {
  name: 'landing-page',
  methods: {
    game () {
      this.$router.push('game')
    }
  }
}
</script>

