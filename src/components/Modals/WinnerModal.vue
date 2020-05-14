<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="padding-bottom: 0;"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="newGame">
          <span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body" style="padding-top: 0;" v-if="oneWinner">
          <h3 class="modal-title"><b>Congratulations {{ winner }}!!</b></h3>
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner }} is the winner with a score of {{ Math.floor(winnerScore) }}</h5>
          </div>
          </div>
            <div class="modal-body" style="padding-top: 0;" v-else>
              <h4><b>Congratulations: </b></h4>
              <ul style="list-style-type: none; text-align: center; margin-right: 40px; margin-top: 10px;">
                <li v-for="(win, index) in winnerList" v-bind:key="win">
                <h4 v-if="!(index === winnerList.length - 1)">{{ win }},</h4>
                <h4 v-else> and {{ win }}</h4></li>
              </ul>
              <h4 v-if="winnerList.length === 2">You both reached the winning score!</h4>
              <h4 v-if="winnerList.length > 2">You all reached the winning score!</h4>

            </div>
          <div>
            <h5><b>Scores</b></h5>
            <table class="table table-condensed" style="width: 70%; margin: auto">
              <thead>

              <tr>
                <th>Player Name:</th>
                <th v-for="player in playerList" v-bind:key="player.id">{{ player.name }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>Instruction Score:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{ Math.ceil(getScore(player.id).trueScore) }}</td>
              </tr>
              <tr>
                <td colspan="3"><h5><b>Side Objectives:</b></h5></td>
              </tr>
              <tr>
                <th>Grouping Bonus:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.groupingBonus}}</td>
              </tr>
              <tr>
                <th>Repetition Bonus:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.repetitionBonus}}</td>
              </tr>
              <tr>
                <th>Variable Bonus:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.variablesBonus}}</td>
              </tr>
              <tr>
                <th>Safety Bonus:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.protectionCardsBonus}}</td>
              </tr>
              <tr>
                <th>Complete Program:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.completionBonus}}</td>
              </tr>
              <tr>
                <th>Defensive Programmer <br>
                  (All Safeties):</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.defensiveBonus}}</td>
              </tr>
              <tr>
                <th>Clean System <br>
                  (No Virus):</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{player.virusBonus}}</td>
              </tr>
              <tr>
                <th>Cool System <br>
                  (No Overclock):</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{Math.ceil(player.overClockBonus)}}</td>
              </tr>
              <tr>
                <td colspan="3"><h5><b>Total Score</b></h5></td>
              </tr>
              <tr>
                <th>Total Score:</th>
                <td v-for="player in playerList" v-bind:key="player.id">{{Math.ceil(player.totalScore)}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" style="float: right" data-dismiss="modal" @click="newGame">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
export default {
  props: ['playerList'],
  methods: {
    ...mapGetters([
      'getPlayers',
      'getCurrentPlayer',
      'getScoreLimit',
      'getWinnerName',
      'getWinnerScore',
      'getActiveSide'
    ]),
    ...mapMutations([
      'setPlayfieldColour'
    ]),
    newGame () {
      this.setPlayfieldColour(false)
      this.$router.push('/')
    },
    getScore (player) {
      let trueSide = 0
      trueSide = this.getPlayers()[player].instructions
      if (this.getPlayers()[player].hasVirus) {
        trueSide = trueSide * 0.75
      } else if (this.getPlayers()[player].hasOverclock) {
        trueSide = trueSide * 1.25
      }
      return {trueScore: trueSide}
    }
  },
  computed: {
    winner () {
      return this.getWinnerName()
    },
    winnerScore () {
      return this.getWinnerScore()
    },
    oneWinner () {
      return (this.winnerList.length < 2)
    },
    winnerList () {
      let winList = []
      for (let player of this.playerList) {
        if (this.getActiveSide()) {
          if (this.getScore(this.getCurrentPlayer().id).score >= this.getScoreLimit()) {
            winList.push(player.name)
          }
        }
      }
      return winList
    }
  }
}

</script>

<style scoped>
th {
  text-align: center;
}

  h4 {
    padding:0;
    margin: 0;
  }
</style>
