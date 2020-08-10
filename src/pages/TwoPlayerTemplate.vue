<template>
<div id="two-player-game" v-if="inGame">
  <slot name="modals">
    <winner-modal id="winner-modal" class="modal fade"
      data-backdrop='static' data-keyboard='false'/>
  </slot>

  <slot name="page-header">
    <page-header>
        <template v-slot:pageHeading> Score Limit: {{ game.scoreLimit }} </template>
    </page-header>
  </slot>

  <div class="player" style="left: 0;">
    <slot name="player-1">
      <player-area :player="game.getPlayer(0)" side="left"/>
    </slot>
  </div>

  <div class="stacks-area" style="left: 1%">
    <slot name="p1-stack-area">
      <stack-area :player="game.getPlayer(0)" tabSide="right"/>
    </slot>
  </div>

  <div class="hand-area">
    <slot name="hand-area">
      <hand-area/>
    </slot>
  </div>

  <div class="player" style="right: 0;">
    <slot name="player-2">
      <player-area :player="game.getPlayer(1)" side="right"/>
    </slot>
  </div>

  <div class="stacks-area" style="right: 1%;">
    <slot name="p2-stack-area">
      <stack-area :player="game.getPlayer(1)" tabSide="left"/>
    </slot>
  </div>

  <effect-notifications/>

</div>
<div v-else>
  <error-page/>
</div>
</template>

<script>
import WinnerModal from '@/components/modals/WinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import PlayerArea from '@/components/playerArea/PlayerArea'
import HandArea from '@/components/handArea/HandArea'
import StackArea from '@/components/stackArea/StackArea'
import EffectNotifications from '@/components/shared/EffectNotifications'
import ErrorPage from '@/components/shared/ErrorPage'
import { bus } from '@/components/shared/Bus'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'beginner-game',
  components: {
    'winner-modal': WinnerModal,
    'page-header': PageHeader,
    'player-area': PlayerArea,
    'hand-area': HandArea,
    'effect-notifications': EffectNotifications,
    'stack-area': StackArea,
    'error-page': ErrorPage
  },
  computed: {
    ...mapGetters(['game', 'inGame'])
  },
  methods: {
    ...mapActions(['leaveGame']),
    showWinner () {
      $('#winner-modal').modal('show')
    }
  },
  created () {
    bus.$on('game-over', this.showWinner)
    // ensures we are always in a game mode when on this page.
    if (!this.inGame) {
      this.leaveGame()
    }
  },
  beforeDestroy () {
    bus.$off('game-over', this.showWinner)
  }
}
</script>

<style>
#two-player-game {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 750px;
  font-family: monospace;
}

.player {
  position: absolute;
  top: 40px;
  width: 25%;
  height: 45%;
}

.hand-area {
  position: absolute;
  top: 40px;
  left: 25%;
  width: 50%;
  height: 45%;
}

.stacks-area {
  position: absolute;
  top: 50%;
  width: 48%;
  height: 49%;
}
</style>

