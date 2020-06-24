<template>
<div id="effect-notifications" v-if="showing">
  {{ text }}
</div>
</template>


<script>
import {bus} from '@/components/shared/Bus'
import {mapState} from 'vuex'

export default {
  name: 'effect-notifications',
  data () {
    return {
      showing: false,
      text: 'TROJAN'
    }
  },
  computed: {
    ...mapState([
      'players'
    ])
  },
  created () {
    bus.$on('card-played', (play) => {
      if (play.card && play.card.isMimic) {
        this.showing = true
        this.text = "TROJAN!"
        setTimeout(() => {this.showing = false}, 2000)
      } else if (play.card && (play.card.isAttack || play.card.type === "VIRUS")) {
        let target = play.target
        if (play.card.type === "VIRUS") {
          target = this.players.find(p => p.id === play.target.playerId)
        }
        if (target.helpedBy('SCAN')) {
          this.showing = true
          this.text = "BLOCKED!"
          setTimeout(() => {this.showing = false}, 2000)
        }
      }
    })
  }
}
</script>


<style scoped>
#effect-notifications {
  position: fixed;
  top: 25%;
  left: 34%;
  background-color: white;
  border: ridge grey 5px;
  font-size: 120px;
  z-index: 80;
}
</style>
