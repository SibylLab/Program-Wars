<template>
<div id="page">
  <agile-winner-modal id="agile-winner-modal" class="modal fade"
      tabindex="-1" role="dialog"
      data-backdrop='static' data-keyboard='false'>
  </agile-winner-modal>
 
  <page-header></page-header>

  <div id="game">
    <four-player-game v-if="numPlayers(4)">
      <template v-slot:top-left-player="propsTL">
        <agile-player-info :player="propsTL.player" :side="propsTL.side"/>
      </template>
      <template v-slot:bottom-left-player="propsBL">
        <agile-player-info :player="propsBL.player" :side="propsBL.side"/>
      </template>
      <template v-slot:top-right-player="propsTR">
        <agile-player-info :player="propsTR.player" :side="propsTR.side"/>
      </template>
      <template v-slot:bottom-right-player="propsBR">
        <agile-player-info :player="propsBR.player" :side="propsBR.side"/>
      </template>

      <template v-slot:play-area="propsPA">
        <agile-play-area :player="propsPA.player" :side="propsPA.side"/>
      </template>
    </four-player-game>

    <two-player-game v-else>
      <template v-slot:left-player="propsLP">
        <agile-player-info :player="propsLP.player" :side="propsLP.side"/>
      </template>
      <template v-slot:right-player="propsRP">
        <agile-player-info :player="propsRP.player" :side="propsRP.side"/>
      </template>

      <template v-slot:left-play-area="propsPAL">
        <agile-play-area :player="propsPAL.player" :side="propsPAL.side"/>
      </template>
      <template v-slot:right-play-area="propsPAR">
        <agile-play-area :player="propsPAR.player" :side="propsPAR.side"/>
      </template>
    </two-player-game>
  </div>

  <effect-notifications></effect-notifications>
  
</div>
</template>


<script>
import EffectNotifications from '@/components/game/EffectNotifications'
import AgileWinnerModal from '@/components/modals/AgileWinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import TwoPlayerGame from '@/components/game/TwoPlayerGame'
import FourPlayerGame from '@/components/game/FourPlayerGame'
import AgilePlayerInfo from '@/components/agile/AgilePlayerInfo'
import AgilePlayArea from '@/components/agile/AgilePlayArea'
import {bus} from '@/components/shared/Bus'
import {mapState, mapActions} from 'vuex'

/**
 * The main game page for the game.
 * Decides which layout to show based on the game type.
 */
export default {
  name: 'game-page',
  components: {
    'agile-winner-modal': AgileWinnerModal,
    'page-header': PageHeader,
    'two-player-game': TwoPlayerGame,
    'four-player-game': FourPlayerGame,
    'effect-notifications': EffectNotifications,
    'agile-player-info': AgilePlayerInfo,
    'agile-play-area': AgilePlayArea
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
      $('#agile-winner-modal').modal('show')
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

