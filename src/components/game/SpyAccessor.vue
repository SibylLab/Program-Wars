<template>
<div id="spy-accessor">

  <button id="spy-button" v-if="canSpy" :class="['acs', 'btn', 'btn-sm', spyStyle]" 
      v-on:click="spy()">
    {{ spyText }}
  </button>

  <div id="hand-box" v-if="showHand">
    <h3 style="color: white;">
      {{ player.name }}'s hand
    </h3>
    <ul>
      <li v-for="card in player.hand" v-bind:key="card.id">
        <img :src="card.image" class="spy-card" ondragstart="return false">
      </li>
    </ul>
  </div>

</div>
</template>

<script>
export default {
  name: 'spy-accessor',
  props: ['player'],
  data () {
    return {
      pageState: this.$store.state.pageState,
      showHand: false
    }
  },
  computed: {
    spyStyle () {
      return this.showHand ? 'btn-danger' : 'btn-success'
    },
    spyText () {
      return this.showHand ? 'Stop Spying' : 'Spy Hand'
    },
    canSpy () {
      // make sure the player whos turn it is has hurt this player with spyware
      return true;
    }
  },
  methods: {
    spy () {
      this.showHand = !this.showHand
    }
  }
}
</script>

<style scoped>
#player-area {
  position: absolute;
  top: 0px;
  width: 60%;
  height: 100%;
}

#hand-box {
  position: fixed;
  width: 45%;
  height: 30%;
  min-width: 650px;
  min-height: 200px;
  top: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #333333;
  border: solid grey 3px;
  border-radius: 5px;
  z-index: 200;
}

.spy-button {
}

.spy-card {
  display: inline;
  width: 90px;
  height: auto;
}

.acs {
  margin: 2px;
}
</style>
