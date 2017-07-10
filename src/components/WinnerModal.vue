<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="padding-bottom: 0;"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><router-link to="/">
          <span aria-hidden="true">&times;</span></router-link></button>
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
                <li v-for="win in winnerList"><h4>{{ win }}</h4></li>
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
    props: ['playerList'],
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
                  if(player.trueScore >= this.$store.state.scoreLimit) {
                      winList.push(player.name)
                  }
              } else {
                if(player.falseScore >= this.$store.state.scoreLimit) {
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
