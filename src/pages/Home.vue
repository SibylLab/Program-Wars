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
 * The main landing page component for Program Wars where players set up and start games.
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
    /**
     * Starts a new game using the information from the home page state.
     *
     * This is where new game modes will need to be added with their
     * appropriate actions for routing to their specific game page with
     * the appropriate game state.
     */
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
  top: 10%;
  width: 55%;
  min-width: 52rem;
  height: 67%;
  min-height: 30rem;
  background-color: white;
  border-radius: 2rem;
}

#message {
  position: absolute;
  bottom: 13%;
  color: red;
}

#go {
  position: absolute;
  bottom: 2%;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>

