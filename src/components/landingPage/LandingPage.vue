<template>
<div>
  <page-header></page-header>

  <div id="page">
    <div id="game-setup">
      <game-setup></game-setup>
    </div>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameSetup from '@/components/landingPage/GameSetup'
import {mapMutations} from 'vuex'

/**
 * The main landing page for the game.
 * Uses a gameSetup component to get user info and start a new game.
 */
export default {
  name: 'landing-page',
  components: {
    'page-header': PageHeader,
    'game-setup': GameSetup
  },
  methods: {
    ...mapMutations([
      'changeGameState'
    ]),
  },
  created () {
    this.changeGameState({newState: 'home'})
  }
}
</script>


<style scoped>
#page {
  position: absolute;
  top: 40px;
  width: 100%;
  min-width: 500px;
  height: 94.5%;
  min-height: 500px;
  background-image: linear-gradient(to bottom right, purple, darkblue);
  font-family: monospace;
}

#game-setup {
  position: absolute;
  top: 2%;
  left: 30%;
  width: 40%;
  min-width: 480px;
  height: 60%;
  min-height: 570px;
}

@media all and (max-width: 600px) {
  #game-setup{
    left: 10%;
  }
}
</style>
