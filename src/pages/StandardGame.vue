<template>
<div>
  <two-player-template/>
</div>
</template>

<script>
import TwoPlayerTemplate from '@/pages/TwoPlayerTemplate.vue'

/**
 * Main page component for a Standard game.
 *
 * Uses the {@link TwoPlayerTemplate} which is set up with all the defaults
 * for `standard` mode games.
 */
export default {
  name: 'standard-game',
  components: {
    'two-player-template': TwoPlayerTemplate
  }
}
</script>
