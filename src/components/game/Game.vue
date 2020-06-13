<template>
<div id="page">
  <winner-modal id="winner-modal" class="modal fade"
      tabindex="-1" role="dialog"
      data-backdrop='static' data-keyboard='false'>
  </winner-modal>

  <page-header></page-header>

  <div id="game">
    <two-player-game></two-player-game>
  </div>
  
</div>
</template>


<script>
import WinnerModal from '@/components/modals/WinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import TwoPlayerGame from '@/components/game/TwoPlayerGame'
import {bus} from '@/components/shared/Bus'
import {mapState, mapActions} from 'vuex'

/**
 * The main page for the game.
 * Organizes the different area components to display the game properly.
 */
export default {
  name: 'game-page',
  components: {
    'winner-modal': WinnerModal,
    'page-header': PageHeader,
    'two-player-game': TwoPlayerGame
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

#game {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 94%;
}
</style>
