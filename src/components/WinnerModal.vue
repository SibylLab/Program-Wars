<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><router-link to="/">
          <span aria-hidden="true">&times;</span></router-link></button>
          <h3 class="modal-title"><b>Congratulations {{ winner }}!!</b></h3>
        </div>
        <div class="modal-body">
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner }} is the winner with a score of {{ winnerScore }}</h5>
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
      }
    }
  }

</script>

<style scoped>
th {
  text-align: center;
}
</style>
