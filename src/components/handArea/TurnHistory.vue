<template>
  <div id="turn-history">
    <template v-if="requirementProgress.length">
      <div
        v-for="entry in requirementProgress"
        :key="entry.player.id"
        class="requirement-row"
      >
        <span class="requirement-name">{{ entry.player.name }}</span>

        <div class="requirement-group">
          <span class="requirement-label">M</span>
          <span class="requirement-boxes">
            <span
              v-for="index in 4"
              :key="`model-${entry.player.id}-${index}`"
              :class="['requirement-box', { filled: index <= entry.model }]"
            />
          </span>
        </div>

        <div class="requirement-group">
          <span class="requirement-label">V</span>
          <span class="requirement-boxes">
            <span
              v-for="index in 2"
              :key="`view-${entry.player.id}-${index}`"
              :class="['requirement-box', { filled: index <= entry.view }]"
            />
          </span>
        </div>

        <div class="requirement-group">
          <span class="requirement-label">C</span>
          <span class="requirement-boxes">
            <span
              v-for="index in 5"
              :key="`controller-${entry.player.id}-${index}`"
              :class="['requirement-box', { filled: index <= entry.controller }]"
            />
          </span>
        </div>

        <div class="requirement-group">
          <span class="requirement-label">D</span>
          <span class="requirement-boxes">
            <span
              v-for="index in 2"
              :key="`defensive-${entry.player.id}-${index}`"
              :class="['requirement-box', { filled: index <= entry.defensive }]"
            />
          </span>
        </div>

        <span :class="entry.cardsComplete ? 'requirement-ready' : 'requirement-not-ready'">
          {{ entry.cardsComplete ? 'Done' : 'Pending' }}
        </span>
      </div>
    </template>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

/**
 * Shows a number of the last plays taken in the game.
 *
 * Each play consists of large card icon to show which card was played. It also
 * will have a small image in the top right corner for the player who played the card.
 * If there was a target of the card an icon for the target player will be shown in
 * the bottom right corner. For scan cards an image for the scanned effect will
 * be shown in the bottom left corner, and for mimic cards an image of the Trojan
 * card will be shown here to indicate that the card was replaced.
 *
 * @vue-computed {Object[]} history - Returns a collection of the last 15
 * `playInfo` objects that were created. See {@link AIHandler} for more information
 * on what can be in a `playInfo` object. Not all of these are guranteed to be shown
 * but are included as different aspect ratios may change the number of icons
 * that will fit in the display.
 */
export default {
  name: 'TurnHistory',
  computed: {
    ...mapGetters(['game']),
    requirementProgress () {
      if (!this.game || !this.game.getRequirementProgress) {
        return []
      }

      return this.game.players.map(player => this.game.getRequirementProgress(player.id))
    }
  }
}
</script>


<style scoped>
#turn-history {
  position: relative;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333333;
  border: ridge grey 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  text-align: left;
  overflow: hidden;
}

.requirement-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin: 0.35rem 0.6rem;
  font-size: 0.92rem;
  line-height: 1.2;
}

.requirement-name {
  min-width: 5rem;
  font-weight: 700;
}

.requirement-group {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.requirement-label {
  min-width: 1rem;
  font-weight: 700;
}

.requirement-boxes {
  display: inline-flex;
  gap: 0.18rem;
}

.requirement-box {
  width: 0.9rem;
  height: 0.9rem;
  border: 0.08rem solid #bdbdbd;
  border-radius: 0.15rem;
  background: transparent;
  box-sizing: border-box;
}

.requirement-box.filled {
  background: #8bff8b;
  border-color: #8bff8b;
  box-shadow: 0 0 0.25rem rgba(139, 255, 139, 0.45);
}

.requirement-ready {
  color: #8bff8b;
  font-weight: 700;
}

.requirement-not-ready {
  color: #ffc46b;
  font-weight: 700;
}
</style>


