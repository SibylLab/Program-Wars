<template>
<div id="effect-notifications" v-if="showing">
  <h1 style="color: black; margin-top: 20px;">{{ titleText }}</h1>

  <div style="display: inline; position: relative;">
    <img id="left-image" :src="leftImage" class="shadow">
    <img v-if="block" src="static/miscIcons/noIcon.png" class="no-symbol">
  </div>

  <img id="arrow" src="static/miscIcons/arrow.png">

  <div style="display: inline; position: relative;">
    <img id="right-image" :src="rightImage" class="shadow">
    <img v-if="clean" src="static/miscIcons/noIcon.png" class="no-symbol">
  </div>
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'

/**
 * A notification that will flash on the screen to show when a triggered effect
 * happens.
 * Ie) a player playes a mimicked card and it is replaced. This will show the
 * the card played pointing to the card that it was replaced by.
 * The goal is to give the player visual notification that something other than
 * what they expected has happened.
 */
export default {
  name: 'effect-notifications',
  data () {
    return {
      pageState: this.$store.state.pageState,
      showing: false,
      imagePath: 'static/cardImages/effects/',
      leftImage: 'static/cardImages/effects/SCAN.png',
      rightImage: 'static/cardImages/effects/VIRUS.png',
      block: false,
      clean: false,
      timeout: 1500,
      titleText: 'Empty'
    }
  },
  computed: {
    players () {
      return this.pageState.players
    }
  },
  created () {
    // Shows notifications when mimic is played
    bus.$on('mimic-played', (play) => {
      // we have already replaced the card???
      // So this will have to be different, but similar
      this.titleText = "Mimic!"
      this.showing = true
      this.block = false
      this.clean = false
      if (play.card.isSpecial()) {
        this.leftImage = this.imagePath + play.card.type + '.png'
      } else {
        this.leftImage = this.imagePath + play.card.type + play.card.value + '.png'
      }
      // let replaced = play.card.replace()
      // this.rightImage = this.imagePath + replaced.type + '.png'
      setTimeout(() => {this.showing = false}, this.timeout)
    })

    // Shows notification when scan removes an effect
    bus.$on('scan-used', (type) => {
      this.titleText = "Scanned!"
      this.showing = true
      this.block = false
      this.clean = true
      this.leftImage = this.imagePath + 'SCAN.png'
      this.rightImage = this.imagePath + type + '.png'
      setTimeout(() => {this.showing = false}, this.timeout)
    })
  }
  // need to destroy these too
}
</script>


<style scoped>
#effect-notifications {
  position: absolute;
  top: 35%;
  left: 30%;
  width: 40%;
  z-index: 80;
  background-color: #ffffff;
  border: ridge grey 6px;
  border-radius: 20px;
}

#left-image {
  width: 150px;
  margin: 30px;
}

#right-image {
  width: 150px;
  margin: 30px;
}

.no-symbol {
  position: absolute;
  top: -40px;
  right: 55px;
  width: 100px;
}

.shadow {
  -webkit-box-shadow: 0 0 24px 24px rgba(0,255,0,1);
  -moz-box-shadow: 0 0 24px 24px rgba(0,255,0,1);
  box-shadow: 0 0 24px 24px rgba(255,150,0,1);
  border-radius: 10px;
}

</style>

