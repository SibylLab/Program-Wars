<template>
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content my-content">

    <div class="modal-body">
      <h3 class="modal-title"><b>Game Over</b></h3>
      <div style="border: 0.5rem ridge grey; padding: 0.5rem; border-radius: 1rem; background-color: royalblue;">
        <h3 style="color: white;">{{ winnerText }}</h3>
      </div>
    </div>

    <div>
      <table class="table table-condensed" style="width: 90%; margin: auto">
        <thead>
          <tr style="font-size: 1.4rem"> <th>Players</th>
            <th v-for="player in getPlayers" :key="player.id" style="text-align: center">
              {{ player.name }} </th>
          </tr>
        </thead>
        
        <tbody style="font-size: 0.9rem;">
          <tr> <th>Score</th>
            <td v-for="player in players" :key="player.id">
              {{ player.getScore() }} </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;">
              <h4><b>Bonuses</b></h4> </td>
          </tr>
          <tr> <th>Repetition Bonus</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].repeat }} </td>
          </tr>
          <tr> <th>Variable Bonus</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].variable }} </td>
          </tr>
          <tr> <th>Safety Bonus</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].safety }} </td>
          </tr>
          <tr> <th>Nested Loops</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].nested }} </td>
          </tr>
          <tr> <th>Defensive Programmer</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].defensive }} </td>
          </tr>
          <tr> <th>Clean System</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].clean }} </td>
          </tr>
          <tr> <th>Full Method</th>
            <td v-for="player in players" :key="player.id">
              {{ bonuses[player.id].method }} </td>
          </tr>
          <tr style="font-size: 1.5rem;"> <th>Final Score</th>
            <td v-for="player in players" :key="player.id">
              {{ player.getScore() + bonuses[player.id].total }} </td>
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
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'winner-modal',
  data () {
    return {
      bonuses: [],
      winners: [],
    }
  },
  computed: {
    ...mapGetters(['game']),
    players () {
      return this.game.players
    },
    // called only once to ensure that setWinner is called when modal is
    // displayed.
    getPlayers () {
      this.setWinner()
      return this.players
    },
    winnerText () {
      if (this.winners.length === 1) {
        return this.winners[0].name + ' Wins!!!'
      } else {
        return this.winners.map(w => w.name).join(' and ') + ' Tied!'
      }
    }
  },
  methods: {
    ...mapActions([
      'leaveGame'
    ]),
    setWinner () {
      this.setBonuses()
      this.winners = this.game.getWinners()
    },
    setBonuses () {
      this.bonuses = this.game.getBonuses()
    }
  }
}
</script>


<style scoped>
.my-content {
  position: fixed;
  width: 70%;
  height: auto;
  top: 5%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2rem;
}

th {
  text-align: left;
}

td, th {
  padding: 0.4rem;
}

h4, h3 {
  padding:0;
  margin: 0;
}
</style>
