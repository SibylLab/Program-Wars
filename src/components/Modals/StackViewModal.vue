<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="false" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="border: none "> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Opponent Stacks</h3>
        </div>
        <div class="modal-body">
          <div class="container" style="width: 100%">
            <ul class="nav nav-tabs" style="font-size: 25px; width: 100%; align-content: center; border: none">
              <li v-for="player in players"  style="align-items: center; width: auto; border-bottom: 1px solid black; margin-right: 10px"><a data-toggle="tab" :href="'#' + player.name">{{ player.name }}</a></li>
            </ul>

            <div class="tab-content" style="text-align: left">
              <div v-for="player in players" :id="player.name" class="tab-pane fade">
                <opponent-stacks :player="player"></opponent-stacks>
              </div>
            </div>
          </div>

        </div>
        <div class="modal-footer" style="border: none">
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  /* eslint-disable no-undef */

  import OpponentStacks from '../SharedComponents/OpponentStacks.vue'
  import { bus } from '../SharedComponents/Bus.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  /**
   * This is the Modal called when the hack card is clicked.
   */
  export default {
    props: ['players'],
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
    computed: {
      hideButton () {
        let activeCard = this.getActiveCard()
        if (activeCard !== undefined) {
          if (activeCard.type === 'H') {
            return 'display: block'
          } else {
            return 'display: none'
          }
        } else {
          return 'display: none'
        }
      }
    },
    created () {
      $('.stack').modal({
        backdrop: 'false',
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
