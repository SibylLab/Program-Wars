<template>
<div id="home-page">
  <page-header/>

  <div id="game-setup" class="centered">
    <h3>Welcome to Program Wars!</h3>

    <game-mode/>
    <add-players/>

    <div id="message" class="centered"> {{ pageState.message }} </div>
    <button id="go" class="centered btn btn-success" :disabled="!pageState.canStart()"
      v-on:click="playGame()"> Play </button>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameMode from '@/components/home/GameMode'
import AddPlayers from '@/components/home/AddPlayers'
import { mapActions } from 'vuex'

/**
 * The main landing page for the game.
 * Uses a gameSetup component to get user info and start a new game.
 */
export default {
  name: 'home-page',
  data () {
    return {
      pageState: undefined
    }
  },
  components: {
    'page-header': PageHeader,
    'game-mode': GameMode,
    'add-players': AddPlayers
  },
  methods: {
    ...mapActions([
      'setupHomePage',
      'startGame'
    ]),
    playGame () {
      this.startGame({mode: this.pageState.mode, players: this.pageState.players})
    }
  },
  created () {
    this.setupHomePage()
    this.pageState = this.$store.state.pageState
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
  font-size: 15px;
}

#game-setup {
  position: fixed;
  top: 80px;
  width: 650px;
  height: 575px;
  background-color: white;
  border-radius: 30px;
}

#message {
  position: absolute;
  bottom: 100px;
  color: red;
}

#go {
  position: absolute;
  bottom: 40px;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>

