<template>
<div>
  <two-player-template/>
</div>
</template>

<script>
import TwoPlayerTemplate from '@/pages/TwoPlayerTemplate.vue'

export default {
  name: 'standard-game',
  components: {
    'two-player-template': TwoPlayerTemplate
  }
}
</script>
