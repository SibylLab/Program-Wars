<template>
  <div id="playfield" :class="playfieldClass">
    <h1>{{ title }}</h1>
    <h1>{{ trueOrFalse }}</h1>
    <ul id="example-1">
        <li v-for="stack in stacks">
            <stack :playfieldBoolean="trueFalse"></stack>
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
      stacks: [
          { id: '001', elements: [], value: 0 }
      ],
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
    }
  },
  components: {
    'stack': Stack
  },
  methods: {
    addToStack () {
      // alert('cardId of clicked card is ' + cardId)
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
  display: inline-block;
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
