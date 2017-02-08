<template>
  <div id="playfield">
    <h1>{{ title }}</h1>
    <p>{{ trueOrFalse }}</p>
    <ul id="example-1">
        <li v-for="stack in stacks">
            <stack v-on:cardActive="cardActive"></stack>
        </li>
    </ul>
  </div>
</template>

<script>
import Stack from './Stack'

export default {
  name: 'Playfield',
  props: ['trueFalse'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Playfield',
      trueOrFalse: false,
      stacks: [
          { id: '001', elements: [], value: 0 }
      ],
      activeCard: {}
    }
  },
  computed: {

  },
  components: {
    'stack': Stack
  },
  methods: {
    addToStack () {
      // alert('cardId of clicked card is ' + cardId)
    },
    deselectAll () {

    },
    cardActive (card) {
      this.activeCard = card
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
