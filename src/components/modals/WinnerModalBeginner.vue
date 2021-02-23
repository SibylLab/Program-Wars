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
          Play Again
        </button>
      </div>

      <div class="modal-footer">
        <p><b>If you are comfortable with the concept & ready to participate in the post-game survey go-to: </b>

          <a href="https://uleth.ca1.qualtrics.com/jfe/preview/SV_56jDOuF8Tor2VrU?Q_CHL=preview&Q_SurveyVersionID=current" target="_blank">Post Game Survey</a>
      
        </p>
 
      </div>

    </div>
  </div>
</div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'
import { bus } from '@/components/shared/Bus'

/**
 * Shows the winners for the game.
 *
 * Catches the `game-over` event to update the list of winners when before it
 * is made visible.
 *
 * @vue-data {Player[]} winners - A list of all winning players.
 * @vue-computed {string} winnerText - A string of the name(s) of the winners.
 */
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
    /**
     * Updates the winners to the current winners in the game.
     */
    setWinners () {
      this.winners = this.game.getWinners()
    }
  },
  created () {
    // Set winners list and add a listener to update it when the game ends.
    this.setWinners()
    bus.$on('game-over', this.setWinners)
  },
  beforeDestroy () {
    // Remove the listener for game-over events
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

