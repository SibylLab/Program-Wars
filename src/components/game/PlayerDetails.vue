<template>
<div id="player-details">

  <div :class="[side, 'player-info']">
    <h3 :class="[side, 'name']">
      {{ player.name }}
    </h3>

    <img :class="['avatar', side, {active: isCurrentPlayer}]"
        :src="player.image">
  </div>

  <div :class="[oppSide, 'player-access']">
    <spy-accessor v-if="showSpy" :player="player"/>
  </div>
</div>
</template>

<script>
import SpyAccessor from '@/components/game/SpyAccessor.vue'

export default {
  name: 'player-details',
  props: ['player', 'side'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'spy-accessor': SpyAccessor
  },
  computed: {
    isCurrentPlayer () {
      return this.player.id === this.pageState.currentPlayer().id
    },
    oppSide () {
      return this.side === 'right' ? 'left' : 'right'
    },
    showSpy () {
      if (this.player.hurtBy('SPYWARE')) {
        const spies = this.player.negativeEffects.filter(e => e.type === 'SPYWARE')
        return spies.find(s => s.attackerId === this.currentPlayer().id) !== undefined
      }
      return false
    }
  }
}
</script>

<style scoped>
#player-details {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}

.player-info {
  position: absolute;
  top: 0px;
  width: 55%;
  height: 100%;
}

.name {
  position: absolute;
  top: 0px;
  color: black;
}

.avatar {
  position: absolute;
  bottom: 0;
  height: 66%;
  border: solid black 3px;
  border-radius: 5px;
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
  -webkit-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  -moz-box-shadow: 0 0 24px 10px rgba(0,255,0,1);
  box-shadow: 0 0 24px 10px rgba(0,255,0,1);
}
</style>
