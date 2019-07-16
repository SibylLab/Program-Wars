<template>
  <div id="condsField">
    <div class="container conditionals">
      <div class="row">
        <h3 style="text-align: left; margin-left: 40px; color: white"> Conditional points: { </h3>
      </div>
      <!--<div class="row" v-if="groupsCond === true">
        <h5> This is where the group conditional will go </h5>
      </div>
      <div class="row" v-if="instCond === true">
        <h5> This is where the inst conditional will go </h5>
      </div>
      <div class="row" v-if="repsCond === true">
        <h5> This is where the reps conditional will go </h5>
      </div>
      <div class="row" v-if="varsCond === true">
        <h5> This is where the vars conditional will go </h5>
      </div>-->
      <div class="row" v-for="cond in condList">
        <div class="row">
          <h5> if ( {{cond.condIf}} ) { </h5>
          <h6 :class="condTextColor(cond.condBool)"> then: {{cond.condThen}} </h6>
          <h6 :class="condTextColor(!cond.condBool)"> else: {{cond.condElse}} </h6>
          <h5> } </h5>
        </div>
      </div>
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
      condList.push(this.buildCondObj('more than 1 instruction', '+10 points', '-5 points', this.checkNumInst()))
      condList.push(this.buildCondObj('more than 3 repeats', '+10 points', '-5 points', this.checkNumReps()))
      condList.push(this.buildCondObj('more than 2 variables', '+10 points', '-5 points', this.checkNumVars()))
      condList.push(this.buildCondObj('more than 4 groups', '+10 points', '-5 points', this.checkNumGroups()))
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
    buildCondObj (condIf, condThen, condElse, condBool) {
      return {condIf: condIf, condThen: condThen, condElse: condElse, condBool: condBool}
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
    max-width: 400px;
    height: 90%;
    min-height: 100px;
    border-radius: 15px
  }

  h5 {
    text-align: left;
    margin-left: 40px;
    color: white
  }

  h6.active {
    text-align: left;
    margin-left: 80px;
    text-shadow: 0px 0px 6px green;
    color: lightgreen;
  }

  h6.notActive {
    text-align: left;
    margin-left: 80px;
    text-shadow: 0px 0px 3px maroon;
    color: lightpink;
  }
</style>
