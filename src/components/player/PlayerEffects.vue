<template>
<div id="player-effects">

    <h5 id="good-effects-text" :class="side"><b>Threat Prevention</b></h5>
    <div id="good-effects" :class="side">
      <img v-for="effect in player.effects.positive" v-bind:key="effect.id"
          class="effect-icon" :src="effect.image"
          :title="effectTooltip(effect.type)">
    </div>

    <h5 id="bad-effects-text" :class="side"><b>Active Threats</b></h5>
    <div id="bad-effects" :class="side">
      <div v-for="effect in player.effects.negative" v-bind:key="effect.id"
          class="effect">
        <img class="effect-icon" :src="effect.image" :title="effectTooltip(effect.type)">
        <div v-if="hasLimit(effect)" class="turns"> {{ effect.turnsLeft }} </div>
      </div>
    </div>

</div>
</template>

<script>
import tooltips from '@/data/tooltips'

export default {
  name: 'player-effect',
  props: ['player', 'side'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  methods: {
    effectTooltip (type) {
      return tooltips.effects[type]
    },
    hasLimit (effect) {
      return effect.turnsLeft !== -1
    }
  }
}
</script>

<style scoped>
#player-effects {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

#good-effects-text {
  position:absolute;
  top: 0;
}

#bad-effects-text {
  position:absolute;
  top: 50%;
}

#good-effects {
  position: absolute;
  top: 20%;
}

#bad-effects {
  position: absolute;
  top: 70%;
}

.effect {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  margin: 5px;
}

.effect-icon {
  width: 100%;
  height: 100%;
}

.turns {
  position: absolute;
  font-size: 22px;
  top: -20%;
  right: -17%;
  height: 27px;
  background-color: blue;
  color: white;
  padding: 0 0 0 0;
}

.left {
  left: 0px;
}

.right {
  right: 0px;
}
</style>
