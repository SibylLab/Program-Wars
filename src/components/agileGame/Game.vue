<template>
<div id="page">
  <winner-modal id="winner-modal" class="modal fade"
      tabindex="-1" role="dialog"
      data-backdrop='static' data-keyboard='false'>
  </winner-modal>

  <page-header></page-header>

  <div id="game">
    <four-player-game v-if="numPlayers(4)"></four-player-game>
    <two-player-game v-else></two-player-game>
  </div>

  <effect-notifications></effect-notifications>
  
</div>
</template>


<script>
import EffectNotifications from '@/components/game/EffectNotifications'
import WinnerModal from '@/components/modals/WinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import TwoPlayerGame from '@/components/game/TwoPlayerGame'
import FourPlayerGame from '@/components/game/FourPlayerGame'
import {bus} from '@/components/shared/Bus'
import {mapState, mapActions} from 'vuex'

/**
 * The main game page for the game.
 * Decides which layout to show based on the game type.
 */
export default {
  name: 'game-page',
  components: {
    'winner-modal': WinnerModal,
    'page-header': PageHeader,
    'two-player-game': TwoPlayerGame,
    'four-player-game': FourPlayerGame,
    'effect-notifications': EffectNotifications
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
    numPlayers (n) {
      return this.players.length === n
    }
  },
  mounted () {
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

#game {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 94%;
}
</style>
