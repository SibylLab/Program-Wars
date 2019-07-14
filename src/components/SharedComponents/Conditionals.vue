<template>
  <div id="condsField">
    <div class="container conditionals">
      <div class="row" v-if="groupsCond === true">
        <p> This is where the group conditional will go </p>
      </div>
      <div class="row" v-if="instCond === true">
        <p> This is where the inst conditional will go </p>
      </div>
      <div class="row" v-if="repsCond === true">
        <p> This is where the reps conditional will go </p>
      </div>
      <div class="row" v-if="varsCond === true">
        <p> This is where the vars conditional will go </p>
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
    checkNumGroups () {
      return this.getCurrentPlayer().numGroups > 3
    },
    checkNumInst () {
      return this.getCurrentPlayer().numInstructions !== 0
    },
    checkNumReps () {
      return this.getCurrentPlayer().numRepeats > 3
    },
    checkNumVars () {
      return this.getCurrentPlayer().numVariables > 2
    }
  }
}
</script>

<style scoped>
  #condsField {
    background-color: rgb(149, 204, 38);
    width: 100%;
    height: 90%;
    min-height: 100px;
  }
</style>
