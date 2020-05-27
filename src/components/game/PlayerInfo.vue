<template>
<div id="info">
  <h3 id="name">{{ playerName }}</h3>
</div>
</template>


<script>

export default {
  name: 'player-info',
  props: ['player', 'side'],
  components: {
  },
  computed: {
    /**
     * Gives players name if the player has been set properly.
     */
    playerName () {
      return this.player !== undefined ? this.player.name : "Undefined"
    }
  },
  methods: {
  },
}
</script>

<style scoped>
#info {
  position: relative;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: yellow;
}

#name {
  margin-top: 0;
  margin-bottom: 0;
}
</style>

