<template>
  <div>
    <div class="modal-dialog modal-lg" role="document" data-backdrop="static" data-keyboard="false">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="batteryBackupCanceled">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Battery Backup</h3>
        </div>
        <div class="modal-body">
          <div class="container col-lg-12">
            <div class="row">
              <p>Do you want to use the Battery Backup to negate a power outage?</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-default" @click="discardBatteryBackup" data-dismiss="modal" style="float: right; margin: 5px;" :style="hideButton">Discard B/B Card</button>
          <button class="btn btn-default" @click="useClicked" :disabled="playerCanUse"><b>Use</b></button>
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;" @click="batteryBackupCanceled">Cancel</button>
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
        'giveBatteryBackup'
      ]),
      batteryBackupCanceled() {
        bus.$emit('hackCanceled');
      },
      discardBatteryBackup() {
        console.log("discard clicked")
        if (this.getActiveCard() !== undefined) {
          this.discardSelectedCard();
          this.playerTookTurn();
          this.turn(true);
        }
      },
      useClicked() {
        console.log("use clicked")
        let player = this.getCurrentPlayer();
        this.giveBatteryBackup(player.id);

        $('.batteryBackup').modal('hide');
        if(this.getTutorialState()){
          bus.$emit('cardPlayed');
          this.increaseFactIndex();
        }
        let ret = this.playerTookTurn();
        let turn = this.turn(true);
      },

    },
    computed: {
      hideButton() {
        let activeCard = this.getActiveCard();
        if(activeCard !== undefined) {
          if(activeCard.type === 'BATTERYBACKUP' && activeCard !== undefined) {
            return 'display: block';
          } else {
            return 'display: none';
          }
        } else {
          return 'display: none'
        }
      },
      playerCanUse() {
        let player = this.getCurrentPlayer();
        return !player.hasPowerOutage;
      }
    },
    created() {
      $('.batteryBackup').modal({
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
