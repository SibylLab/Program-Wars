<template>
<div id="page">
  <winner-modal id="winner-modal" class="modal fade"
      tabindex="-1" role="dialog"
      data-backdrop='static' data-keyboard='false'>
  </winner-modal>

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
      <play-area :player="getPlayer(0)" side="left"></play-area>
    </div>

    <div id="right-field">
      <play-area :player="getPlayer(1)" side="right"></play-area>
    </div>
  </div>
  
</div>
</template>


<script>
import WinnerModal from '@/components/modals/WinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import PlayerInfo from '@/components/game/PlayerInfo'
import TurnArea from '@/components/game/TurnArea'
import PlayArea from '@/components/game/PlayArea'
import {bus} from '@/components/shared/Bus'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'game-page',
  components: {
    'winner-modal': WinnerModal,
    'page-header': PageHeader,
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
#page {
  position: absolute;
  width: 100%;
  min-width: 1350px;
  height: 100%;
  min-height: 760px;
  background-color: white;
  font-family: monospace;
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
