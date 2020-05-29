<template>
<div id="stacks-area">
  <h3 style="margin: 0; margin-top: 2px; margin-left: 5px;">{{ player.name }}_main:</h3>
  <ul id="stack-list">
      <card-stack class="card-stack" v-for="stack in playerStacks" v-bind:key="stack.id" :stack="stack"></card-stack>
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
  background-color: #DBD6D1;
  border-radius: 10px;
  border: solid black 4px;
  overflow: auto;
  text-align: left;
}

.card-stack {
  display: inline-block;
  margin: 5px; 
}

ul {
  list-style: none;
  margin: 0;
  padding: 0 0 0 0;
  text-align: left;
}
</style>

