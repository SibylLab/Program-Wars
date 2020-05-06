<template>
  <div id="playfield" :class="playfieldClass" class="container" :style="getStyle()">
    <modal :modalId="infoModalId()" :modalTitle="modalTitle" :modalBody="modalText" :modalCards="modalCards" :modalCallback="() => {;}" data-backdrop="static" data-keyboard="false"></modal>
    <div class="row">
      <div class="col-md-12">
        <img src="/static/miscIcons/info.png"
             style="float: right; margin-right: 2px; margin-top: 2px; width: 15px; height: 15px;"
             v-bind:title="infoText"
             v-on:click="showInfo">
        <h5 :style="playfieldTextColour()">Score: {{ score.trueScore }}</h5>
        <h3 style="text-align: left; margin-left: 40px" :style="playfieldTextColour()">playerStacks() {</h3>
      </div>
    </div>
    <div class="row">
        <div class="stacks col-lg-3 col-md-4 col-sm-6" v-for="stack in stacks">
          <stack :playfieldBoolean="trueFalse" :stackId="stack.stackId" @cardAdded="cardAdded" :playerId="playerId"></stack>
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
import Modal from '../Modals/Modal'
import {mapGetters, mapState} from 'vuex'

/**
 * This displays the true/false playfields with the players stacks and playfield score.
 */
export default {
  name: 'Playfield',
  props: ['trueFalse', 'playerId', 'activeColour'],
  data () {
    return {
      title: 'Playfield',
      numberOfStacks: 1,
      test: 'default',
      infoText: 'some information about the playing field',
      modalTitle: '',
      modalText: '',
      modalCards: []
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
    stacks () {
      return this.getStackList(this.trueFalse)
    },
    score () {
      let trueSide = 0
      trueSide = this.getCurrentPlayer().instructions
      if (this.getCurrentPlayer().hasVirus) {
        trueSide = Math.ceil(trueSide * 0.75)
      } else if (this.getCurrentPlayer().hasOverclock) {
        trueSide = Math.ceil(trueSide * 1.25)
      }
      return {trueScore: trueSide}
    }
  },
  components: {
    'stack': Stack,
    'modal': Modal
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
      if (this.trueFalse) {
        return this.trueSideColour()
      } else {
        return this.falseSideColour()
      }
    },
    infoModalId () {
      return 'play-field-InfoModal'
    },
    showInfo () {
      this.modalTitle = 'Play Field Information'
      this.modalText = 'Some information about the play field'
      this.modalCards = []
      $('#' + this.infoModalId()).modal('show')
    }
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

#playfield.active {
  background-color: rgba(0, 255, 0, 0.26);
  color: #fff;
}

#playfield.notActive {
  background-color: rgba(242, 0, 0, 0.36);
}


</style>
