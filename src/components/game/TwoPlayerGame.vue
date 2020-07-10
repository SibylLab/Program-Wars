<template>
<div id="two-player-game">

  <div id="play">
    <div id="left-player">
      <slot name="left-player" v-bind:player="getPlayer(0)" v-bind:side="'left'">
        <player-info :player="getPlayer(0)" side="left"></player-info>
      </slot>
    </div>

    <div id="turn">
      <turn-area></turn-area>
    </div>

    <div id="right-player">
      <slot name="right-player" v-bind:player="getPlayer(1)" v-bind:side="'right'">
        <player-info :player="getPlayer(1)" side="right"></player-info>
      </slot>
    </div>
  </div>

  <div id="stacks">
    <div id="left-field">
      <slot name="left-play-area" v-bind:player="getPlayer(0)" v-bind:side="'left'">
        <play-area :player="getPlayer(0)" side="left"></play-area>
      </slot>
    </div>

    <div id="right-field">
      <slot name="right-play-area" v-bind:player="getPlayer(1)" v-bind:side="'right'">
        <play-area :player="getPlayer(1)" side="right"></play-area>
      </slot>
    </div>
  </div>
  
</div>
</template>


<script>
import PlayerInfo from '@/components/game/PlayerInfo'
import TurnArea from '@/components/game/TurnArea'
import PlayArea from '@/components/game/PlayArea'
import {mapState} from 'vuex'

/**
 * Organizes the layout for a 2 player game.
 */
export default {
  name: 'two-player-game',
  components: {
    'turn-area': TurnArea,
    'player-info': PlayerInfo,
    'play-area': PlayArea
  },
  computed: {
    ...mapState([
      'players'
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
#two-player-game {
  position: absolute;
  width: 100%;
  height: 100%;
}

#play {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 47%;
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
  top: 47%;
  width: 100%;
  height: 53%;
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

