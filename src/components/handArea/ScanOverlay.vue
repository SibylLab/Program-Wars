<template>
<div id="scan-overlay">
  <active-scan v-if="activeScan" :attacks="getAttacks"
      :cardOwner="player" :card="card"/>

  <h5> {{ titleText }} </h5>
  <button v-if="canScan" class="btn btn-sm btn-primary my-btn" v-on:click="playScan()">
    Activate
  </button>

</div>
</template>


<script>
import ActiveScan from '@/components/shared/ActiveScan'
import { mapGetters } from 'vuex'

/**
 * The overlay that appears over the scan card to allow players to play it.
 * 
 * @vue-prop {Card} card - The scan card to overlay.
 * @vue-prop {Player} owner - The player that the card belongs to.
 * @vue-data {bool} [activeScan=false] - When true the `ActiveScan` component will be
 * displayed to let the player choose an attack to clean. If there are no attacks
 * to scan this will be false.
 *
 * @vue-computed {bool} canScan - True if the player does not already have an
 * active scan effect.
 * @vue-computed {string} titleText - 'Scan' if the player can scan, 'Scan Active'
 * if the player already has a scan effect active.
 * @vue-computed {Object} getAttacks - Returns an object with `effects`, `virusStacks`,
 * and `mimics` that each list all of the attacks of their type on the player.
 * @vue-computed {bool} needToClean - True if there are any attakcs on the player.
 */
export default {
  name: 'scan-overlay',
  props: ['card', 'player'],
  data () {
    return {
      activeScan: false
    }
  },
  components: {
    'active-scan': ActiveScan
  },
  computed: {
    ...mapGetters(['game']),
    canScan() {
      return !this.player.helpedBy('SCAN')
    },
    titleText () {
      return this.canScan ? "Scan" : "Scan Active"
    },
    getAttacks () {
      return this.player.getAllAttacks()
    },
    needToClean () {
      const attacks = this.getAttacks
      return attacks.effects.length > 0 || attacks.virusStacks.length > 0
          || attacks.mimics.length > 0
    }  
  },
  methods: {
    /**
     * Takes a turn to play the scan card.
     *
     * If the card is a mimic or the player has no attacks to clean it will
     * be played as a special card. The mimic will be resolved or it will be
     * added as a positive effect. Otherwise, the `ActiveScan` component will
     * be displayed and the player can choose an effect to clean.
     */
    playScan () {
      if (!this.card.isMimic && this.needToClean) {
        this.activeScan = true
      } else {
        this.activeScan = false
        this.game.takeTurn({
          type: 'playSpecialCard',
          card: this.card, cardOwner: this.player,
          target: this.game.currentPlayer(), targetType: 'player',
          player: this.game.currentPlayer()
        })
      }
    }
  }
}
</script>


<style scoped>
#scan-overlay {
  position: absolute;
  width: 100%;
  border: solid black 0.1rem;
  border-radius: 0.5rem;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2%;
}

h5 {
  margin: 2%;
}
</style>


