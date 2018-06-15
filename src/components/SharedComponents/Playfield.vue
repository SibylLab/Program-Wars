<template>
  <div id="playfield" :class="playfieldClass" class="container">
    <div class="row">
      <div class="col-md-12">
        <h5>Total Playfield Score: {{ trueFalse ? score.trueScore : score.falseScore }}</h5></br>
        <h3 style="text-align: left; margin-left: 40px">if ({{ trueOrFalse }} Path Selected) {</h3>
      </div>
    </div>
    <div class="row">
        <div class="stacks col-lg-3 col-md-4 col-sm-6" v-for="stack in stacks">
          <stack :playfieldBoolean="trueFalse" :stackId="stack.stackId" @cardAdded="cardAdded" :playerId="playerId"></stack>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="text-align: left; margin: 30px 0 0 50px">
        <h3>}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Stack from './Stack'
import {mapGetters} from 'vuex'

export default {
  name: 'Playfield',
  props: ['trueFalse', 'playerId', 'activeColour'],
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
        return 'True'
      } else {
        return 'False'
      }
    },
    playfieldClass () {
      if (this.activeColour) {
        return 'active'
      } else {
        return 'notActive'
      }
    },
    stacks() {
      return this.getStackList(this.trueFalse);
    },
    score() {
      let trueSide = 0;
      let falseSide = 0;
      trueSide = this.getCurrentPlayer().trueScore;
      falseSide = this.getCurrentPlayer().falseScore;
      if(this.getCurrentPlayer().hasVirus){
        trueSide = trueSide/2;
        falseSide = falseSide/2;
      } else if(this.getCurrentPlayer().hasOverclock){
        trueSide = trueSide*2;
        falseSide = falseSide*2
      }
      return {trueScore: trueSide,
              falseScore: falseSide};
    }
  },
  components: {
    'stack': Stack
  },
  methods: {
    ...mapGetters([
      'getCurrentPlayer',
      'getStacks'
    ]),
    getStackList() {
      return this.getStacks().filter(stack => stack.playerId === this.playerId && stack.boolSide === this.trueFalse)
    },
    cardAdded (id) {
      let emptyStackExists = false;

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
        this.numberOfStacks += 1;
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
    height: 90%;
}

h1, h2 {
  font-weight: normal;
}

h3, h5 {
  margin-top: 0px;
  margin-bottom: 0px;
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

#playfield.active {
  background-color: rgba(0, 255, 0, 0.26);
  color: #fff;
}

#playfield.notActive {
  background-color: rgba(242, 0, 0, 0.36);
}


</style>
