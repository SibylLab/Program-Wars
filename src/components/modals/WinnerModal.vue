<template>
<div>
  <div class="modal-dialog modal-lg" role="document">
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
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).score }}</td>
            </tr>
            <tr>
              <td colspan="5" style="text-align: left;"><h5><b>Side Objectives</b></h5></td>
            </tr>
            <tr> <th>Repetition Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.repeat }}</td>
            </tr>
            <tr> <th>Variable Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.variable }}</td>
            </tr>
            <tr> <th>Safety Bonus</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.safety }}</td>
            </tr>
            <tr> <th>Nested Loops</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.complete }}</td>
            </tr>
            <tr> <th>Defensive Programmer</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.defensive }}</td>
            </tr>
            <tr> <th>Clean System (No Malware)</th>
              <td v-for="player in players" :key="player.id">{{ playerScore(player.id).bonuses.clean }}</td>
            </tr>
            <tr> <th style="font-size: 20px;">Final Score</th>
              <td v-for="player in players" :key="player.id" style="font-size: 20px;">{{ finalScore(player) }}</td>
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
import {mapActions, mapState} from 'vuex'

export default {
  name: 'winner-modal',
  data () {
    return {
      scores: undefined,
      winner: undefined
    }
  },
  computed: {
    ...mapState([
      'players',
      'stacks',
      'hands'
    ]),
    // does not deal with ties
    getWinner () {
      let winner = this.players[0]
      for (let player of this.players) {
        if (this.finalScore(player) > this.finalScore(winner)) {
          winner = player
        }
      }
      return winner
    }
  },
  methods: {
    ...mapActions([
      'leaveGame'
    ]),
    playerScore (id) {
      return this.scores.find(scr => scr.playerId === id)
    },
    addBonuses (player) {
      let scores = this.playerScore(player.id)
      let stacks = this.stacks.filter(s => s.playerId === player.id)
      let hand = this.hands.find(h => h.playerId === player.id)
      scores.bonuses = player.objectives.getBonuses(player, hand, stacks)
    },
    finalScore (player) {
      let score = this.playerScore(player.id)
      return score.score + score.bonuses.total
    },
    setup () {
      // order matters
      this.scores = this.$store.getters.getPlayerScores()
      for (let player of this.players) {
        this.addBonuses(player)
      }
      this.winner = this.getWinner
    }
  },
  created () {
    this.setup()

    bus.$on('game-over', () => {
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
