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
          <h5>{{ winner }} is the winner with a score of {{ winnerScore }}</h5>
          <div style="width: 50%; margin: 0 auto 0 auto;">
            <ul>
              <li v-for="players in runnerUp">{{ players.name }}, score: {{ players.score }}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" style="float: right"><router-link to="/">Close</router-link></button>
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
