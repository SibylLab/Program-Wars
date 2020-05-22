<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static"
        data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">

        <div class="modal-header" style="border: none ">
          <h3 class="modal-title"><b>{{player.name}}'s</b> Stacks</h3>
        </div>

        <div class="modal-body">
          <opponent-stacks :player="player"></opponent-stacks>
        </div>

        <div class="modal-footer" style="border: none">
          <button type="button" class="btn btn-default" data-dismiss="modal"
              style="margin: 5px;" v-on:click="hackCanceled">
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
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
