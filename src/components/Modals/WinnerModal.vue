<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="padding-bottom: 0;"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="newGame">
          <span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body" style="padding-top: 0;" v-if="oneWinner">
          <h3 class="modal-title"><b>Congratulations {{ winner }}!!</b></h3>
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner }} is the winner with a score of {{ winnerScore }}</h5>
          </div>
          </div>
            <div class="modal-body" style="padding-top: 0;" v-else>
              <h4><b>Congratulations: </b></h4>
              <ul style="list-style-type: none; text-align: center; margin-right: 40px; margin-top: 10px;">
                <li v-for="(win, index) in winnerList"><h4 v-if="!(index === winnerList.length - 1)">{{ win }},</h4>
                <h4 v-else> and {{ win }}</h4></li>
              </ul>
              <h4 v-if="winnerList.length === 2">You both reached the winning score!</h4>
              <h4 v-if="winnerList.length > 2">You all reached the winning score!</h4>

            </div>
          <div>
            <h5><b>Scores</b></h5>
            <table class="table table-condensed" style="width: 60%; margin: auto">
              <thead>
              <tr>
                <th>Player Name</th>
                <th>True Score</th>
                <th>False Score</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="player in playerList">
                <td>{{ player.name }}</td>
                <td>{{ getScore(player.id).trueScore}}</td>
                <td>{{ getScore(player.id).falseScore}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" style="float: right" data-dismiss="modal" @click="newGame">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

  import { bus } from '../SharedComponents/Bus';

  export default {
    props: ['playerList'],
    methods: {
      newGame() {
        this.$store.commit('setPlayfieldColour', false);
        this.$router.push('/');
      },
      getScore(player){
        let trueSide = 0;
        let falseSide = 0;
        trueSide = this.$store.getters.getPlayers[player].trueScore + this.$store.getters.getPlayers[player].bonusTrue;
        falseSide = this.$store.getters.getPlayers[player].falseScore + this.$store.getters.getPlayers[player].bonusFalse;
        if(this.$store.getters.getPlayers[player].hasVirus){
          trueSide = trueSide/2;
          falseSide = falseSide/2;
        } else if(this.$store.getters.getPlayers[player].hasOverclock){
          trueSide = trueSide*2;
          falseSide = falseSide*2
        }
        return{trueScore: trueSide, falseScore: falseSide}
      },
    },
    computed: {
      winner() {
        return this.$store.state.winnerName;
      },
      winnerScore() {
        return this.$store.state.winnerScore;
      },
      oneWinner() {
        return (this.winnerList.length < 2) ;
      },
      winnerList() {
          let winList = [];
          for(let player of this.playerList) {
              if (this.$store.state.activeSide) {
                  if(this.getScore(this.$store.getters.getCurrentPlayer.id).trueScore >= this.$store.state.scoreLimit) {
                      winList.push(player.name)
                  }
              } else {
                if(this.getScore(this.$store.getters.getCurrentPlayer.id).falseScore >= this.$store.state.scoreLimit) {
                  winList.push(player.name)
                }
              }
          }
          return winList;
      }
    }
  }

</script>

<style scoped>
th {
  text-align: center;
}
  h4 {
    padding:0;
    margin: 0;
  }
</style>
