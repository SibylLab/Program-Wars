<template>
<div id="agile-setup">
  <page-header/>

  <h4 id="heading">Phase 1: Select Agile Requirements</h4>

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
      <li>{{ activeDetails.objectives[0].goal }},
          Final Bonus: {{ activeDetails.objectives[0].points }},
          Sprint Bonus: {{ activeDetails.objectives[0].bonus }}</li>
      <li>{{ activeDetails.objectives[1].goal }},
          Final Bonus: {{ activeDetails.objectives[1].points }},
          Sprint Bonus: {{ activeDetails.objectives[1].bonus }}</li>
      <li>{{ activeDetails.objectives[2].goal }},
          Final Bonus: {{ activeDetails.objectives[2].points }},
          Sprint Bonus: {{ activeDetails.objectives[2].bonus }}</li>
    </ol>
  </div>

  <button id="next-phase" class="btn btn-primary">Next Phase</button>

</div>
</template>

<script>
import PageHeader from '@/components/shared/PageHeader'
import requirements from '@/data/requirements'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'agile-setup-page',
  data () {
    return {
      testCards: ['group', 'repeat', 'instruction','group', 'repeat', 'instruction', 'variable', 'group', 'repeat', 'instruction','group', 'repeat', 'instruction', 'variable'],
      activeReq: 'group',
      activeDetails: 'empty'
    }
  },
  components: {
    'page-header': PageHeader
  },
  computed: {
    ...mapState([
      'gameState',
    ])
  },
  methods: {
    ...mapActions([
      'leaveGame',
    ]),
    cardImage (card) {
      // only temporary
      return 'static/cardImages/' + card + '3.png'
    },
    isSelected (card) {
      return this.activeReq === card
    },
    selectReq (card) {
      this.activeReq = card
      this.activeDetails = requirements.details[this.activeReq]
    }
  },
  created () {
    this.selectReq('group')
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

#req-cards {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 40%;
  background-color: grey;
  overflow-x: scroll;
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
  top: 45%;
  width: 100%;
  height: 40%;
  background-color: lightgrey;
  padding: 5px 20px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>
