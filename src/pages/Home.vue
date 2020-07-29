<template>
<div id="home-page">
  <page-header/>

  <div id="game-setup" class="centered">
    <h3 id="title">Welcome to Program Wars!</h3>

    <game-mode/>
    <add-players/>

    <div id="message" class="centered"> {{ pageState.message }} </div>
    <button id="go" class="centered btn btn-success" v-on:click="playGame()">
      Play
    </button>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import GameMode from '@/components/setup/GameMode'
import AddPlayers from '@/components/setup/AddPlayers'
import { mapActions } from 'vuex'

/**
 * The main landing page for the game.
 * Uses a gameSetup component to get user info and start a new game.
 */
export default {
  name: 'home-page',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader,
    'game-mode': GameMode,
    'add-players': AddPlayers
  },
  methods: {
    ...mapActions([
      'startBeginnerGame',
      'startRequirements',
      'startStandardGame'
    ]),
    playGame () {
      if (!this.pageState.canStart()) { return }

      if (this.pageState.mode === 'agile') {
        this.startRequirements({players: this.pageState.players})
      } else if (this.pageState.mode === 'beginner') {
        this.startBeginnerGame({players: this.pageState.createPlayers()})
      } else {
        this.startStandardGame({players: this.pageState.createPlayers()})
      }
    }
  }
}
</script>


<style scoped>
#home-page {
  position: absolute;
  width: 100%;
  height: 100%;
  min-width: 700px;
  min-height: 650px;
  background-image: linear-gradient(to bottom right, purple, darkblue);
  font-family: monospace;
  font-size: 15px;
}

#game-setup {
  position: absolute;
  top: 80px;
  width: 650px;
  height: 530px;
  background-color: white;
  border-radius: 30px;
}

#title {
  margin-top: 20px;
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

