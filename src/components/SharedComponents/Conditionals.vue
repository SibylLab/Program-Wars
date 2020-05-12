<template>
  <div id="condsField" style="position: relative">
    <modal :modalId="infoModalId()" :modalTitle="modalTitle" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {;}" data-backdrop="static" data-keyboard="false"></modal>
    <input type="image" src="static/miscIcons/info.png"
         style="position: absolute; right: 8px; top: 8px; width: 15px; height: 15px;"
         v-if="getTips().tutorial"
         v-bind:title="infoTooltip"
         v-on:click="showInfoModal">
    <div class="container conditionals">
      <div class="row">
        <h3 style="text-align: left; margin-left: 20px; color: white"> Side Objectives: { </h3><br>
      </div>
      <ul class="row" v-for="cond in condList" v-bind:key="cond.condId">
        <li>
          <h5> if ( {{cond.condIf}} ) { </h5>
          <h6 :class="sortConds(cond)"> reward: {{cond.condThen}} </h6>
          <h5> } </h5>
          <br>
        </li>
      </ul>
      <div class="row">
        <h3 style="text-align: left; margin-left: 40px; color: white"> } </h3>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../Modals/Modal'
import { mapGetters } from 'vuex'

export default {
  name: 'conditionals-list',
  props: ['playerId'],
  data () {
    return {
      title: 'conds',
      infoTooltip: 'Conditions for bonus points added after game. Click for more info.',
      modalTitle: '',
      modalText: '',
      modalCards: []
    }
  },
  components: {
    'modal': Modal
  },
  computed: {
    condList () {
      let condList = []
      condList.push(this.buildCondObj('group card played', '+5 pts/card', 'group'))
      condList.push(this.buildCondObj('repeat card played', '+2 pts/card', 'reps'))
      condList.push(this.buildCondObj('variable card played', '+3 pts/card', 'vars'))
      condList.push(this.buildCondObj('safety card played', '+5 pts/card', 'safe'))
      condList.push(this.buildCondObj('complete program', '+10 points', 'done'))
      condList.push(this.buildCondObj('all safety cards', '+15 points', 'allSC'))
      condList.push(this.buildCondObj('no virus', '+10 points', 'noV'))
      condList.push(this.buildCondObj('no overclock', '+10 points', 'noOC'))
      return condList
    }
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayer',
      'getScoreLimit',
      'getFirstRound',
      'getTips'
    ]),
    buildCondObj (condIf, condThen, condId) {
      return {condIf: condIf, condThen: condThen, condId: condId}
    },
    // leaving these here for now cause over although there original purpose is now performed by sortConds()
    // I think I'll be able to use them as I refine this component a little more
    /* condTextColor (cond) {
      return cond !== undefined && cond === true ? 'active' : 'notActive'
    },
    checkNumGroups () {
      return this.getCurrentPlayer().numGroups >= 3
    },
    checkNumInst () {
      return this.getCurrentPlayer().numInstructions !== 0
    },
    checkNumReps () {
      return this.getCurrentPlayer().numRepeats >= 3
    },
    checkNumVars () {
      return this.getCurrentPlayer().numVariables >= 2
    }, */
    sortConds (cond) {
      let msg = ''
      let ft = 'flashText'
      let fr = this.getFirstRound()

      switch (cond.condId) {
        case 'group':
        case 'reps':
        case 'vars':
        case 'safe':
          msg = 'active'
          break
        case 'done':
          if (this.getCurrentPlayer().totalScore >= this.getScoreLimit()) {
            msg = ft
          } else {
            msg = 'notActive'
          }
          break
        case 'allSC':
          if (this.getCurrentPlayer().hasGenerator === true && this.getCurrentPlayer().hasAntiVirus === true && this.getCurrentPlayer().hasFirewall === true) {
            msg = ft
          } else {
            msg = 'notActive'
          }
          break
        case 'noV':
          if (this.getCurrentPlayer().hasVirus === true) {
            msg = 'notActive'
          } else {
            fr === true ? msg = ft : msg = 'active'
          }
          break
        case 'noOC':
          if (this.getCurrentPlayer().hasHadOverclock === true) {
            msg = 'notActive'
          } else {
            fr === true ? msg = ft : msg = 'active'
          }
          break
      }
      return msg
    },
    infoModalId () {
      return 'conditionals-infoModal'
    },
    showInfoModal () {
      this.modalTitle = 'Conditionals Area Information'
      this.modalText = 'The Conditionals Area keeps track of a player\'s progress toward various side objectives. The points gained for completing these objectives are added to a players score when the game is over.\n\nThe first few objectives are card based objectives that give bonus points for every card of a specific type that is played. For example, at the end of the game a player will recieve 2 bonus points for each repeat card in their stacks.\n\nThe other objectives track conditions that have been met during the round. The color of the condition body will be green if the condition is met and red if the condition is not met. For example, if a player is under the effects of all saftey cards the \'all saftey cards\' bonus will be met. However, the player will only get the 15 bonus points if they still have all saftey cards when the round ends.\n\nMore information on Conditions and Scoring can be found in the menu under Rules.'
      this.modalCards = []
      this.infoText = 'it has changed'
      $('#' + this.infoModalId()).modal('show')
    }
  }
}
</script>

<style scoped>
  #condsField {
    background-color: gray;
    width: 100%;
    max-width: 500px;
    height: 90%;
    min-height: 100px;
    border-radius: 15px
  }

  h5 {
    margin-left: 5px;
    color: white;
  }

  h6.active {
    margin: 5px;
    text-shadow: 0px 0px 6px green;
    color: lightgreen;
    -webkit-animation: fade-between 1.7s 1 reverse;
    -moz-animation: fade-between 1.7s 1 reverse;
    -ms-animation: fade-between 1.7s 1 reverse;
    animation: fade-between 1.7s 1 reverse;
  }

  h6.notActive {
    margin: 5px;
    text-shadow: 0px 0px 3px maroon;
    color: lightpink;
    -webkit-animation: fade-between 1.7s 1 normal;
    -moz-animation: fade-between 1.7s 1 normal;
    -ms-animation: fade-between 1.7s 1 normal;
    animation: fade-between 1.7s 1 normal;
  }

  h5, h6{
    display: inline;
    float: left;
    text-align: left;
    margin: 0px;
    padding: 0px;
  }

  .flashText {
    color: lightgreen;
    text-shadow: 0px 0px 6px green;
    margin: 5px;
    -webkit-animation: shadow-glow 0.3s 6 alternate;
    -moz-animation: shadow-glow 0.3s 6 alternate;
    -ms-animation: shadow-glow 0.3s 6 alternate;
    animation: shadow-glow 0.3s 6 alternate;
  }

  @keyframes shadow-glow {
    from {
      color: lightgreen;
      margin: 5px;
      text-shadow: 0px 0px 6px green;
    }
    to {
      color: green;
      margin: 5px;
      text-shadow: 0px 0px 15px green;
    }
  }

  @keyframes fade-between {
    from {
      color: lightgreen;
      margin: 5px;
      text-shadow: 0px 0px 6px green;
    }
    to {
      color: lightpink;
      margin: 5px;
      text-shadow: 0px 0px 3px maroon;
    }
  }
  
</style>
