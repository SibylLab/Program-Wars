<template>
<div id="effect-notifications" v-if="showing">
  <img class="icon highlight" :src="imagePath">
</div>
</template>


<script>
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

/**
 * Responds to effect events to breifly display an icon in the center of the
 * screen to help make users aware of the effect.
 *
 * ### Events to Respond to
 * - `mimic-played` - Shows a `trojan` icon to let the player know that the card
 * that was played was a mimic.
 * - `scan-used` - Shows a scan icon to let the player know when an attack was
 * blocked by a scan.
 *
 * @vue-data {bool} showing - True if an effect icon should be visible.
 * @vue-data {string} imgPath - A path to the image icon to show.
 * @vue-data {int} timeout - The time in milliseconds to keep the icon visible for
 * when it is shown.
 */
export default {
  name: 'effect-notifications',
  data () {
    return {
      showing: false,
      imagePath: 'static/cardImages/effects/SCAN.png',
      timeout: 1000
    }
  },
  computed: {
    ...mapGetters(['game'])
  },
  methods: {
    /**
     * Shows the `trojan` icon for `timeout` milliseconds.
     */
    mimicPlayed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/TROJAN.png'
      setTimeout(() => { this.showing = false }, this.timeout)
    },
    /**
     * Shows the `scan` icon for `timeout` milliseconds.
     */
    scanUsed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/SCAN.png'
      setTimeout(() => { this.showing = false }, this.timeout)
    }
  },
  created () {
    // Add listeners for the effect events
    bus.$on('mimic-played', this.mimicPlayed)
    bus.$on('scan-used', this.scanUsed)
  },
  beforeDestroy () {
    // Remove listeners for the events before the module is destroyed
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
  -webkit-box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  -moz-box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  border-radius: 2rem;
}

</style>

