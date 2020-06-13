<template>
<div id="four-player-game">

  <div id="left-players">
    <player-info :player="getPlayer(0)" side="left"></player-info>
    <player-info :player="getPlayer(1)" side="left"></player-info>
  </div>

  <div id="active-turn">
    <turn-area></turn-area>
    <play-area :player="activePlayer" side="left"></play-area>
  </div>

  <div id="right-players">
    <player-info :player="getPlayer(2)" side="right"></player-info>
    <player-info :player="getPlayer(3)" side="right"></player-info>
  </div>
  
</div>
</template>


<script>
import PlayerInfo from '@/components/game/PlayerInfo'
import TurnArea from '@/components/game/TurnArea'
import PlayArea from '@/components/game/PlayArea'
import {mapState} from 'vuex'

/**
 * Organizes the layout for a 4 player game.
 */
export default {
  name: 'four-player-game',
  components: {
    'turn-area': TurnArea,
    'player-info': PlayerInfo,
    'play-area': PlayArea
  },
  computed: {
    ...mapState([
      'players',
      'activePlayer'
    ])
  },
  methods: {
    getPlayer (id) {
      return this.players.find(p => p.id === id)
    }
  }
}
</script>


<style scoped>
#four-player-game {
  position: absolute;
  width: 100%;
  height: 100%;
}

#left-players {
  position: absolute;
  left: 0px;
  width: 25%;
  height: 100%;
}

#active-turn {
  position: absolute;
  left: 25%;
  width: 50%;
  height: 100%;
}

#right-players {
  position: absolute;
  right: 0px;
  width: 25%;
  height: 100%;
}
</style>


