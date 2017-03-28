<template>
  <div id="playfield" :class="playfieldClass" >
    <h1>{{ title }}</h1>
    <h1>{{ trueOrFalse }}</h1>
    <h1>Total Playfield Score: {{ score }}</h1>

    <ul id="example-1">
        <li v-for="stack in stacks">
            <stack :playfieldBoolean="trueFalse" :stackId="stack.stackId" @cardAdded="cardAdded" :playerId="playerId"></stack>
        </li>
    </ul>
  </div>
</template>

<script>
import Stack from './Stack'

export default {
  name: 'Playfield',
  props: ['trueFalse', 'playerId'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Playfield',
      numberOfStacks: 1,
      test: 'default'
    }
  },
  computed: {
    trueOrFalse () {
      if (this.trueFalse) {
        return 'TRUE'
      } else {
        return 'FALSE'
      }
    },
    playfieldClass () {
      if (this.trueFalse) {
        console.log(true)
        return 'light'
      } else {
        console.log(false)
        return 'dark'
      }
    },
    stacks() {
      return this.getStackList();
    },
    score() {
        let stackList = this.getStackList()
         let score = 0;
        for (let stack of stackList) {
            score += stack.score
        }

        if (this.trueFalse === this.$store.getters.getActiveSide) {
            this.$store.commit('setPlayerScore', {id: this.playerId, score: score})
        }

        return score
    }
  },
  components: {
    'stack': Stack
  },
  methods: {
    getStackList() {
      return this.$store.getters.getStacks.filter(stack => stack.playerId === this.playerId && stack.boolSide === this.trueFalse)
    },
    addToStack () {
      // alert('cardId of clicked card is ' + cardId)
    },
    cardAdded (id) {
      console.log('trying to add a new stack ' + id)
      var emptyStackExists = false

      for (var stack of this.stacks) {
        if (stack.id === id) {
          stack.cardCount += 1

        }

      }

      for (var stack of this.stacks) {
        if (stack.cardCount === 0) {
          emptyStackExists = true
        }
      }

      if (!emptyStackExists) {
        this.numberOfStacks += 1
        this.stacks.push({ id: this.numberOfStacks, elements: [], value: 0, cardCount: 0})
      }
    },
    deselectAll () {

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
