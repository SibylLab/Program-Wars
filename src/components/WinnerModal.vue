<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title"><b>Congratulations {{ winner.name }}!!</b></h3>
        </div>
        <div class="modal-body">
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner.name }} is the winner with a score of {{ winner.score }}</h5>
          </div>
          <div>
            <h5>Scores</h5>
            <table class="table table-condensed" style="width: 60%; margin: auto">
              <thead>
              <tr>
                <th>Player Name</th>
                <th>True Score</th>
                <th>False Score</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="player in runnerUp">
                <td>{{ player.name }}</td>
                <td>{{ player.trueScore }}</td>
                <td>{{ player.falseScore }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" style="float: right" data-dismiss="modal"><router-link to="/">Close</router-link></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from './Bus';

  export default {
    props: ['winner', 'runnerUp'],
    data() {
      return {
//        winner: '',
        winnerScore: 0,
//        runnerUp: []
      }
    }
  }
//    created() {
//      bus.$on('checkWin', () => {
//        let players = this.$store.getters.getPlayers;
//
//        for (let player of players) {
//          let score = 0;
//          if(this.$store.getters.getActiveSide) {
//            score = player.trueScore;
//          } else {
//            score = player.falseScore;
//          }
//          if (score >= this.$store.getters.getScoreLimit) {
//            $('.winner').modal('show');
//            this.winner = player.name;
//            this.winnerScore = score;
//            this.$store.commit('setWinner', true);
////            this.runnerUp = [];
//            for(let looser of players) {
//              if(looser.name != this.winner) {
//                this.runnerUp.push({name: looser.name, trueScore: looser.trueScore, falseScore : looser.falseScore});
//              }
//            }
//          }
//        }
//      })
//    }
//  }

</script>

<style scoped>
th {
  text-align: center;
}
</style>
