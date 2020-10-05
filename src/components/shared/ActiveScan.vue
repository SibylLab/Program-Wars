<template>
<div id='active-scan'>
  <div class="backdrop">

    <div class="popup">
      <h3 style="margin-top: 2%;"> <b>Active Scan</b> </h3>

      <div class="content">
        <div v-for="mimic in attacks.mimics" v-bind:key="mimic.id" class="attack">
          <img class="card" :src="mimic.card.image">
          <img class="icon" :src="trojanImage">
          <button v-on:click="playScan(mimic, 'mimic')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="stack in attacks.virusStacks" v-bind:key="stack.id" class="attack">
          <div class="card-stack">
            <card-stack :stack="stack"/>
          </div>
          <button v-on:click="playScan(stack, 'stack')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="effect in attacksEffects" v-bind:key="effect.id" class="attack">
          <img class="card" :src="effect.image">
          <button v-on:click="playScan(effect, 'effect')" class="btn btn-success clean">
            Clean </button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>


<script>
import CardStack from '@/components/stackArea/CardStack'
import { isNegativeEffect } from '@/classes/card/cardData'
import { mapGetters } from 'vuex'

/**
 * Displays all the current attacks on a player and allows them to choose one to clean.
 *
 * @vue-prop {Player} cardOwner - The player that owns the `scan` card.
 * @vue-prop {Card} card - The `scan` card that is being used.
 * @vue-prop {Object} attacks - The attacks that are on the player. Has `effects`,
 * `virusStacks`, and `mimics` that hold lists of all the attacks of those kinds
 * that are currently affecting the player.
 *
 * @vue-computed {string} trojanImage - The image path for the trojan effect image.
 * @vue-computed {StatusEffect[]} attacksEffects - All the valid negative status
 * effects that have images on the player.
 */
export default {
  name: 'active-scan',
  props: ['cardOwner', 'card', 'attacks'],
  components: {
    'card-stack': CardStack
  },
  computed: {
    ...mapGetters(['game']),
    trojanImage () {
      return 'static/cardImages/effects/TROJAN.png'
    },
    attacksEffects () {
      return this.attacks.effects.filter(e => e.image && isNegativeEffect(e.type))
    }
  },
  methods: {
    /**
     * Takes a turn to play the scan card and clean a given target attack.
     *
     * @param {Stack|Card|StatusEffect} target - The target of the scan
     * which can be a different type depending on the attack it is cleaning.
     * @param {string} type - The type of the target `stack`, `mimic`, or `effect`.
     */
    playScan (target, type) {
      this.game.takeTurn({
        type: "playScan", player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        target: target, targetType: type
      })
    }
  }
}
</script>

<style scoped>
#active-scan {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.popup {
  position: absolute;
  top: 10%;
  left: 35%;
  width: 30%;
  height: auto;
  max-height: 80%;
  overflow: auto;
  border: ridge grey 0.5rem;
  border-radius: 1rem;
  background-color: white;
  z-index: 1000;
}

.content {
  margin: 5%;
  text-align: left;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.4);
}

.card-stack {
  position: relative;
  display: inline-block;
  margin-left: 3%;
  border: 0;
}

.card {
  display: inline;
  width: 22%;
  margin: 0 5%;
  border: 0;
}

.clean {
  position: absolute;
  top: 35%;
  right: 5%;
}

.attack {
  position: relative;
  margin: 5% 0;
}

.icon {
  position: absolute;
  top: 35%;
  left: 22%;
  width: 10%;
  border: 0;
}
</style>
