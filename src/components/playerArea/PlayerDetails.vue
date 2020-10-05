<template>
<div id="player-details">

  <div :class="[side, 'player-info']">
    <h3 :class="[side, 'name']"> {{ player.name }} </h3>

    <img :class="['avatar', side, { active: isCurrentPlayer }]"
        :src="player.image">
  </div>

  <div :class="[oppSide, 'player-access']">
    <spy-accessor v-if="showSpy" :player="player"/>
  </div>

</div>
</template>

<script>
import SpyAccessor from '@/components/playerArea/SpyAccessor.vue'
import { mapGetters } from 'vuex'

/**
 * Displays the player's name, player image, and buttons for spying on the player's hand.
 *
 * @vue-prop {Player} player - The player the details are for.
 * @vue-prop {string} side - The side of the screen it is on `left | right`.
 *
 * @vue-computed {bool} isCurrentPlayer - True if the player is the current player.
 * @vue-computed {string} oppSide - Returns the string for the opposite of
 * `left | right`.
 * @vue-computed {bool} showSpy - True if a player should have a spy button shown.
 */
export default {
  name: 'player-details',
  props: ['player', 'side'],
  components: {
    'spy-accessor': SpyAccessor
  },
  computed: {
    ...mapGetters(['game']),
    isCurrentPlayer () {
      return this.game.currentPlayer() === this.player
    },
    oppSide () {
      return this.side === 'right' ? 'left' : 'right'
    },
    showSpy () {
      if (this.player.hurtBy('SPYWARE')) {
        return this.player.effects.hasNegative('SPYWARE', this.game.currentPlayer())
      }
      return false
    }
  }
}
</script>

<style scoped>
#player-details {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.player-info {
  position: absolute;
  top: 0;
  width: 55%;
  height: 100%;
}

.name {
  position: absolute;
  top: 0;
  color: black;
}

.avatar {
  position: absolute;
  bottom: 0;
  height: 72%;
  border: solid black 0.1rem;
}

.player-access {
  position: absolute;
  top: 0;
  width: 45%;
  height: 100%;
}

.left {
  left: 0%;
}

.right {
  right: 0%;
}

.active {
  -webkit-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  -moz-box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
  box-shadow: 0 0 0.7rem 0.7rem rgba(0,255,0,1);
}
</style>
