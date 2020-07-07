<template>
<div id="effect-notifications" v-if="showing">
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
import {mapState} from 'vuex'

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
      showing: false,
      imagePath: 'static/cardImages/effects/',
      leftImage: 'static/cardImages/effects/SCAN.png',
      rightImage: 'static/cardImages/effects/VIRUS.png',
      block: false,
      clean: false,
      timeout: 1500,
    }
  },
  computed: {
    ...mapState([
      'players'
    ]),
  },
  created () {
    // Shows notifications when mimic is played or scan blocks something
    bus.$on('card-played', (play) => {
      if (!play.card || play.playType === 'REDRAW' || play.playType === 'DISCARD') {
        return
      }

      if (play.card && play.card.isMimic) {
        this.showing = true
        this.block = false
        this.clean = false
        if (play.card.isSpecial()) {
          this.leftImage = this.imagePath + play.card.type + '.png'
        } else {
          this.leftImage = this.imagePath + play.card.type + play.card.value + '.png'
        }
        let replaced = play.card.replace()
        this.rightImage = this.imagePath + replaced.type + '.png'
        setTimeout(() => {this.showing = false}, this.timeout)

      } else if (play.card && (play.card.isAttack() || play.card.type === "VIRUS")) {
        let target = play.target
        if (play.card.type === "VIRUS") {
          target = this.players.find(p => p.id === play.target.playerId)
        }

        if (target.helpedBy('SCAN')) {
          this.showing = true
          this.block = true
          this.clean = false
          this.leftImage = this.imagePath + play.card.type + '.png'
          this.rightImage = this.imagePath + 'SCAN.png'
          setTimeout(() => {this.showing = false}, this.timeout)
        }
      }
    })

    // Shows notification when scan removes an effect
    bus.$on('scan-effect', (type) => {
      this.showing = true
      this.block = false
      this.clean = true
      this.leftImage = this.imagePath + 'SCAN.png'
      this.rightImage = this.imagePath + type + '.png'
      setTimeout(() => {this.showing = false}, this.timeout)
    })
  }
}
</script>


<style scoped>
#effect-notifications {
  position: relative;
  top: 35%;
  z-index: 80;
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
