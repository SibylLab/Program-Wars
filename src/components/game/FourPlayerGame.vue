<template>
<div id="four-player-game">

  <div id="left-players">
    <div class="top-element">
      <slot name="top-left-player" v-bind:player="getPlayer(0)" v-bind:side="'left'">
        <player-info :player="getPlayer(0)" side="left"></player-info>
      </slot>
    </div>
    <div class="bottom-element">
      <slot name="bottom-left-player" v-bind:player="getPlayer(1)" v-bind:side="'left'">
        <player-info :player="getPlayer(1)" side="left"></player-info>
      </slot>
    </div>
  </div>

  <div id="active-turn">
    <div id="turn-cards">
      <turn-area></turn-area>
    </div>

    <div id="stack-area">
      <ul id="player-tabs">
        <li v-for="player in players" v-bind:key="player.id" v-on:click="changeTab(player)"
            :class="['tab', { active: isActiveTab(player) }]">
          {{ player.name }}
        </li>
      </ul>
      <slot name="play-area" v-bind:player="tabPlayer" v-bind:side="'left'">
        <play-area :player="tabPlayer" side="left"></play-area>
      </slot>
    </div>
  </div>

  <div id="right-players">
    <div class="top-element">
      <slot name="top-right-player" v-bind:player="getPlayer(2)" v-bind:side="'right'">
        <player-info :player="getPlayer(2)" side="right"></player-info>
      </slot>
    </div>
    <div class="bottom-element">
      <slot name="bottom-right-player" v-bind:player="getPlayer(3)" v-bind:side="'right'">
        <player-info :player="getPlayer(3)" side="right"></player-info>
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
 * Organizes the layout for a 4 player game.
 */
export default {
  name: 'four-player-game',
  data () {
    return {
      tabPlayer: this.activePlayer
    }
  },
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
  watch: {
    activePlayer: function (player) {
      this.tabPlayer = player
    }
  },
  methods: {
    getPlayer (id) {
      return this.players.find(p => p.id === id)
    },
    isActiveTab (player) {
      return player === this.tabPlayer
    },
    changeTab (player) {
      this.tabPlayer = player
    }
  },
  created () {
    this.tabPlayer = this.activePlayer
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

#player-tabs {
  position: absolute;
  left: 10px;
  top: -35px;
}

#turn-cards {
  position: absolute;
  width: 100%;
  height: 48%;
}

#stack-area {
  position:absolute;
  top: 48%;
  width: 100%;
  height: 52%;
}

.top-element {
  position: absolute;
  width: 100%;
  height: 50%;
}

.bottom-element {
  position:absolute;
  top: 50%;
  width: 100%;
  height: 50%;
}

.tab {
  cursor: pointer;
}

.active {
  background-color: #fff;
  color: #333333;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  position: relative;
  display: inline-block;
  margin: 5px 1px;
  padding: 2px 5px;
  border: solid grey 2px;
  background-color: #333333;
  color: #fff;
  z-index: 40;
}
</style>

