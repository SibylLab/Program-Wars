<template>
  <div id="methods" :class="playfieldClass" class="container" :style="getStyle()">
    <div class="row">
      <div class="col-md-12">
        <h5 :style="playfieldTextColour()">Methods Score: {{ score }}</h5>
        <h3 style="text-align: left; margin-left: 40px" :style="playfieldTextColour()"> methods: {</h3>
      </div>
    </div>
    <div class="row">
        <div class="col-md-3 col-sm-6" @showGroup='showGroup()' v-for="group in groups">
          <group-field :playerId="playerId"></group-field>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="text-align: left; margin: 30px 0 0 50px">
        <h3 :style="playfieldTextColour()">}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Stack from './Stack'
import Group from './Group'
import {mapGetters, mapState} from 'vuex'

/**
 * This displays the methods playfield, and calculates its score
 */
export default {
  name: 'methods-field',
  props: ['trueFalse', 'playerId', 'activeColour'],
  data () {
    return {
      title: 'Methods',
      numberOfStacks: 1,
      test: 'default'
    }
  },
  computed: {
    playfieldClass () {
      if (this.activeColour) {
        return 'active'
      } else {
        return 'notActive'
      }
    },
    stacks () {
      return this.getStackList(true)
    },
    score () {
      let trueSide = 0
      trueSide = this.getCurrentPlayer().trueScore
      if (this.getCurrentPlayer().hasVirus) {
        trueSide = Math.ceil(trueSide * 0.75)
      } else if (this.getCurrentPlayer().hasOverclock) {
        trueSide = Math.ceil(trueSide * 1.25)
      }
      return trueSide
    },
    groups () {
      return []
    }
  },
  components: {
    'stack': Stack,
    'group-field': Group
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayer',
      'getStacks'
    ]),
    ...mapState([
      'trueSideColour',
      'falseSideColour',
      'pIPTextColour',
      'playfieldTextColour'
    ]),
    showGroups () {
      return []
    },
    getStackList () {
      return this.getStacks().filter(stack => stack.playerId === this.playerId && stack.boolSide === this.trueFalse)
    },
    cardAdded (id) {
      let emptyStackExists = false

      for (let stack of this.stacks) {
        if (stack.id === id) {
          stack.cardCount += 1
        }
      }

      for (let stack of this.stacks) {
        if (stack.cardCount === 0) {
          emptyStackExists = true
        }
      }

      if (!emptyStackExists) {
        this.numberOfStacks += 1
        this.stacks.push({id: this.numberOfStacks, elements: [], value: 0, cardCount: 0})
      }
    },
    getStyle () {
      return this.trueSideColour()
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#methodsField {
    background-color: #ddd;
    width: 100%;
    height: 90%;
}

h1, h2 {
  font-weight: normal;
}

h3, h5 {
  margin-top: 0;
  margin-bottom: 0;
  color: black;
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

#methodsField.active {
  background-color: rgba(0, 255, 0, 0.26);
  color: #fff;
}

#methodsField.notActive {
  background-color: rgba(242, 0, 0, 0.36);
}


</style>
