<template>
<div id="standard-game">
  <winner-modal id="winner-modal" class="modal fade"
      tabindex="-1" role="dialog"
      data-backdrop='static' data-keyboard='false'>
  </winner-modal>

  <page-header/>

  <div class="player" style="left: 0;">
    <player-area :player="pageState.players[0]" side="left"/>
  </div>

  <div class="play-field" style="left: 1%">
    <play-field :player="pageState.players[0]"/>
  </div>

  <div class="turn-area">
    <turn-area/>
  </div>

  <div class="player" style="right: 0;">
    <player-area :player="pageState.players[1]" side="right"/>
  </div>

  <div class="play-field" style="right: 1%;">
    <play-field :player="pageState.players[1]"/>
  </div>

</div>
</template>

<script>
import WinnerModal from '@/components/modals/WinnerModal'
import PageHeader from '@/components/shared/PageHeader'
import PlayerArea from '@/components/player/PlayerArea'
import TurnArea from '@/components/game/NewTurnArea'
import PlayField from '@/components/game/NewPlayField'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'standard-game',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'winner-modal': WinnerModal,
    'page-header': PageHeader,
    'player-area': PlayerArea,
    'turn-area': TurnArea,
    'play-field': PlayField
  },
  methods: {
    showWinner () {
      $('#winner-modal').modal('show')
    }
  },
  created () {
    bus.$on('game-over', this.showWinner)
  },
  beforeDestroy () {
    bus.$off('game-over', this.showWinner)
  }
}
</script>

<style>
#standard-game {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.player {
  position: absolute;
  top: 40px;
  width: 25%;
  height: 45%;
}

.turn-area {
  position: absolute;
  top: 40px;
  left: 25%;
  width: 50%;
  height: 45%;
}

.play-field {
  position: absolute;
  top: 50%;
  width: 48%;
  height: 49%;
}
</style>

