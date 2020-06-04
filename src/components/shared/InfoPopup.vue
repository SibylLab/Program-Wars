<template>
<div id="info-component" v-if="tips.showTips">
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
import {mapState} from 'vuex'

export default {
  name: 'info-popup',
  data () {
    return {
      active: false
    }
  },
  computed: {
    ...mapState([
      'tips'
    ])
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
  z-index: 500;
}

#info-popup {
  min-width: 500px;
  max-height: 600px;
  overflow: auto;
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
