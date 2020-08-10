<template>
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content" style="border-radius: 30px">

    <div class="modal-body">
      <h3 class="modal-title"><b>Game Over</b></h3>
      <div style="border: 6px ridge grey; padding: 5px; border-radius: 5px; background-color: royalblue;">
        <h5 style="color: white; font-size: 30px">{{ winnerText }}</h5>
      </div>
    </div>

    <div>
      <table class="table table-condensed" style="width: 90%; margin: auto">
        <thead>
          <tr style="font-size: 24px"> <th>Players</th>
            <th v-for="player in players" :key="player.id" style="text-align: center">
              {{ player.name }} </th>
          </tr>
        </thead>
        
        <tbody style="font-size: 14px;">
          <tr> <th>Score</th>
            <td v-for="player in players" :key="player.id">
              {{ player.getScore() }} </td>
          </tr>
          <tr>
            <td colspan="5" style="text-align: left;">
              <h5><b>Bonuses</b></h5> </td>
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
          <tr> <th style="font-size: 24px;">Final Score</th>
            <td v-for="player in players" :key="player.id" style="font-size: 20px;">
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
import { bus } from '@/components/shared/Bus'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'winner-modal',
  data () {
    return {
      bonuses: [],
      winners: []
    }
  },
  computed: {
    ...mapGetters(['game']),
    players () {
      return this.game.players
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
  },
  created ()  {
    this.setBonuses()
    this.setWinner()
    bus.$on('game-over', this.setWinner)
  },
  beforeDestroy () {
    bus.$off('game-over', this.setWinner)
  }
}
</script>


<style scoped>
th {
  text-align: left;
  padding: 8px;
}

td {
  padding: 8px;
}

h5 {
  padding:0;
  margin: 0;
}
</style>
