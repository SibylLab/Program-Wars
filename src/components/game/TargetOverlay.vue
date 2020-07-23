<template>
<div id="target-overlay">


</div>
</template>


<script>

/**
 * Displays buttons for targeting players or activating special cards, or
 * text to indicate the card can't be played.
 * Attached to a card and is visible when a special card is active.
 * Responsible for getting possible targets for a card and calling the
 * appropriate actions when a special card is played.
 */
export default {
  name: 'target-overlay',
  data () {
    return {
      pageState: this.$store.state.pageState
    }
  }
}
</script>


<style scoped>
</style>

