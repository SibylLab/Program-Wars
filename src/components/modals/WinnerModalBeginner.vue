<template>
<div>
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content my-content">

      <div class="modal-body">
        <h3 class="modal-title"> <b>Game Over</b> </h3>

        <div style="border: 0.5rem ridge grey; padding: 0.5rem; border-radius: 1rem; background-color: royalblue;">
          <h3 style="color: white;"> {{ winnerText }} </h3>
        </div>
      </div>

      <div>
        <table class="table table-condensed" style="width: 90%; margin: auto">
          <thead>
            <tr style="font-size: 1.4rem"> <th>Players</th>
              <th v-for="player in game.players" :key="player.id" style="text-align: center">
                {{ player.name }}
              </th>
            </tr>
          </thead>
          
          <tbody>
            <tr style="font-size: 1.6rem;"> <th>Final Score</th>
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

h3, h4 {
  padding:0;
  margin: 0;
}
</style>

