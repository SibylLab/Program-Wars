<template>
<div id="home-page">
  <page-header/>

  <div id="game-setup" class="centered">
    <h3 id="title">Welcome to Program Wars!</h3>

    <game-mode/>
    <select-level/>
    <add-players/>

    <div id="message" class="centered"> {{ state.message }} </div>
    <button id="go" class="centered btn btn-success" v-on:click="playGame()">
      Play
    </button>
  </div>

</div>
</template>


<script>
import Home from '@/pages/pageStates/Home'
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
    ...mapGetters(['state'])
  },
  methods: {
    ...mapActions([
      'startBeginnerGame',
      'startRequirements',
      'startStandardGame'
    ]),
    playGame () {
      if (!this.state.canStart()) { return }

      if (this.state.mode === 'agile') {
        this.startRequirements({players: this.state.players})
      } else if (this.state.mode === 'beginner') {
        this.startBeginnerGame({players: this.state.createPlayers()})
      } else {
        this.startStandardGame({players: this.state.createPlayers()})
      }
    }
  },
  beforeCreate () {
    this.$store.commit('changePageState', { pageState: new Home() })
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
  top: 50px;
  width: 650px;
  height: 600px;
  background-color: white;
  border-radius: 30px;
}

#title {
  margin-top: 20px;
}

#message {
  position: absolute;
  bottom: 80px;
  color: red;
}

#go {
  position: absolute;
  bottom: 20px;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>

