<template>
<div>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content" style="border-radius: 30px">

      <div class="modal-body">
        <h3 class="modal-title"> <b>Game Over</b> </h3>

        <div style="border: 6px ridge grey; padding: 5px; border-radius: 5px; background-color: royalblue;">
          <h5 style="color: white; font-size: 30px"> {{ winnerText }} </h5>
        </div>
      </div>

      <div>
        <table class="table table-condensed" style="width: 90%; margin: auto">
          <thead>
            <tr style="font-size: 24px"> <th>Players</th>
              <th v-for="player in game.players" :key="player.id" style="text-align: center">
                {{ player.name }}
              </th>
            </tr>
          </thead>
          
          <tbody>
            <tr style="font-size: 24px;"> <th>Final Score</th>
              <td v-for="player in game.players" :key="player.id">
                {{ player.getScore() }}
              </td>
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
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'winner-modal-beginner',
  data () {
    return {
      winners: []
    }
  },
  computed: {
    ...mapGetters(['game']),
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
    setWinners () {
      this.winners = this.game.getWinners()
    }
  },
  created () {
    this.setWinners()
    bus.$on('game-over', this.setWinners)
  },
  beforeDestroy () {
    bus.$off('game-over', this.setWinners)
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

