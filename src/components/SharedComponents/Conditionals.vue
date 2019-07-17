<template>
  <div id="condsField">
    <div class="container conditionals">
      <div class="row">
        <h3 style="text-align: left; margin-left: 20px; color: white"> Side Objectives: { </h3>
      </div>
      <ul class="row" v-for="cond in condList">
        <li>
          <h5> if ( {{cond.condIf}} ) { </h5>
          <h6 :class="condTextColor(cond.condBool)"> reward: {{cond.condThen}} </h6>
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
import { mapGetters } from 'vuex'

export default {
  name: 'conditionals-list',
  props: ['playerId'],
  data () {
    return {
      title: 'conds'
    }
  },
  computed: {
    condList () {
      let condList = []
      condList.push(this.buildCondObj('group card played', '+5 pts/card', this.checkNumInst()))
      condList.push(this.buildCondObj('repeat card played', '+2 pts/card', this.checkNumReps()))
      condList.push(this.buildCondObj('variable card played', '+3 pts/card', this.checkNumVars()))
      condList.push(this.buildCondObj('safety card played', '+5 points', false))
      condList.push(this.buildCondObj('complete program', '+10 points', false))
      condList.push(this.buildCondObj('all safety cards', '+10 points', false))
      condList.push(this.buildCondObj('no virus', '+10 points', false))
      condList.push(this.buildCondObj('no overclock', '+10 points', false))
      return condList
    },
    groupsCond () {
      return this.checkNumGroups()
    },
    instCond () {
      return this.checkNumInst()
    },
    repsCond () {
      return this.checkNumReps()
    },
    varsCond () {
      return this.checkNumVars()
    }
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayer'
    ]),
    buildCondObj (condIf, condThen, condBool) {
      return {condIf: condIf, condThen: condThen, condBool: condBool}
    },
    condTextColor (cond) {
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
    }
  }
}
</script>

<style scoped>
  #condsField {
    background-color: gray;
    width: 100%;
    /* max-width: 400px; */
    height: 90%;
    min-height: 100px;
    border-radius: 15px
  }

  h5 {
    /* text-align: left; */
    margin-left: 5px;
    color: white;
  }

   /* h6 {
    margin: 10px;
    /* margin-left: 10px;
    margin-right: 10px;  
  } */

  h6.active {
    /* display: inline; */
    /* text-align: left; */
    margin: 5px;
    text-shadow: 0px 0px 6px green;
    color: lightgreen;
  }

  h6.notActive {
    /* display: inline; */
    /* text-align: left; */
    margin: 5px;
    text-shadow: 0px 0px 3px maroon;
    color: lightpink;
  }

  h5, h6{
    display: inline;
    float: left;
    text-align: left;
    margin: 0px;
    padding: 0px;
  }
</style>
