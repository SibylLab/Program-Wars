<template>
  <div class="card-overlay">
    <div id="overlay" v-if="isSelected">

      <input type="image" id="discard-button"
         title="Discard Card"
         src="static/miscIcons/trash.png"
         v-on:click="discardCard">

      <div id="play" class="popup" v-if="isSafety">
        <div v-if="canPlaySafety">
          <h5>Activate</h5>
          <div id="button-wrapper"> 
            <button id="safety-button" v-on:click="playSafety">
              OK
            </button>
          </div>
        </div>
        <div v-else>
          <h5>In Use</h5>
        </div>
      </div>

    </div>

    <card v-bind:cardData="card"
       v-on:cardClicked="cardClicked"
       v-on:setActiveCard="setActiveCard">
    </card>
  </div> 
</template>


<script>
/* eslint-disable */
import Card from './Card'
import {mapGetters} from 'vuex'


export default {
  name: 'CardWithOverlay',
  props: ['card'],
  data () {
    return {
      type: this.card.type
    }
  },
  components: {
    'card': Card,
  },
  computed: {
    isSelected () {
      return this.card === this.getActiveCard()
    },
    isAttack () {
      return this.type === 'H' || this.type === 'VIRUS' || this.type === 'POWEROUTAGE'
    },
    isSafety () {
      return (this.type === 'OVERCLOCK' || this.type === 'BATTERYBACKUP'
          || this.type === 'GENERATOR' || this.type === 'ANTIVIRUS'
          || this.type === 'FIREWALL')
    },
    canPlaySafety () {
      return !this.getCurrentPlayer().protectedBy(this.type)
    }
  },
  methods: {
    ...mapGetters([
      'getActiveCard',
      'getCurrentPlayer'
    ]),
    cardClicked (c) {
      this.$emit('cardClicked', c)
    },
    setActiveCard (c) {
      this.$emit('setActiveCard', c)
    },
    discardCard () {
      this.$emit('discard-card')
    },
    playSafety () {
      this.$emit('played-card')
    }
  }
}
</script>


<style scoped>
#discard-button {
  position: absolute;
  left: -8px;
  top: -8px;
  width: 25px;
  height: 25px; 
}

.popup {
  position: absolute;
  left: -12px;
  top: 30px;
  background-color: white;
  border: solid black 2px;
  width: 114px;
  height: auto;
}

#button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 3px;
  margin-right: 3px;
  margin-bottom: 3px;
}

#target-button {
  display: block;
}

#play-button {
  display: block;
}
</style>
