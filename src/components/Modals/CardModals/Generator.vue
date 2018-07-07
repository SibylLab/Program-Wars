<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="generatorCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Generator</h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <p>Do you want to use the Generator to prevent all power outages?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardGenerator" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard Generator</button>
          <button class="btn btn-default" @click="useClicked()" :disabled="playerCanUse"><b>Use</b></button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="generatorCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import { bus } from '../../SharedComponents/Bus.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  /**
   * The Modal for when the Generator card is clicked.
   */
  export default {
    props: ['players'],

    methods: {
      /**
       * These mapping functions map local functions to the vuex functions or state.
       */
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      ...mapGetters([
        'getActiveCard',
        'getCurrentPlayer',
        'getTutorialState'
      ]),
      ...mapMutations([
        'increaseFactIndex',
        'discardSelectedCard',
        'giveGenerator'
      ]),
      generatorCanceled () {
        bus.$emit('hackCanceled')
      },
      discardGenerator () {
        if (this.getActiveCard() !== undefined) {
          this.discardSelectedCard()
          this.playerTookTurn()
          this.turn(true)
        }
      },
      useClicked () {
        let player = this.getCurrentPlayer()
        this.giveGenerator(player.id)
        $('.generator').modal('hide')
        if (this.getTutorialState()) {
          bus.$emit('cardPlayed')
          this.increaseFactIndex()
        }
        this.playerTookTurn()
        this.turn(true)
        bus.$emit('alterTipBox')
      }

    },
    computed: {
      hideButton () {
        let activeCard = this.getActiveCard()
        if (activeCard !== undefined) {
          if (activeCard.type === 'GENERATOR') {
            return 'display: block'
          } else {
            return 'display: none'
          }
        } else {
          return 'display: none'
        }
      },
      playerCanUse () {
        let player = this.getCurrentPlayer()
        return player.hasGenerator
      }
    },
    created () {
      $('.generator').modal({
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
