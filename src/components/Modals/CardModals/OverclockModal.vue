<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="overclockCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Overclock</h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <p>Do you want to use the Overclock card to double your current score?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardOverclock" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard OC Card</button>
          <button class="btn btn-default" @click="useClicked()"><b>Use</b></button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="overclockCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from '../../SharedComponents/Bus.vue'

  export default {
    props: ['players'],

    methods: {
      overclockCanceled() {
        bus.$emit('hackCanceled');
      },
      discardOverclock() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.commit('discardSelectedCard');
          this.$store.dispatch('playerTookTurn');
          this.$store.dispatch('turn', true);
        }
      },
      useClicked() {
        let player = this.$store.getters.getCurrentPlayer;
        //console.log("Im in playerClicked " + player);
        this.$store.commit('giveOverclock', player.id);
        console.log("Active Card " + this.$store.getActiveCard);
        $('.overclock').modal('hide');
        let ret = this.$store.dispatch('playerTookTurn');
        let turn = this.$store.dispatch('turn', true);
      },

    },
    computed: {
      hideButton() {
        let activeCard = this.$store.getters.getActiveCard;
        if(activeCard !== undefined) {
          if(activeCard.type === 'OVERCLOCK' && activeCard !== undefined) {
            return 'display: block';
          } else {
            return 'display: none';
          }
        } else {
          return 'display: none'
        }
      }
    },
    created() {
      $('.overclock').modal({
        backdrop: 'static',
        keyboard: false
      })
    }

  }

</script>

<style scoped>
  .stacks {
    width: 120px;
    border: 1px solid black;
  }
</style>
