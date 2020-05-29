<template>
<div id="stacks-area">
  <ul>
    <li v-for="stack in playerStacks" v-bind:key="stack.id">
      <card-stack :stack="stack"></card-stack>
    </li>
  </ul>
</div>
</template>


<script>
import CardStack from '@/components/game/CardStack'
import {mapState} from 'vuex'

export default {
  name: 'play-field',
  props: ['player'],
  components: {
   'card-stack': CardStack
  },
  computed: {
    ...mapState([
      'stacks'
    ]),
    playerStacks () {
      return this.stacks.filter(s => s.playerId === this.player.id)
    }
  },
  methods: {
  },
}
</script>

<style scoped>
#stacks-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: green;
  border-radius: 10px;
  border: solid black 4px;
}

ul {
  list-style: none;
}

li {
  position: relative;
  display: inline-block;
  margin: 5px;
}
</style>

