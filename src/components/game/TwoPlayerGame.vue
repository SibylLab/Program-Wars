<template>
<div id="two-player-game">

  <div id="play">
    <div id="left-player">
      <player-info :player="getPlayer(0)" side="left"></player-info>
    </div>

    <div id="turn">
      <turn-area></turn-area>
    </div>

    <div id="right-player">
      <player-info :player="getPlayer(1)" side="right"></player-info>
    </div>
  </div>

  <div id="stacks">
    <div id="left-field">
      <play-area :player="getPlayer(0)" side="left"></play-area>
    </div>

    <div id="right-field">
      <play-area :player="getPlayer(1)" side="right"></play-area>
    </div>
  </div>
  
</div>
</template>


<script>
import PlayerInfo from '@/components/game/PlayerInfo'
import TurnArea from '@/components/game/TurnArea'
import PlayArea from '@/components/game/PlayArea'
import {bus} from '@/components/shared/Bus'
import {mapState, mapActions} from 'vuex'

/**
 * The main page for the game.
 * Organizes the different area components to display the game properly.
 */
export default {
  name: 'game-page',
  components: {
    'turn-area': TurnArea,
    'player-info': PlayerInfo,
    'play-area': PlayArea
  },
  computed: {
    ...mapState([
      'gameState',
      'players'
    ])
  },
  methods: {
    ...mapActions([
      'leaveGame'
    ]),
    getPlayer (id) {
      return this.players.find(p => p.id === id)
    }
  },
  created () {
    // If gameState is not game when we create this element (page refresh)
    // Then we want to leave the game and return to home page.
    if (this.gameState !== 'game') {
      this.leaveGame()
    }

    bus.$on('game-over', () => {
      $('#winner-modal').modal('show')
    })
  }
}
</script>


<style scoped>
#two-player-game {
  position: absolute;
  width: 100%;
  height: 100%;
}

#play {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 47%;
}

#left-player {
  position: absolute;
  left: 0px;
  width: 25%;
  height: 100%;
}

#turn {
  position: absolute;
  left: 25%;
  width: 50%;
  height: 100%;
}

#right-player {
  position: absolute;
  right: 0px;
  width: 25%;
  height: 100%;
}

#stacks {
  position: absolute;
  top: 47%;
  width: 100%;
  height: 53%;
}

#right-field {
  position: absolute;
  top: 0;
  right: 0.5%;
  width: 49%;
  height: 98%;
}

#left-field {
  position: absolute;
  top: 0;
  left: 0.5%;
  width: 49%;
  height: 98%;
}
</style>

