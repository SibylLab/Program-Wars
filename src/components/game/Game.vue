<template>
<div id="page">

  <page-header></page-header>

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
      <play-field :player="getPlayer(0)"></play-field>
    </div>

    <div id="right-field">
      <play-field :player="getPlayer(1)"></play-field>
    </div>
  </div>
  
</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import PlayerInfo from '@/components/game/PlayerInfo'
import TurnArea from '@/components/game/TurnArea'
import PlayField from '@/components/game/PlayField'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'game-page',
  components: {
    'page-header': PageHeader,
    'turn-area': TurnArea,
    'player-info': PlayerInfo,
    'play-field': PlayField
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
  }
}
</script>

<style scoped>
#page {
  position: absolute;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  min-height: 750px;
  background-color: #e8e8e8;
}

#play {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 45%;
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
  top: 50%;
  width: 100%;
  height: 50%;
}

#right-field {
  position: absolute;
  top: 0;
  right: 1%;
  width: 48%;
  height: 98%;
}

#left-field {
  position: absolute;
  top: 0;
  left: 1%;
  width: 49%;
  height: 98%;
}
</style>
