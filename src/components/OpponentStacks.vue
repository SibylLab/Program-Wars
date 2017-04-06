<template>
  <div id="playfield" >
    <h3>{{ playerName }}</h3>
    <h6>Active Side Score: {{ score }}</h6>
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

ul {
  list-style-type: none;
  padding: 0;
}

li {
  /*display: inline-block;*/
  margin: 0 10px;
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
</style>
