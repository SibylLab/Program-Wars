<template>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapse' + player.id" aria-expanded="false" :aria-controls="'collapse'+ player.id">
          <h3>{{ playerName }}</h3>
          <h6>Active Side Score: {{ score }}</h6>
        </a>
      </h4>
    </div>
    <div :id="'collapse'+ player.id" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        <div class="well">
          <h6>True Stacks</h6>
          <ul v-if="trueStacks.length !== 0" id="example-1">
            <li v-for="stack in trueStacks">
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>
            </li>
          </ul>
          <h6 v-else>There are no stacks!</h6>

          <h6>False Stacks</h6>
          <ul v-if="falseStacks.length !== 0" id="example-2">
            <li v-for="stack in falseStacks">
              <opponent-stack :playfieldBoolean="stack.boolSide" :stackId="stack.stackId" @hackStack="hackStack" :playerId="player.id"></opponent-stack>
            </li>
          </ul>
          <h6 v-else>There are no stacks!</h6>
        </div>
      </div>
    </div>
  </div>

  <!---->
  <!--<div id="playfield" >-->
    <!--<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">-->
    <!--<a role="button" data-toggle="collapse" :href="'#collapse' + player.id" aria-expanded="false" :aria-controls="'collapse'+ player.id">-->
      <!--<h3>{{ playerName }}</h3>-->
      <!--<h6>Active Side Score: {{ score }}</h6>-->
    <!--</a>-->
    <!--<div class="collapse" :id="'collapse'+ player.id">-->
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
      hackIsActive: false,
      currentCard: this.$store.getters.getActiveCard
    }
  },
  computed: {
    playerName () {
      return this.player.name
    },
    trueStacks () {
      return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === true)
    },
    falseStacks () {
      return this.$store.getters.getStacks.filter(stack => stack.playerId === this.player.id && stack.cards.length !== 0 && stack.boolSide === false)
    },
    score() {
     return this.player.score
    }
  },

  components: {
      'opponent-stack': OpponentStack
  },

  methods: {
    hackStack(e) {
      console.log('hack attempted on stack', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playfield {
    background-color: #ddd;
    width: 100%;
}

h1, h2 {
  font-weight: normal;
}

h3, h6 {
  margin: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
  width: 100%;
}

.well {
  margin-bottom: 0px;
}

a {
  color: #42b983;
}

#playfield.dark {
  background-color: #666;
  color: #fff;
}

#playfield.light {
  background-color: #eee;
}

  .panel-body {
    padding: 0px;

  }

  .well {
    padding: 0px;
  }
</style>
