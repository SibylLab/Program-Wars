<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="powerOutageCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Opponents to Crash</h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <div v-for="player in players" :id="player.id" class="col-lg-4" style="-webkit-align-items: center">
                <button class="btn btn-primary" @click="playerClicked(player.id)" v-if="!player.hasGenerator && !player.hasPowerOutage">Blackout <b>{{player.name}}</b></button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardPowerOutage" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard P/O Card</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="powerOutageCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from '../../SharedComponents/Bus.vue'
  import OpponentStacks from '../../SharedComponents/OpponentStacks.vue'

  export default {
    props: ['players'],
    components: {
      'opponent-stacks': OpponentStacks
    },

    methods: {
      powerOutageCanceled() {
        bus.$emit('hackCanceled');
      },
      discardPowerOutage() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.commit('discardSelectedCard');
          this.$store.dispatch('playerTookTurn');
          this.$store.dispatch('turn', true);
        }
      },
      playerClicked(player) {
        this.$store.commit('givePowerOutage', player);
        $('.powerOutage').modal('hide');
        if(this.$store.getters.getTutorialState){
          bus.$emit('cardPlayed');
          this.$store.commit('increaseFactIndex');
        }
        let ret = this.$store.dispatch('playerTookTurn');
        this.$store.dispatch('turn', true);
      }
    },
    computed: {
      hideButton() {
        let activeCard = this.$store.getters.getActiveCard;
        if(activeCard !== undefined) {
          if(activeCard.type === 'POWEROUTAGE' && activeCard !== undefined) {
            return 'display: block';
          } else {
            return 'display: none';
          }
        } else {
          return 'display: none'
        }
      },
    },
    created() {
      $('.powerOutage').modal({
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
