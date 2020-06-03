<template>
<div id="info-component">
  <input v-if="!active" type='image' id='info-button' src='static/miscIcons/info.png'
      v-on:click="active = true">

  <div id="info-popup" v-if="active">
    <slot></slot>
    <button class="btn btn-sm btn-info action" v-on:click="openRules">
      More Info
    </button>
    <button class="btn btn-sm btn-primary action" v-on:click="active = false">
      Close
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: 'info-popup',
  data () {
    return {
      active: true
    }
  },
  methods: {
    openRules () {
      this.active = false
      $('#rulesModal').modal('show')
    }
  }
}
</script>

<style scoped>
#info-component {
  position: relative;
  z-index: 1000;
}

#info-popup {
  min-width: 90px;
  max-width: 500px;
  height: auto;
  border: ridge grey 5px;
  border-radius: 10px;
  background-color: white;
  color: black;
  padding: 10px;
  text-align: left;
  font-size: 15px;
}

#info-button {
  width: 20px;
  height: 20px;
}

.action {
  display: inline-block;
  margin: 5px;
}
</style>
