<template>
<div id="effect-notifications" v-if="showing">
  <img class="icon highlight" :src="imagePath">
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
      timeout: 1250
    }
  },
  computed: {
    players () {
      return this.pageState.players
    }
  },
  methods: {
    mimicPlayed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/TROJAN.png'
      setTimeout(() => {this.showing = false}, this.timeout)
    },
    scanUsed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/SCAN.png'
      setTimeout(() => {this.showing = false}, this.timeout)
    }
  },
  created () {
    bus.$on('mimic-played', this.mimicPlayed)
    bus.$on('scan-used', this.scanUsed)
  },
  beforeDestroy () {
    bus.$off('mimic-played', this.mimicPlayed)
    bus.$off('scan-used', this.scanUsed)
  }
}
</script>


<style scoped>
#effect-notifications {
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 100;
}

.icon {
  width: 20%;
}

.highlight {
  -webkit-box-shadow: 0 0 50px 40px rgba(255,0,0,1);
  -moz-box-shadow: 0 0 50px 40px rgba(255,0,0,1);
  box-shadow: 0 0 50px 40px rgba(255,0,0,1);
  border-radius: 20px;
}

</style>

