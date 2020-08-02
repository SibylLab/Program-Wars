<template>
<div id="scan-overlay">
  <scan-modal v-if="activeScan" :attacks="getAttacks"
      :cardOwner="player" :card="card">
  </scan-modal>

  <h5> {{ scanText }} </h5>

  <button v-if="canScan" class="btn btn-sm btn-primary my-btn" v-on:click="playScan()">
    Activate
  </button>

</div>
</template>


<script>
import ScanModal from '@/components/modals/ScanModal'
import { mapGetters } from 'vuex'

export default {
  name: 'scan-overlay',
  props: ['card', 'player'],
  data () {
    return {
      activeScan: false
    }
  },
  components: {
    'scan-modal': ScanModal
  },
  computed: {
    ...mapGetters(['game']),
    canScan() {
      return !this.player.helpedBy('SCAN')
    },
    scanText () {
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
  border: solid black 2px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
}

.my-btn {
  display: block;
  width: 96%;
  margin: 2% 2%;
}

h5 {
  margin: 2%;
}
</style>


