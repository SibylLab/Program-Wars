<template>
<div id="beginner-game">
  <winner-modal id="winner-modal" class="modal fade"/>
  <page-header/>

  <div class="begin-player" style="left: 0;">
    <player-area :player="game.getPlayer(0)" side="left"/>
  </div>

  <div class="begin-play-field" style="left: 1%">
    <play-field :player="game.getPlayer(0)"/>
  </div>

  <div class="begin-hand-area">
    <hand-area/>
  </div>

  <div class="begin-player" style="right: 0;">
    <player-area :player="game.getPlayer(1)" side="right"/>
  </div>

  <div class="begin-play-field" style="right: 1%;">
    <play-field :player="game.getPlayer(1)"/>
  </div>

  <effect-notifications/>

</div>
</template>

<script>
import WinnerModalBeginner from '@/components/modals/WinnerModalBeginner'
import PageHeader from '@/components/shared/PageHeader'
import PlayerArea from '@/components/playerArea/PlayerArea'
import HandArea from '@/components/handArea/HandArea'
import PlayField from '@/components/stackArea/PlayField'
import EffectNotifications from '@/components/shared/EffectNotifications'
import { bus } from '@/components/shared/Bus'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'beginner-game',
  components: {
    'winner-modal': WinnerModalBeginner,
    'page-header': PageHeader,
    'player-area': PlayerArea,
    'hand-area': HandArea,
    'effect-notifications': EffectNotifications,
    'play-field': PlayField
  },
  computed: {
    ...mapGetters(['game', 'page'])
  },
  methods: {
    ...mapActions(['leaveGame']),
    showWinner () {
      $('#winner-modal').modal('show')
    }
  },
  created () {
    if (this.page !== 'beginner') {
      this.leaveGame()
    }
    bus.$on('game-over', this.showWinner)
  },
  beforeDestroy () {
    bus.$off('game-over', this.showWinner)
  }
}
</script>

<style>
#beginner-game {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 750px;
  font-family: monospace;
}

.begin-player {
  position: absolute;
  top: 40px;
  width: 25%;
  height: 45%;
}

.begin-hand-area {
  position: absolute;
  top: 40px;
  left: 25%;
  width: 50%;
  height: 45%;
}

.begin-play-field {
  position: absolute;
  top: 50%;
  width: 48%;
  height: 49%;
}
</style>
