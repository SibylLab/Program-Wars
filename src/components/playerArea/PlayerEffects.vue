<template>
<div id="player-effects">

    <h5 id="good-effects-text" :class="side"> <b>Threat Prevention</b> </h5>

    <div id="good-effects" :class="side">
      <div v-for="effect in positiveEffects" v-bind:key="effect.id"
          class="effect">
        <img class="effect-icon" :src="effect.image" :title="tooltip(effect)">
      </div>
    </div>

    <h5 id="bad-effects-text" :class="side"> <b>Active Threats</b> </h5>

    <div id="bad-effects" :class="side">
      <div v-for="effect in negativeEffects" v-bind:key="effect.id"
          class="effect">
        <img class="effect-icon" :src="effect.image" :title="tooltip(effect)">
        <div v-if="hasLimit(effect)" class="turns"> {{ effect.turnsLeft }} </div>
      </div>
    </div>

</div>
</template>

<script>
import tooltips from '@/components/tooltips'

/**
 * Displays the active status effects on the player using small card icons.
 *
 * @vue-prop {Player} player - The player the details are for.
 * @vue-prop {string} side - The side of the screen it is on `left | right`.
 *
 * @vue-computed {StatusEffect[]} positiveEffects - A list of all positive
 * status effects on the player that should be displayed, i.e. have an image.
 * @vue-computed {StatusEffect[]} negativeEffects - A list of all negative
 * status effects on the player that should be displayed, i.e. have an image.
 */
export default {
  name: 'player-effect',
  props: ['player', 'side'],
  computed: {
    positiveEffects () {
      return this.player.effects.positive.filter(e => e.image)
    },
    negativeEffects () {
      return this.player.effects.negative.filter(e => e.image)
    }
  },
  methods: {
    /**
     * Returns the text for an effect's tooltip that shows on mouseover.
     * @param {StatusEffect} effect - The effect to get the tooltip for.
     * @return {string} The text for the effect's tooltip.
     */
    tooltip (effect) {
      return tooltips.effects[effect.card.type]
    },
    /**
     * Checks if an effect has a turn limit.
     * @param {StatusEffect} effect - the effect to check.
     * @return {bool} True if the given effect is not permanent.
     */
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
  width: 2rem;
  height: 2rem;
  margin: 0.2rem;
}

.effect-icon {
  width: 100%;
  height: 100%;
}

.turns {
  position: absolute;
  font-size: 1.3rem;
  top: -20%;
  right: -10%;
  height: 1.6rem;
  background-color: blue;
  color: white;
  padding: 0 0 0 0;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>
