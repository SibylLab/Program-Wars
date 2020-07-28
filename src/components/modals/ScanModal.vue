<template>
<div id='active-scan'>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="border-radius: 30px">

      <div class="modal-header" style="padding-bottom: 0;">
      </div>

      <div class="modal-body" style="padding-top: 0;">
        <h3 class="modal-title"><b>Active Scan</b></h3>
        <!--
          List all attacks, first viruses, then trojans, then effects
          each should have a button to clean it
          The buttons can call functions specific to the type if needed to
          deal with them differently
        -->
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
  props: ['cardOwner', 'card', 'attacks'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      player: this.$store.state.pageState.currentPlayer()
    }
  },
  methods: {
    playScan (target) {
      this.pageState.takeTurn({
        type: "playScan", player: this.player,
        card: this.card, cardOwner: this.cardOwner,
        target: target
      })
    },
    discardScan () {
      this.pageState.takeTurn({
        type: 'discardCard', card: this.card, cardOwner: this.cardOwner
      })
    }
  }
}
</script>


<style scoped>
</style>


