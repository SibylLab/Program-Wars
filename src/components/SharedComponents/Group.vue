<template>
  <div id="group" class="container" :style="getStyle()">
    <div class="row">
      <div class="col-md-4">
        <h6 :style="playfieldTextColour()"><b>Group Score: </b>{{score}}</h6>
        <h6 style="text-align: left; margin-left: 40px" :style="playfieldTextColour()"> group() {</h6>
      </div>
    </div>
    <div class="row">
        <div class="stacks col-lg-3 col-md-4 col-sm-6" v-for="stack in stacks">
          <stack :fieldName="title" :playfieldBoolean="false" :stackId="stack.stackId" @cardAdded="cardAdded" :playerId="playerId"></stack>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12" style="text-align: left; margin: 30px 0 0 50px">
        <h6 :style="playfieldTextColour()">}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import Stack from './Stack'
import {mapGetters, mapState} from 'vuex'

/**
 * This display each group within the methods field and calculates its score
 */
export default {
  name: 'group-field',
  props: ['groupId', 'stacks', 'playerId'],
  data () {
    return {
      title: 'Group',
      groupedStacks: []
    }
  },
  computed: {
    score () {
      let groupScore = 0
      for (let stack in groupedStacks) {
        groupScore = groupScore += stack.score
      }
      return groupScore
    },
    getStyle () {
      return this.falseSideColour()
    }
  },
  components: {
    'stack': Stack
  },
  methods: {
    ...mapGetters([
      'getSelectedStacks',
      'getCurrentPlayer',
      'getStacks'
    ]),
    ...mapState([
      'trueSideColour',
      'falseSideColour',
      'pIPTextColour',
      'playfieldTextColour'
    ]),
    getStackList () {
      return this.getStacks().filter(stack => stack.playerId === this.playerId && stack.boolSide === this.trueFalse)
    }
  }
}
</script>

<style scoped>
  #groupField {
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

  #groupField.active {
    background-color: rgba(0, 255, 0, 0.26);
    color: #fff;
  }

  #groupField.notActive {
    background-color: rgba(242, 0, 0, 0.36);
  }
</style>
