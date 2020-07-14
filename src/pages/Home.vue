<template>
<div id="home-page">
  <page-header/>

  <div id="game-setup">
    <h3>Welcome to Program Wars!</h3>

    <game-mode/>



  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameMode from '@/components/home/GameMode'
import { mapActions } from 'vuex'

/**
 * The main landing page for the game.
 * Uses a gameSetup component to get user info and start a new game.
 */
export default {
  name: 'home-page',
  components: {
    'page-header': PageHeader,
    'game-mode': GameMode
  },
  methods: {
    ...mapActions([
      'setupHomePage'
    ])
  },
  created () {
    this.setupHomePage()
  }
}
</script>


<style scoped>
#home-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('/static/backgroundImg/helloWorld.png');
  font-family: monospace;
}

#game-setup {
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 650px;
  height: 600px;
  background-color: white;
  border-radius: 30px;
}
</style>

