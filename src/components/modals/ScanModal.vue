<template>
<div id='active-scan'>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="border-radius: 30px">

      <div class="modal-header" style="padding-bottom: 0;">
        <button type="button" class="close" data-dismiss="modal"
            aria-label="Close" v-on:click="leaveGame">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body" style="padding-top: 0;">
        <h3 class="modal-title"><b>Active Scan</b></h3>
        <!-- List all attacks -->
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary" data-dismiss="modal"
            v-on:click="discardScan">
          Discard Scan
        </button>
      </div>

    </div>
  </div>
</div>
</template>


<script>
export default {
  name: 'active-scan',
  data () {
    return {
      pageState: this.$store.state.pageState,
      player: this.$store.state.pageState.currentPlayer()
    }
  },
  methods: {
    playScan (target) {
      // Not sure yet where some of this info will come from
      this.pageState.takeTurn({
        type: "playScan", player: this.player,
        card: this.card, cardOwner: this.cardOwner,
        target: target
      })
    },
    discard () {
      this.pageState.takeTurn({
        type: 'discardCard', card: this.cards, cardOwner: this.cardOwner
      })
    }
  }
}
</script>


<style scoped>
</style>


