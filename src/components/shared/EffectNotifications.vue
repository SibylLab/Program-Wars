<template>
<div id="effect-notifications" v-if="showing">
  <img class="icon highlight" :src="imagePath">
</div>
</template>


<script>
import { bus } from '@/components/shared/Bus'
import { mapGetters } from 'vuex'

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
    mimicPlayed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/TROJAN.png'
      setTimeout(() => { this.showing = false }, this.timeout)
    },
    scanUsed () {
      this.showing = true
      this.imagePath = 'static/cardImages/effects/SCAN.png'
      setTimeout(() => { this.showing = false }, this.timeout)
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
  -webkit-box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  -moz-box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  box-shadow: 0 0 1rem 3rem rgba(255,255,0,1);
  border-radius: 2rem;
}

</style>

