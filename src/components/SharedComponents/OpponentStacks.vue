<template>
  <div>
    <br>
    <h5><b>True Stacks: {{ player.trueScore }}</b></h5>
    <div v-if="trueStacks.length !== 0" class="stacks">
        <div class="container">
          <div class="row">
            <div class="col-md-3" v-for="stack in trueStacks" style="margin-bottom: 15px">
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id" class="opponentStacks"></opponent-stack>
            </div>
          </div>
        </div>
        </div>
    <h6 v-else>There are no stacks!</h6>
    <h5><b>False Stacks: {{ player.falseScore }}</b></h5>
    <div v-if="falseStacks.length !== 0" class="stacks">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-4" v-for="stack in falseStacks">
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id" class="opponentStacks"></opponent-stack>
          </div>
        </div>
      </div>
    </div>
    <h6 v-else>There are no stacks!</h6>
  </div>
</template>

<script>
import OpponentStack from './OpponentStack'

export default {
  name: 'opponent-stacks',
  props: ['player'],
  data () {
    return {
      title: 'Opponent Stacks',
    }
  },

  computed: {
    trueStacks () {
      return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === true)
    },
    falseStacks () {
      return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === false)
    },
    score() {
      return  {trueScore: this.player.trueScore,
              falseScore: this.player.falseScore};
    }
  },

  components: {
      'opponent-stack': OpponentStack
  },

  methods: {
    hackStack(e) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .stacks {
    width: 120px;
  }
.row {
  width: 850px;
}
  .opponentStacks {
    margin: 5px;
  }
</style>
