<template>
<div id="beginner-game">
  <winner-modal id="winner-modal" class="modal fade"/>
  <page-header/>

  <div class="begin-player" style="left: 0;">
    <player-area :player="state.players[0]" side="left"/>
  </div>

  <div class="begin-play-field" style="left: 1%">
    <play-field :player="state.players[0]"/>
  </div>

  <div class="begin-turn-area">
    <turn-area/>
  </div>

  <div class="begin-player" style="right: 0;">
    <player-area :player="state.players[1]" side="right"/>
  </div>

  <div class="begin-play-field" style="right: 1%;">
    <play-field :player="state.players[1]"/>
  </div>

  <effect-notifications/>

</div>
</template>

<script>
import WinnerModalBeginner from '@/components/modals/WinnerModalBeginner'
import PageHeader from '@/components/shared/PageHeader'
import PlayerArea from '@/components/player/PlayerArea'
import TurnArea from '@/components/game/NewTurnArea'
import PlayField from '@/components/stack/PlayField'
import NewEffectNotifications from '@/components/game/NewEffectNotifications'
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'beginner-game',
  components: {
    'winner-modal': WinnerModalBeginner,
    'page-header': PageHeader,
    'player-area': PlayerArea,
    'turn-area': TurnArea,
    'effect-notifications': NewEffectNotifications,
    'play-field': PlayField
  },
  computed: {
    ...mapGetters(['state', 'page'])
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
}

.begin-player {
  position: absolute;
  top: 40px;
  width: 25%;
  height: 45%;
}

.begin-turn-area {
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
