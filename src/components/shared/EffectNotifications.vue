<template>
  <div
    v-if="showing"
    id="effect-notifications"
  >
    <img
      class="icon highlight"
      :src="imagePath"
    >
  </div>
  <div
    v-if="showingHazard"
    id="hazard-notification"
  >
    {{ hazardMessage }}
  </div>
  <div
    v-if="showingCollision"
    id="collision-notification"
  >
    <div class="collision-stage">
      <img
        class="collision-card left"
        :src="collisionLeft"
      >
      <div class="collision-message">
        {{ collisionMessage }}
      </div>
      <img
        class="collision-card right"
        :src="collisionRight"
      >
    </div>
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
 * - `hazard-applied` - Shows a hazard pop up and plays a beep.
 *
 * @vue-data {bool} showing - True if an effect icon should be visible.
 * @vue-data {string} imgPath - A path to the image icon to show.
 * @vue-data {int} timeout - The time in milliseconds to keep the icon visible for
 * when it is shown.
 */
export default {
  name: 'EffectNotifications',
  data () {
    return {
      showing: false,
      imagePath: 'static/cardImages/effects/SCAN.png',
      timeout: 1000,
      showingHazard: false,
      hazardMessage: '',
      hazardTimeout: 7500,
      audioContext: null,
      showingCollision: false,
      collisionLeft: '',
      collisionRight: '',
      collisionMessage: '',
      collisionTimeout: 7200 // on screen hold
    }
  },
  computed: {
    ...mapGetters(['game'])
  },
  created () {
    // Add listeners for the effect events
    bus.on('mimic-played', this.mimicPlayed)
    bus.on('scan-used', this.scanUsed)
    bus.on('attack-blocked', this.attackBlocked)
    bus.on('hazard-applied', this.hazardApplied)
  },
  beforeUnmount () {
    // Remove listeners for the events before the module is destroyed
    bus.off('mimic-played', this.mimicPlayed)
    bus.off('scan-used', this.scanUsed)
    bus.off('attack-blocked', this.attackBlocked)
    bus.off('hazard-applied', this.hazardApplied)
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
    },
    /**
     * Shows a hazard pop up and plays a short beep.
     * @param {Object} payload - The hazard payload.
     */
    hazardApplied (payload) {
      const type = payload && payload.type ? payload.type : 'HAZARD'
      this.hazardMessage = this._hazardMessage(type, payload)
      this.showingHazard = true
      this.playHazardBeep()
      setTimeout(() => { this.showingHazard = false }, this.hazardTimeout)
    },
    /**
     * Builds a message explaining the consequence of a hazard card.
     * @param {string} type - The hazard type ('BUG' or 'DISASTER').
     * @param {Object} payload - The hazard payload (defended flag, penalty).
     * @return {string} The message to display.
     */
    _hazardMessage (type, payload) {
      const defended = payload && payload.defended
      const points = payload && payload.penalty ? Math.abs(payload.penalty) : 0
      if (type === 'BUG') {
        if (defended) {
          return 'BUG BLOCKED! Your Logger card caught the defect and protected your score.'
        }
        const lost = points > 0 ? `cost you ${points} points (half your score) and ` : ''
        return `BUG! A code defect ${lost}disrupts your next turns. Tip: a Logger card defends against Bugs.`
      }
      if (type === 'DISASTER') {
        if (defended) {
          return 'DISASTER AVERTED! Your Git backup restored your work and protected your score.'
        }
        const lost = points > 0 ? `wiped out ${points} points (half your score) and ` : ''
        return `DISASTER! It ${lost}disrupts your next turns. Tip: a Git card defends against Disasters.`
      }
      return `${type} happened`
    },
    playHazardBeep () {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        if (!AudioContext) {
          return
        }
        if (!this.audioContext) {
          this.audioContext = new AudioContext()
        }
        const context = this.audioContext
        if (context.state === 'suspended') {
          context.resume().catch(() => {})
        }
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.value = 880
        gain.gain.setValueAtTime(0.0001, context.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18)
        oscillator.connect(gain)
        gain.connect(context.destination)
        oscillator.start()
        oscillator.stop(context.currentTime + 0.2)
      } catch (error) {
        // Ignore audio errors to avoid breaking the UI
      }
    },
    /**
     * Shows a collision animation for a blocked attack.
     * @param {Object} payload - The collision payload.
     */
    attackBlocked (payload) {
      this.showingCollision = true
      this.collisionLeft = payload.defenseImage
      this.collisionRight = payload.attackImage
      this.collisionMessage = payload.message
      setTimeout(() => { this.showingCollision = false }, this.collisionTimeout)
    }
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

#hazard-notification {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 130;
  max-width: 30rem;
  padding: 1rem 1.6rem;
  border-radius: 1rem;
  background: rgba(184, 10, 10, 0.96);
  border: 2px solid rgba(255, 214, 0, 0.75);
  box-shadow: 0 0 2rem rgba(255, 214, 0, 0.5);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
  text-align: center;
  text-shadow: 0 0 1rem rgba(0, 0, 0, 0.8);
  letter-spacing: 0.02rem;
  animation: hazard-pop 0.6s ease-out;
  pointer-events: none;
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

#collision-notification {
  position: absolute;
  top: 26%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 120;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.collision-stage {
  position: relative;
  width: 70%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.collision-card {
  width: 6.4rem;
  height: auto;
  position: absolute;
  top: 0.8rem;
  filter: drop-shadow(0 0 0.6rem rgba(255, 214, 0, 0.6));
}

.collision-card.left {
  left: 0;
  animation: collide-left 3.3s ease-out;
}

.collision-card.right {
  right: 0;
  animation: collide-right 3.3s ease-out;
}

.collision-message {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 0.9rem rgba(0,0,0,0.85);
  background: rgba(244, 10, 10, 0.94);
  padding: 0.5rem 1rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(255, 214, 0, 0.6);
  animation: message-pop 5.4s ease-out;
}

@keyframes collide-left {
  0% { transform: translateX(-8rem) rotate(-12deg); opacity: 0; }
  45% { transform: translateX(16rem) rotate(4deg); opacity: 1; }
  60% { transform: translateX(16rem) rotate(2deg) scale(1.06); }
  80% { transform: translateX(14rem) rotate(-3deg) scale(0.98); opacity: 1; }
  100% { transform: translateX(14rem) rotate(-2deg); opacity: 0; }
}

@keyframes collide-right {
  0% { transform: translateX(8rem) rotate(12deg); opacity: 0; }
  45% { transform: translateX(-16rem) rotate(-4deg); opacity: 1; }
  60% { transform: translateX(-16rem) rotate(-2deg) scale(1.06); }
  80% { transform: translateX(-14rem) rotate(3deg) scale(0.98); opacity: 1; }
  100% { transform: translateX(-14rem) rotate(2deg); opacity: 0; }
}

@keyframes message-pop {
  0% { transform: scale(0.9); opacity: 0; }
  20% { transform: scale(1.02); opacity: 1; }
  80% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(0.98); opacity: 0; }
}

@keyframes hazard-pop {
  0% { transform: translateX(-50%) scale(0.85); opacity: 0; }
  15% { transform: translateX(-50%) scale(1.04); opacity: 1; }
  70% { transform: translateX(-50%) scale(1.01); opacity: 1; }
  100% { transform: translateX(-50%) scale(0.98); opacity: 0; }
}

</style>

