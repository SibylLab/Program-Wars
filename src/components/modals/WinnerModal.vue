<template>
<div>
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="border-radius: 30px">

      <div class="modal-header" style="padding-bottom: 0;">
        <button type="button" class="close" data-dismiss="modal"
            aria-label="Close" v-on:click="leaveGame">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body" style="padding-top: 0;">
        <h3 class="modal-title"><b>Game Over</b></h3>
        <div style="border: 6px ridge grey; padding: 5px; border-radius: 5px; background-color: royalblue;">
          <h5 style="color: white; font-size: 30px">{{ winner.name }} Wins!!!</h5>
        </div>
      </div>

      <div>
        <table class="table table-condensed" style="width: 70%; margin: auto">
          <thead>
            <tr style="font-size: 20px"> <th>Players</th>
              <th v-for="player in players" :key="player.id">{{ player.name }}</th>
            </tr>
          </thead>
          
          <tbody>
            <tr> <th>Instruction Score</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).baseScore }}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: left;"><h5><b>Side Objectives</b></h5></td>
            </tr>
            <tr> <th>Grouping Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Repetition Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Variable Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Safety Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Complete Program</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Defensive Programmer (All Safeties)</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Clean System (No Virus)</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th>Cool System (No Overclock)</th>
              <td v-for="player in players" :key="player.id">{{ playerObjectives(player.id).dummy }}</td>
            </tr>
            <tr> <th style="font-size: 20px;">Final Score</th>
              <td v-for="player in players" :key="player.id" style="font-size: 20px;">{{ playerScore(player.id).score }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary" data-dismiss="modal"
            v-on:click="leaveGame">
          Leave Game
        </button>
      </div>

    </div>
  </div>
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  name: 'winner-modal',
  data () {
    return {
      scores: undefined,
      winningScore: undefined,
      winner: undefined,
    }
  },
  computed: {
    ...mapState([
      'players'
    ]),
    getWinningScore () {
      return this.scores.reduce((win, score) => {
        return win.score >= score.score ? win : score
      }, {score: -1})
    },
    getWinner () {
      return this.players.find(p => p.id === this.winningScore.playerId)
    }
  },
  methods: {
    ...mapGetters([
      'getPlayerScores'
    ]),
    ...mapActions([
      'leaveGame'
    ]),
    playerScore (id) {
      return this.scores.find(scr => scr.playerId === id)
    },
    playerObjectives (id) {
      // Retrieve the objective object for the player
      // this object should just have in it accessors or fields for
      // all the things that could be tracked or computed for side objectives
      id
      return {dummy: 44}
    },
    setup () {
      // order matters
      this.scores = this.getPlayerScores()()
      this.winningScore = this.getWinningScore
      this.winner = this.getWinner
    }
  },
  created () {
    this.setup()

    bus.$on('card-played', () => {  // Change to game over when you are finished
      this.setup()
    })
  }
}
</script>


<style scoped>
th {
  text-align: left;
}

h5 {
  padding:0;
  margin: 0;
}
</style>
