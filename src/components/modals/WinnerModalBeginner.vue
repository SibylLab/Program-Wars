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
        <table class="table table-condensed" style="width: 90%; margin: auto">
          <thead>
            <tr style="font-size: 20px"> <th>Players</th>
              <th v-for="player in pageState.players" :key="player.id" style="text-align: center">
                {{ player.name }}
              </th>
            </tr>
          </thead>
          
          <tbody>
            <tr> <th>Final Score</th>
              <td v-for="player in pageState.players" :key="player.id">
                {{ player.getFinalScore() }}
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
import {mapActions} from 'vuex'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'winner-modal-begginer',
  data () {
    return {
      pageState: this.$store.state.pageState,
      winner: undefined
    }
  },
  methods: {
    ...mapActions([
      'leaveGame'
    ]),
    setWinner () {
      this.winner = this.pageState.players[0]
      for (const player of this.pageState.players) {
        if (player.getFinalScore() > this.winner.getFinalScore()) {
          this.winner = player
        }
      }
    }
  },
  created () {
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
}

h5 {
  padding:0;
  margin: 0;
}
</style>

