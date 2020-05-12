<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="border: none"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="antiVirusCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">AntiVirus</h3>
        </div>
        <div class="modal-body" style="font-size: 24px">
          <div class="container col-lg-12">
            <div class="row">
              <p>Do you want to use the AntiVirus to prevent all Viruses?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer" style="border: none">
          <button class="btn btn-default" @click="discardAntiVirus" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard AntiVirus</button>
          <button class="btn btn-default" @click="useClicked()" :disabled="playerCanUse"><b>Use</b></button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="antiVirusCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-undef */

  import { bus } from '../../SharedComponents/Bus.js'

  import {mapGetters, mapActions, mapMutations} from 'vuex'

  /**
   * The Modal for when the AntiVirus card is clicked.
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
        'giveAntiVirus'
      ]),
      antiVirusCanceled () {
        bus.$emit('hackCanceled')
      },
      discardAntiVirus () {
        if (this.getActiveCard() !== undefined) {
          this.discardSelectedCard()
          this.playerTookTurn()
          this.turn(true)
        }
      },
      useClicked () {
        let player = this.getCurrentPlayer()
        this.giveAntiVirus(player.id)

        $('.antiVirus').modal('hide')
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
          if (activeCard.type === 'ANTIVIRUS') {
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
        return player.hasAntiVirus
      }
    },
    created () {
      $('.antiVirus').modal({
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
