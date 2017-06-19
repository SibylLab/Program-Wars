<template>
  <div>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title">Programming Wars Rules</h3>
        </div>
        <div class="modal-body">
          <div class="container">
            <ul class="nav nav-tabs">
              <!--<li class="active"><a data-toggle="tab" href="#home">Home</a></li>-->
              <li v-for="player in playerList" :class="isActive"><a data-toggle="tab" :href="'#' + player.name">{{ player.name }}</a></li>
            </ul>

            <div class="tab-content" style="text-align: left">
              <!--<div id="home" class="tab-pane fade in active">-->
              <!--</div>-->

              <div v-for="player in playerList" :id="player.name" class="tab-pane fade">
                <h5>True Score: {{ player.trueScore }} ~ False Score: {{ player.falseScore }}</h5>
                <hr>
                <p>True Stacks</p>
                <div v-if="trueStacks.length !== 0" id="example-1">
                  <div v-for="stack in trueStacks" class="stacks">
                    <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>
                  </div>
                </div>
                <h6 v-else>There are no stacks!</h6>
                <h6>False Stacks</h6>
                <div v-if="falseStacks.length !== 0" id="example-2">
                  <div v-for="stack in falseStacks" class="stacks">
                    <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>
                  </div>
                </div>
                <h6 v-else>There are no stacks!</h6>
              </div>

            </div>
          </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" style="margin: 5px;">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

  import OpponentStack from './OpponentStack'

  export default {
  props: ['player'],
    data() {
      return {
        playerList: []
      }
    },
    components: {
      'opponent-stack': OpponentStack
    },
    created() {
//        this.playerList = this.$store.getters.getCurrentOpponents;
      this.playerList = this.$store.getters.getPlayers;
//      let players = this.$store.getters.getPlayers;
//      let currentPlayer = this.$store.getters.getCurrentPlayerId;
//      for(let player of players) {
//        if(player.id !== currentPlayer) {
//          this.playerList.push(player);
//        }
//      }
    },
    computed: {
      isActive() {
        for(let player of this.playerList){
          if(player.id === 0) {
            console.log(player.id)
            return '';
          } else {
            return '';
          }
        }
      },
      trueStacks () {
        return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === true)
      },
      falseStacks () {
        return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === false)
      }
    },

    methods: {
      hackStack(e) {
      }
    }
  }

</script>

<style scoped>
.stacks {
  width: 120px;
  border: 1px solid black;
}
</style>
