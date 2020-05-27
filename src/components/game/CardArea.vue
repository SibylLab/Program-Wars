<template>
<div id="turn">
  <p> This is the card/message area </p>
</div>
</template>


<script>

export default {
  name: 'card-area',
  props: ['player'],
  components: {
  },
  computed: {
  },
  methods: {
  }
  // Add created and bus.on to check when players change if needed to refresh
  // the hand being shown
}
</script>

<style scoped>
#turn {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #e8e8e8;
}

#name {
  margin-top: 0;
  margin-bottom: 0;
}
</style>


