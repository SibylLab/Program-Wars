<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="virusCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Opponents to Infect</h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <div v-for="player in players" :id="player.id" class="col-lg-4" style="-webkit-align-items: center">
                <button class="btn btn-primary" @click="playerClicked(player.id)" :disabled="player.hasAntiVirus || player.hasVirus">Infect <b>{{player.name}}</b></button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardVirus" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard Virus Card</button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="virusCanceled">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import { bus } from '../../SharedComponents/Bus.vue'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
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
        'giveVirus'
      ]),
      virusCanceled() {
        bus.$emit('hackCanceled');
      },
      discardVirus() {
        if (this.getActiveCard() !== undefined) {
          this.discardSelectedCard();
          this.playerTookTurn();
          this.turn(true);
        }
      },
      playerClicked(player) {
        this.giveVirus(player);
        $('.virus').modal('hide');
        if(this.getTutorialState()){
          bus.$emit('cardPlayed');
          this.increaseFactIndex();
        }
        let ret = this.playerTookTurn();
        this.turn(true);
      }
    },
    computed: {
      hideButton() {
        let activeCard = this.getActiveCard();
        if(activeCard !== undefined) {
          if(activeCard.type === 'VIRUS' && activeCard !== undefined) {
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
      $('.virus').modal({
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
