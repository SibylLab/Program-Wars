<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="border: none "> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hackCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title"><b>{{player.name}}'s</b> Stacks</h3>
        </div>
        <div class="modal-body">
          <div class="container" style="width: 100%">
                <opponent-stacks :player="player"></opponent-stacks>
          </div>

        </div>
        <div class="modal-footer" style="border: none">
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="hackCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable no-undef */

  import OpponentStacks from '../../SharedComponents/OpponentStacks.vue'
  import { bus } from '../../SharedComponents/Bus.js'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  /**
   * This is the Modal called when the hack card is clicked.
   */
  export default {
    props: ['player'],
    components: {
      'opponent-stacks': OpponentStacks
    },
    methods: {
      /**
       * These mapping functions map local functions to the vuex functions or state.
       */
      ...mapGetters([
        'getActiveCard'
      ]),
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      ...mapMutations([
        'discardSelectedCard'
      ]),
      hackCanceled () {
        bus.$emit('hackCanceled')
      },
      discardHack () {
        if (this.getActiveCard() !== undefined) {
          this.discardSelectedCard()
          this.playerTookTurn()
          this.turn(true)
        }
      }
    },
    created () {
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
