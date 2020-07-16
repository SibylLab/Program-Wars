<template>
<div id="deck-setup">
  <page-header/>

  <h4 id="heading">Phase 2: Adjust Deck Setup</h4>

  <div id="setup">
    <h4 id="player-name">"PLAYER" Add 10 More Cards To Your Deck</h4>

    <!--
    <div id="deck-contents">
      <div class="deck-card-type" v-for="type in basicCardTypes" v-bind:key="type.type  + Math.random()">
        <img v-for="card in typeCards(type)" v-bind:key="card + Math.random()"
            :src="cardImage(card)" class='deck-card' ondragstart="return false;">
      </div>
    </div>
    -->

    <!--
    <div id="optional-cards" :key="updateOpt">
      <img v-for="[idx, card] in listOptional()" v-bind:key="idx"
          :src="cardImage(card)" class='card-img' ondragstart="return false;"
          v-on:drop='replaceCard($event, idx)' @dragover.prevent @dragenter.prevent>
    </div>
    -->

    <!--
    <div id="replacement-cards" :key="updateRep">
      <img v-for="[idx, card] in listReplacement()" v-bind:key="idx"
          :src="cardImage(card)" class='card-img' draggable
          v-on:dragstart='dragReplacement($event, idx)'>
    </div>
    -->

    <!--
    <button id="choose" class="btn btn-primary" v-on:click="chooseDeck()">Choose</button>
    -->
  </div>

</div>
</template>


<script>
// import deckData from '@/data/decks'
import PageHeader from '@/components/shared/PageHeader'

export default {
  name: 'deck-setup-page',
  data () {
    return {
      pageState: this.$store.pageState
    }
  },
  components: {
    'page-header': PageHeader
  }
}
</script>


<style scoped>
#deck-setup {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  font-family: monospace;
}

#heading {
  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0px;
  z-index: 20;
  color: white;
}

#player-name {
  position: relative;
  z-index: 20;
  color: black;
}

#deck-contents {
  position: absolute;
  left: 0px;
  top: 80px;
  width: 20%;
  height: 89.5%;
  overflow: auto;
  background-color: lightgreen;
}

.deck-card-type {
  display: block;
  text-align: left;
  margin: 20px;
}

.deck-card {
  display: inline-block;
  width: 80px;
  height: auto;
  margin-right: -50px;
}

#optional-cards {
  position: absolute;
  top: 80px;
  left: 20%;
  width: 80%;
  height: 40%;
  background-color: grey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

#replacement-cards {
  position: absolute;
  top: 50.5%;
  left: 20%;
  width: 80%;
  height: 40%;
  background-color: lightgrey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.card-img {
  display: inline-block;
  width: 130px;
  height: auto;
  margin: 55px 20px;
}

#choose {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.active {
  -webkit-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  -moz-box-shadow: 0 0 24px 8px rgba(0,230,0,1);
  box-shadow: 0 0 24px 15px rgba(0,255,0,1);
}
</style>

