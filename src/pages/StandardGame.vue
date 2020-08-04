<template>
<div>
  <two-player-template/>
</div>
</template>

<script>
import TwoPlayerTemplate from '@/pages/TwoPlayerTemplate.vue'
import { bus } from '@/components/shared/Bus'

export default {
  name: 'standard-game',
  components: {
    'two-player-template': TwoPlayerTemplate
  }
}
</script>
