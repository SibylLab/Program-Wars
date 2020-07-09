<template>
<div id="deck-setup">
  <page-header/>

  <h4 id="heading">Phase 1: Select Agile Requirements</h4>
  <h4 id="player-name">{{ players[playerNum].name.toUpperCase() }}</h4>

  <div id="optional-cards">
    <img v-for="card in optionalCards" v-bind:key="card + Math.random()"
        :src="cardImage(card)" class='card-img'>
  </div>


  <button id="choose" class="btn btn-primary" v-on:click="chooseReq()">Choose</button>

</div>
</template>


<script>
import PageHeader from '@/components/shared/PageHeader'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'agile-setup-page',
  data () {
    return {
      playerNum: 0
    }
  },
  components: {
    'page-header': PageHeader
  },
  computed: {
    ...mapState(['players', 'gameState']),
    optionalCards () { return ['card', 'card', 'card'] }
  },
  methods: {
    ...mapActions(['leaveGame']),
    cardImage () { return 'static/cardImages/method0.png' }
  },
  mounted () {
    if (this.gameState !== 'deck') {
      this.leaveGame()
    }
  }
}
</script>


<style scoped>
#agile-setup {
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

#optional-cards {
  position: absolute;
  top: 80px;
  width: 100%;
  height: 40%;
  background-color: grey;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.card-img {
  display: inline-block;
  width: 180px;
  height: auto;
  margin: 25px;
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
