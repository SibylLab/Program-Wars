<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          <h3 class="modal-title"><b>Congratulations {{ winner }}!!</b></h3>
        </div>
        <div class="modal-body">
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner }} is the winner with a score of {{ winnerScore }}</h5>
          </div>
          <div>
            <ul style="list-style-type: none; padding: 10px; margin: 0 15px 0 15px;">
              <li v-for="players in runnerUp">{{ players.name }} ({{ players.score }})</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" style="float: right"><router-link to="/">Close</router-link></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from './Bus';

  export default {
    data() {
      return {
        winner: '',
        winnerScore:0,
        runnerUp: []
      }
    },
    created() {
      bus.$on('checkWin', () => {
        let players = this.$store.getters.getPlayers;

        for (let player of players) {
          if (player.score >= this.$store.getters.getScoreLimit) {
            $('.winner').modal('show');
            this.winner = player.name;
            this.winnerScore = player.score;
            this.$store.commit('setWinner', true);
            for(let looser of players) {
              if(looser.name != this.winner) {
                this.runnerUp.push({name: looser.name, score: looser.score});
              }
            }
          }
        }
      })
    }
  }

</script>

<style scoped>

</style>
