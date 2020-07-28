<template>
<div id='scan-modal'>
  <div class="backdrop">

    <div class="container">
      <h3 style="margin-top: 2%;"><b>Active Scan</b></h3>

      <div class="content">
        <!--
          List all attacks, first viruses, then trojans, then effects
          each should have a button to clean it
          The buttons can call functions specific to the type if needed to
          deal with them differently
        -->
        <div v-for="mimic in attacks.mimics" v-bind:key="mimic.id" class="attack mimic">
          <img class="card" :src="mimic.card.image">
          <button v-on:click="playScan(mimic, 'mimic')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="stack in attacks.virusStacks" v-bind:key="stack.id" class="attack stack">
          <card-stack :stack="stack"/>
          <button v-on:click="playScan(stack, 'stack')" class="btn btn-success clean">
            Clean </button>
        </div>

        <div v-for="effect in attacks.effects" v-bind:key="effect.id" class="attack effect">
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
import CardStack from '@/components/game/CardStack'

export default {
  name: 'active-scan',
  props: ['cardOwner', 'card', 'attacks'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      player: this.$store.state.pageState.currentPlayer()
    }
  },
  components: {
    'card-stack': CardStack
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
  left: 20%;
  width: 60%;
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
  background: grey;
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

.card {
  display: inline;
}

.clean {
  display: inline;
}

.attack {
  display: inline;
}
</style>
