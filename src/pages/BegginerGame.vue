<template>
<div id="begginer-game">
  <page-header/>

  <div class="begin-player" style="left: 0;">
    <player-area :player="pageState.players[0]" side="left"/>
  </div>

  <div class="begin-play-field" style="left: 1%">
    <play-field :player="pageState.players[0]"/>
  </div>

  <div class="begin-turn-area">
    <turn-area/>
  </div>

  <div class="begin-player" style="right: 0;">
    <player-area :player="pageState.players[1]" side="right"/>
  </div>

  <div class="begin-play-field" style="right: 1%;">
    <play-field :player="pageState.players[1]"/>
  </div>

</div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import PlayerArea from '@/components/game/PlayerArea'
import TurnArea from '@/components/game/NewTurnArea'
import PlayField from '@/components/game/PlayField'

export default {
  name: 'begginer-game',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader,
    'player-area': PlayerArea,
    'turn-area': TurnArea,
    'play-field': PlayField
  }
}
</script>

<style>
#begginer-game {
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
