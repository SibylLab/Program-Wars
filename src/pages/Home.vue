<template>
<div id="home-page">
  <page-header>
    <template v-slot:pageHeading> Welcome to Program Wars! </template>
  </page-header>

  <div id="game-setup" class="centered">
    <game-mode/>
    <select-level/>
    <add-players/>

    <div id="message" class="centered"> {{ home.message }} </div>
    <button id="go" class="centered btn btn-success" v-on:click="playGame()"
        :disabled="!home.hasEnoughPlayers()">
      Play
    </button>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameMode from '@/components/setup/GameMode'
import SelectLevel from '@/components/setup/SelectLevel'
import AddPlayers from '@/components/setup/AddPlayers'
import { mapActions, mapGetters } from 'vuex'

/**
 * The main landing page for the game.
 * Uses a gameSetup component to get user info and start a new game.
 */
export default {
  name: 'home-page',
  components: {
    'page-header': PageHeader,
    'game-mode': GameMode,
    'select-level': SelectLevel,
    'add-players': AddPlayers
  },
  computed: {
    ...mapGetters(['home'])
  },
  methods: {
    ...mapActions([
      'startBeginnerGame',
      'startStandardGame'
    ]),
    playGame () {
      if (this.home.canStart()) {
        if (this.home.mode === 'beginner') {
          this.startBeginnerGame({
            players: this.home.createPlayers(), level: this.home.level })
        } else {
          this.startStandardGame({
            players: this.home.createPlayers(), level: this.home.level })
        }
      }
    }
  }
}
</script>


<style scoped>
#home-page {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to bottom right, purple, darkblue);
}

#game-setup {
  position: absolute;
  top: 10vh;
  width: 55vw;
  min-width: 52rem;
  height: 72vh;
  min-height: 33rem;
  background-color: white;
  border-radius: 2rem;
}

#message {
  position: absolute;
  bottom: 9vh;
  color: red;
}

#go {
  position: absolute;
  bottom: 2vh;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>

