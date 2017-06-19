<template>

  <div>
    <br>


    <h6>True Stacks</h6>
    <div v-if="trueStacks.length !== 0" class="stacks">
      <!--<div v-for="stack in trueStacks">-->
        <div class="container">
          <div class="row">
            <div class="col-md-3" v-for="stack in trueStacks">
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id" class="opponentStacks"></opponent-stack>
            </div>
          </div>
        </div>
        <!--<opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>-->
        </div>
      <!--</div>-->
    <h6 v-else>There are no stacks!</h6>

    <h6>False Stacks</h6>
    <div v-if="falseStacks.length !== 0" class="stacks">
      <div class="container">
        <div class="row">
          <div class="col-md-3" v-for="stack in falseStacks">
            <!--<div v-for="stack in falseStacks">-->
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id" class="opponentStacks"></opponent-stack>
          </div>
        </div>
      </div>
      <!--<div v-for="stack in falseStacks">-->
        <!--<opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>-->
      <!--</div>-->
    </div>
    <h6 v-else>There are no stacks!</h6>
  </div>

  <!--<div class="panel panel-default">-->
    <!--<div class="panel-heading" role="tab" id="headingThree">-->
      <!--<h4 class="panel-title">-->
        <!--<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse' + player.id" aria-expanded="false" :aria-controls="'collapse'+ player.id">-->
          <!--<h3>{{ playerName }}</h3>-->
          <!--<h6>True Side Score: {{ score.trueScore }}</h6>-->
          <!--<h6>False Side Score: {{ score.falseScore }}</h6>-->
        <!--</a>-->
      <!--</h4>-->
    <!--</div>-->
    <!--<div :id="'collapse'+ player.id" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">-->
      <!--<div class="panel-body">-->
        <!--<div class="well">-->
          <!--<h6>True Stacks</h6>-->
          <!--<ul v-if="trueStacks.length !== 0" id="example-1">-->
            <!--<li v-for="stack in trueStacks">-->
              <!--<opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<h6 v-else>There are no stacks!</h6>-->

          <!--<h6>False Stacks</h6>-->
          <!--<ul v-if="falseStacks.length !== 0" id="example-2">-->
            <!--<li v-for="stack in falseStacks">-->
              <!--<opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<h6 v-else>There are no stacks!</h6>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
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
