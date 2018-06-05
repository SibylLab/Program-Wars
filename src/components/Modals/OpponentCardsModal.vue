<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hackCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Opponent Stacks</h3>
        </div>
        <div class="modal-body">
          <div class="container">
            <ul class="nav nav-tabs list-inline" role="tablist" style="font-size: 22px">
              <li role="presentation" v-for="player in players"><a data-toggle="tab" :href="'#' + player.id">{{ player.name }}</a></li>
            </ul>

          <div class="tab-content">
            <div v-for="player in players" :id="player.id" class="tab-pane fade" >
              <opponent-stacks :player="player"></opponent-stacks>
            </div>
          </div>
          </div>
          <!--<div class="container">-->
            <!--<ul class="nav nav-tabs" role="tablist" style="font-size: 25px">-->
              <!--<li v-for="player in players"><a data-toggle="tab" :href="'#' + player.id">{{ player.name }}</a></li>-->
            <!--</ul>-->

            <!--<div class="tab-content" style="text-align: left">-->
              <!--<div role="tabpanel" v-for="player in players" :id="player.id" class="tab-pane fade">-->
                <!--<opponent-stacks :player="player"></opponent-stacks>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->
        <!--<div class="modal-footer">-->
          <!--<button class="btn btn-default" @click="discardHack" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard Hack Card</button>-->
          <!--<button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="hackCanceled">Cancel</button>-->
        <!--</div>-->
      </div>
    </div>
    </div>
  </div>

</template>

<script>

  import OpponentStacks from '../SharedComponents/OpponentStacks.vue'
  import { bus } from '../SharedComponents/Bus.vue'

  /**
   * This Modal is to be displayed when an opponents name is clicked in the playerInfoPanel to show their attack/safety
   * cards and their stacks.
   */
  export default {
    props: ['players'],
    components: {
      'opponent-stacks': OpponentStacks
    },
    methods: {
      hackCanceled() {
        bus.$emit('hackCanceled');
      },
      discardHack() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.commit('discardSelectedCard');
          this.$store.dispatch('playerTookTurn');
          this.$store.dispatch('turn', true);
        }
      }
    },
    computed: {
      hideButton() {
        let activeCard = this.$store.getters.getActiveCard;
        if(activeCard !== undefined) {
          if(activeCard.type === 'H' && activeCard !== undefined) {
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
      $('.opponentCards').modal({
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
