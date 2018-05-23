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
                <button class="btn btn-primary" @click="playerClicked(player.id)" v-if="!player.hasAntiVirus">Infect <b>{{player.name}}</b></button>
              </div>
            </div>

            <!--<ul class="nav nav-tabs" style="font-size: 25px">-->
              <!--<li v-for="player in players"><a data-toggle="tab" :href="'#' + player.id">{{ player.name }}</a></li>-->
            <!--</ul>-->

            <!--<div class="tab-content" style="text-align: left">-->
              <!--<div role="tabpanel" class="tab-pane" id="1">a</div>-->
              <!--<div v-for="player in players" :id="player.id" class="tab-pane active">-->
                <!--<br>-->
                <!--<button class="btn btn-primary">Infect {{player.id}}</button>-->
              <!--</div>-->
            <!--</div>-->
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

  import { bus } from './Bus.vue'
  import OpponentStacks from './OpponentStacks.vue'

  export default {
    props: ['players'],
    components: {
      'opponent-stacks': OpponentStacks
    },

    methods: {
      virusCanceled() {
        bus.$emit('hackCanceled');
      },
      discardVirus() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.commit('discardSelectedCard');
          this.$store.dispatch('playerTookTurn');
          this.$store.dispatch('turn', true);
        }
      },
      playerClicked(player) {
        //console.log("Im in playerClicked " + player);
        this.$store.commit('giveVirus', player);
        //console.log("Active Card " + this.$store.getActiveCard)
        $('.virus').modal('hide');
        let ret = this.$store.dispatch('playerTookTurn');
        this.$store.dispatch('turn', true);
      }
    },
    computed: {
      hideButton() {
        let activeCard = this.$store.getters.getActiveCard;
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
