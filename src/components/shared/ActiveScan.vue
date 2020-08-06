<template>
<div id='active-scan'>
  <div class="backdrop">

    <div class="container">
      <h3 style="margin-top: 2%;"> <b>Active Scan</b> </h3>

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

        <div v-for="effect in attacksEffects" v-bind:key="effect.id" class="attack">
          <img class="card" :src="effect.image">
          <button v-on:click="playScan(effect, 'effect')" class="btn btn-success clean">
            Clean </button>
        </div>
      </div>
    </div>

  </div>
</div>
</template>


<script>
import CardStack from '@/components/stackArea/CardStack'
import { mapGetters } from 'vuex'

export default {
  name: 'active-scan',
  props: ['cardOwner', 'card', 'attacks'],
  components: {
    'card-stack': CardStack
  },
  computed: {
    ...mapGetters(['game']),
    trojanImage () {
      return 'static/cardImages/effects/TROJAN.png'
    },
    attacksEffects () {
      return this.attacks.effects.filter(e => e.image)
    }
  },
  methods: {
    playScan (target, type) {
      this.game.takeTurn({
        type: "playScan", player: this.game.currentPlayer(),
        card: this.card, cardOwner: this.cardOwner,
        target: target, targetType: type
      })
    },
    discardScan () {
      this.game.takeTurn({
        type: 'discardCard', card: this.card, cardOwner: this.cardOwner,
        player: this.game.currentPlayer()
      })
    }
  }
}
</script>

<style scoped>
#active-scan {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container {
  position: absolute;
  top: 10%;
  left: 35%;
  width: 30%;
  height: 70%;
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
  height: 88%;
  overflow: auto;
  text-align: left;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.4);
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
