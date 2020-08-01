<template>
<div id='scan-modal'>
  <div class="backdrop">

    <div class="container">
      <h3 style="margin-top: 2%;"><b>Active Scan</b></h3>

      <div class="content">
        <div v-for="mimic in attacks.mimics" v-bind:key="mimic.id" class="attack">
          <img class="card" :src="mimic.card.image">
          <img class="icon" :src="trojanImage">
          <button v-on:click="playScan(mimic, 'mimic')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="stack in attacks.virusStacks" v-bind:key="stack.id" class="attack">
          <div class="card-stack">
            <card-stack :stack="stack"/>
          </div>
          <button v-on:click="playScan(stack, 'stack')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="effect in attacks.effects" v-bind:key="effect.id" class="attack">
          <img class="card" :src="effect.card.image">
          <button v-on:click="playScan(effect, 'effect')" class="btn btn-success clean">
            Clean </button>
        </div>
      </div>

      <button class="btn btn-primary my-btn" v-on:click="discardScan">
        Discard Scan
      </button>
    </div>


  </div>
</div>
</template>


<script>
import CardStack from '@/components/stack/CardStack'

export default {
  name: 'active-scan',
  props: ['cardOwner', 'card', 'attacks'],
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'card-stack': CardStack
  },
  computed: {
    player () { return this.pageState.currentPlayer() },
    trojanImage () { return 'static/cardImages/effects/TROJAN.png' }
  },
  methods: {
    playScan (target, type) {
      this.pageState.takeTurn({
        type: "playScan", player: this.player,
        card: this.card, cardOwner: this.cardOwner,
        target: target, targetType: type
      })
    },
    discardScan () {
      this.pageState.takeTurn({
        type: 'discardCard', card: this.card, cardOwner: this.cardOwner,
        player: this.player
      })
    }
  }
}
</script>

<style scoped>
#scan-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container {
  position: absolute;
  top: 10%;
  left: 30%;
  width: 30%;
  height: 80%;
  border: ridge grey 4px;
  border-radius: 20px;
  background-color: white;
  z-index: 1000;
}

.content {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  height: 80%;
  overflow: auto;
  text-align: left;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.4);
}

.my-btn {
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.card-stack {
  position: relative;
  display: inline-block;
  margin-left: 5px;
}

.card {
  display: inline;
  width: 22%;
  margin: 0 5%;
}

.clean {
  position: absolute;
  top: 35%;
  right: 5%;
}

.attack {
  position: relative;
  margin: 5% 0;
}

.icon {
  position: absolute;
  top: 35%;
  left: 22%;
  width: 10%;
}
</style>
