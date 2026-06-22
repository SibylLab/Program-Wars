<template>
  <div
    v-if="showing"
    id="polymorph-modal"
    @click.self="cancel"
  >
    <div class="polymorph-box">
      <h3 class="polymorph-title">
        Polymorphism: choose a {{ laneLabel }} component
      </h3>
      <p class="polymorph-sub">
        The card morphs into the component you pick.
      </p>

      <div class="polymorph-options">
        <button
          v-for="name in options"
          :key="name"
          class="polymorph-option"
          :title="describe(name)"
          @click="choose(name)"
        >
          <img
            class="polymorph-image"
            :src="imageFor(name)"
          >
          <span class="polymorph-name">{{ prettyName(name) }}</span>
        </button>
      </div>

      <button
        class="polymorph-cancel"
        @click="cancel"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { bus } from '@/components/shared/Bus'
import cardCatalog from '@/classes/deck/cardCatalog'
import ComponentCard from '@/classes/card/ComponentCard'
import { describeCard } from '@/classes/card/cardDescriptions'
import { mapGetters } from 'vuex'

const LANE_LABELS = { MODEL: 'Model', VIEW: 'View', CONTROLLER: 'Controller' }

/**
 * Modal that lets a player choose which component a Polymorphism card becomes
 * when it is dropped into a lane. Opened by the `polymorph-choose` event.
 *
 * @vue-data {bool} showing - True while the picker is open.
 * @vue-data {Object} pending - The pending choice context ({card, owner, laneIndex, laneType}).
 */
export default {
  name: 'PolymorphModal',
  data () {
    return {
      showing: false,
      pending: null
    }
  },
  computed: {
    ...mapGetters(['game']),
    laneType () {
      return this.pending ? this.pending.laneType : ''
    },
    laneLabel () {
      return LANE_LABELS[this.laneType] || ''
    },
    options () {
      return this.laneType ? (cardCatalog[this.laneType] || []) : []
    }
  },
  created () {
    bus.on('polymorph-choose', this.open)
  },
  beforeUnmount () {
    bus.off('polymorph-choose', this.open)
  },
  methods: {
    /**
     * Opens the picker for a pending Polymorphism play.
     * @param {Object} payload - { card, owner, laneIndex, laneType }.
     */
    open (payload) {
      this.pending = payload
      this.showing = true
    },
    /**
     * Image path for a component option.
     * @param {string} name - The component name.
     * @return {string} The image path.
     */
    imageFor (name) {
      return ComponentCard.getImagePath(this.laneType, name)
    },
    /**
     * Tooltip description for a component option.
     * @param {string} name - The component name.
     * @return {string} The description text.
     */
    describe (name) {
      return describeCard({ componentName: name })
    },
    /**
     * Human-friendly label for a component name.
     * @param {string} name - The component name (e.g. 'csrf_protection').
     * @return {string} A spaced version (e.g. 'csrf protection').
     */
    prettyName (name) {
      return name.replace(/_/g, ' ')
    },
    /**
     * Morphs the pending card into the chosen component and plays it.
     * @param {string} name - The chosen component name.
     */
    choose (name) {
      const pending = this.pending
      if (!pending) {
        return
      }
      pending.card.morph(pending.laneType, name)

      if (pending.mode === 'onStack') {
        // Dropped on the inheritance/method stack: accumulate points there.
        this.game.takeTurn({
          type: 'playOnStack',
          player: this.game.currentPlayer(),
          card: pending.card,
          cardOwner: pending.owner,
          stack: pending.stack
        })
      } else {
        // Dropped in the lane: start a new stack in that lane.
        this.game.takeTurn({
          type: 'newStack',
          player: this.game.currentPlayer(),
          card: pending.card,
          cardOwner: pending.owner,
          playField: pending.owner.playField,
          laneIndex: pending.laneIndex
        })
      }
      this.close()
    },
    /**
     * Closes the picker without playing the card.
     */
    cancel () {
      this.close()
    },
    close () {
      this.showing = false
      this.pending = null
    }
  }
}
</script>

<style scoped>
#polymorph-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
}

.polymorph-box {
  background: #2b2b2b;
  border: 2px solid rgba(255, 214, 0, 0.75);
  border-radius: 0.8rem;
  padding: 1.2rem 1.5rem;
  max-width: 42rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.7);
  text-align: center;
  color: #fff;
}

.polymorph-title {
  margin: 0 0 0.2rem;
}

.polymorph-sub {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: #c9c9c9;
}

.polymorph-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
}

.polymorph-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  width: 6rem;
  padding: 0.4rem;
  background: #1f1f1f;
  border: 1px solid #555;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
}

.polymorph-option:hover {
  border-color: #8bff8b;
  box-shadow: 0 0 0.5rem rgba(139, 255, 139, 0.5);
}

.polymorph-image {
  width: 100%;
  height: auto;
  border-radius: 0.3rem;
}

.polymorph-name {
  font-size: 0.75rem;
  text-transform: capitalize;
}

.polymorph-cancel {
  margin-top: 1rem;
  padding: 0.4rem 1.2rem;
  background: #555;
  border: none;
  border-radius: 0.4rem;
  color: #fff;
  cursor: pointer;
}

.polymorph-cancel:hover {
  background: #6e6e6e;
}
</style>
