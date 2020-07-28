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
/**
 * A popup component to display concise help information for a component.
 *
 * This component is made with the <slot> tag to allow it to have HTML written
 * inside of it in the parent. This allows the popup to have nicely styled
 * text and keeps the text from adding to the code, though it does add to the
 * parents HTML. These popups will scroll if the content is too large, but
 * they are not meant to have a lot of info. Detailed info should be contained
 * in other help components.
 *
 * Uses a position:fixed for the popup so that it will appear in the same place
 * every time. This could be changed, but then the component may be placed
 * inside other components, which can be akward.
 */
export default {
  name: 'info-popup',
  data () {
    return {
      active: false
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
}

#info-popup {
  position: fixed;
  left: 30%;
  top: 10%;
  width: 40%;
  min-width: 400px;
  min-height: 300px;
  max-height: 80%;
  overflow: auto;
  height: auto;
  border: ridge grey 5px;
  border-radius: 10px;
  background-color: white;
  color: black;
  padding: 10px;
  text-align: left;
  font-size: 15px;
  z-index: 600;
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
