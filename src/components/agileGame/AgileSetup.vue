<template>
<div id="agile-setup">
  <page-header/>

  <h4 id="heading">Phase 1: Select Agile Requirements</h4>
  <h4 id="player-name">{{ players[playerNum].name.toUpperCase() }}</h4>

  <div id="req-cards">
    <img v-for="card in testCards" v-bind:key="card + Math.random()"
        :src="cardImage(card)" :class="['card-img', {active: isSelected(card)}]"
        v-on:click="selectReq(card)">
  </div>

  <div id="req-details" style="text-align: left; font-size: 20px;">
    <h3 style="margin: 5px 0px;"><b>{{ activeDetails.name }}</b></h3>
    <p>{{ activeDetails.description }}</p>
    <h5><b>Backlog</b></h5>
    <ol>
      <li>{{ activeDetails.goals[0].goal }},
          Sprint Bonus: {{ activeDetails.goals[0].sprint }},
          End Game Bonus: {{ activeDetails.goals[0].game }}</li>
      <li>{{ activeDetails.goals[1].goal }},
          Sprint Bonus: {{ activeDetails.goals[1].sprint }},
          End Game Bonus: {{ activeDetails.goals[1].game }}</li>
      <li>{{ activeDetails.goals[2].goal }},
          Sprint Bonus: {{ activeDetails.goals[2].sprint }},
          End Game Bonus: {{ activeDetails.goals[2].game }}</li>
    </ol>
  </div>

  <button id="choose" class="btn btn-primary" v-on:click="chooseReq()">Choose</button>

</div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import requirements from '@/data/requirements'
import { mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'agile-setup-page',
  data () {
    return {
      testCards: ['DRY', 'infoSec', 'whiteHat'],
      activeReq: 'DRY',
      activeDetails: 'empty',
      playerNum: 0
    }
  },
  components: {
    'page-header': PageHeader
  },
  computed: {
    ...mapState([
      'gameState',
      'players'
    ])
  },
  methods: {
    ...mapMutations([
      'addRequirement'
    ]),
    ...mapActions([
      'leaveGame',
      'finishRequirements'
    ]),
    cardImage (card) {
      // only temporary
      return 'static/cardImages/requirements/' + card + '.png'
    },
    isSelected (card) {
      return this.activeReq === card
    },
    selectReq (card) {
      this.activeReq = card
      this.activeDetails = requirements[this.activeReq]
    },
    chooseReq () {
      this.addRequirement({type: this.activeReq, player: this.players[this.playerNum]})

      if (this.playerNum === this.players.length - 1) {
        this.finishRequirements()
      } else {
        this.playerNum += 1

        if (this.players[this.playerNum].isAi) {
          this.activeReq = 'DRY'  // Make this random
          this.chooseReq()
        }
      }
    }
  },
  created () {
    this.selectReq(this.testCards[0])
  },
  mounted () {
    if (this.gameState !== 'requirements') {
      this.leaveGame()
    }
  }
}
</script>

<style scoped>
#agile-setup {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  font-family: monospace;
}

#heading {
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  z-index: 20;
  color: white;
}

#player-name {
  position: relative;
  z-index: 20;
  color: black;
}

#req-cards {
  position: absolute;
  top: 80px;
  width: 100%;
  height: 40%;
  background-color: grey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.card-img {
  display: inline-block;
  width: 180px;
  height: auto;
  margin: 25px;
}

#req-details {
  position: absolute;
  top: 50.5%;
  width: 100%;
  height: 55%;
  background-color: lightgrey;
  padding: 5px 20px;
}

#choose {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>
