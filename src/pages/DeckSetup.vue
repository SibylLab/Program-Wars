<template>
<div id="deck-setup">
  <page-header/>

  <h4 class="title centered">Phase 2: Adjust Deck Setup</h4>

  <div id="setup-content" class="centered">
    <h4 id="phase-info" class="centered">
      <div class="name">{{ pageState.currentPlayer().name.toUpperCase() }}</div>
      Add More Cards To Your Deck
    </h4>

    <div id="base-cards" class="my-border">
      <h4 style="color: black">Base Cards</h4>
      <div class="deck-list">
        <div v-for="{type, val, amt} in pageState.baseCardTypes()" v-bind:key="type + val"
            class="card-type">
          <img v-for="i in Array(amt).keys()" v-bind:key="i"
              :src="cardImage(type, val)" class="card-sm" ondragstart="return false;">
        </div>
      </div>
    </div>

    <div id="card-selection">
      <optional-card-selection/>
    </div>


    <button id="finalize" class="btn btn-success centered" v-on:click="next()">
      Finalize Deck </button>
  </div>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import OptionalCardSelection from '@/components/setup/OptionalCardSelection'
import { mapActions } from 'vuex'

export default {
  name: 'deck-setup-page',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  },
  components: {
    'page-header': PageHeader,
    'optional-card-selection': OptionalCardSelection
  },
  computed: {
    pickedColor () {
      return this.pageState.optionalCards.length === 10 ? 'green' : 'red'
    }
  },
  methods: {
    ...mapActions([
      'startAgileGame'
    ]),
    cardImage (type, val) {
      return 'static/cardImages/' + type.toLowerCase() + val + '.png'
    },
    next () {
      if (this.pageState.optionalCards.length < 10) { return }

      if (this.pageState.nextPlayer() === undefined) {
        this.startAgileGame({players: this.pageState.players})
      }
    }
  }
}
</script>


<style scoped>
#deck-setup {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1350px;
  min-height: 760px;
  background-image: linear-gradient(to bottom right, purple, darkblue);
}

#setup-content {
  position: absolute;
  top: 60px;
  width: 90%;
  height: 89%;
  border-radius: 20px;
  background-color: white;
}

#phase-info {
  position: absolute;
  top: 0px;
  color: black;
}

#base-cards {
  position: absolute;
  left: 1%;
  top: 8%;
  width: 23%;
  height: 80%;
}

#card-selection {
  position: absolute;
  top: 8%;
  left: 25%;
  width: 74%;
  height: 80%;
}

#finalize {
  position: absolute;
  bottom: 2%;
}

.card-type {
  display: block;
  text-align: left;
  margin: 20px;
}

.card-sm {
  display: inline-block;
  width: 80px;
  height: auto;
  margin-right: -50px;
}

.name {
  display: inline;
  color: red;
  margin-right: 15px;
}

.title {
  position: absolute;
  width: 50%;
  z-index: 20;
  color: white;
}

.centered {
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.my-border {
  border: 8px ridge grey;
  border-radius: 10px;
}

.deck-list {
  direction: rtl;
  position: absolute;
  top: 8%;
  width: 100%;
  height: 92%;
  overflow: auto;
}

h4 {
  margin: 0;
  margin-top: 10px;
}
</style>

