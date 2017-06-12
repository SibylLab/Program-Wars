<template>
  <div id="playfield" :class="playfieldClass">
    <h3>{{ trueOrFalse }}</h3>
    <h5>Total Playfield Score: {{ score }}</h5>

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
        return 'light'
      } else {
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
    cardAdded (id) {
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
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#playfield {
    background-color: #ddd;
    width: 100%;
    height:90%;
    overflow-y: scroll;

}

h1, h2 {
  font-weight: normal;
}

h3, h5 {
  margin-top: 0px;
  margin-bottom: 0px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}

#playfield.dark {
  background-color: #666;
  color: #fff;
}

#playfield.dark > h3, #playfield.dark > h5 {
  color: #fff;
}

#playfield.light {
  background-color: #eee;
}
</style>
