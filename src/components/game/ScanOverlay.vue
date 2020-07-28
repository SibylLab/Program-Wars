<template>
<div id="scan-overlay">
  <scan-modal id="scan-modal" class="modal fade" :attacks="getAttacks"
      tabindex="-1" role="dialog" :cardOwner="player" :card="card"
      data-backdrop='static' data-keyboard='false'>
  </scan-modal>

  <h5>Scan</h5>

  <button class="btn btn-sm btn-primary my-btn" v-on:click="playScan()">
    Activate
  </button>

</div>
</template>


<script>
export default {
  name: 'scan-overlay',
  props: ['card', 'player'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  computed: {
    getAttacks () {
      return this.player.getAllAttacks()
    }
  },
  methods: {
    playScan () {
      const attacks = this.getAttacks
      if (attacks.effects.length > 0 || attacks.virusStacks.length > 0
          || attacks.mimics.length > 0) {
        $('#scan-modal').modal('show')
      } else {
        this.pageState.takeTurn({
          type: 'playSpecialCard', card: this.card, cardOwner: this.cardOwner,
          target: this.player, player: this.player
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


