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
            <ul class="nav nav-tabs" style="font-size: 25px">
              <li v-for="player in players" v-if="!player.hasFirewall"><a data-toggle="tab" :href="'#' + player.id">{{ player.name }}</a></li>
            </ul>

            <div class="tab-content" style="text-align: left">
              <div v-for="player in players" :id="player.id" class="tab-pane fade">
                <opponent-stacks :player="player"></opponent-stacks>
              </div>
            </div>
        </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardHack" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard Hack Card</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="hackCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import OpponentStacks from '../../SharedComponents/OpponentStacks.vue'
  import { bus } from '../../SharedComponents/Bus.vue'

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
      $('.hack').modal({
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
