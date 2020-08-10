<template>
<div id="info-component">
  <input type='image' id='info-button' src='static/miscIcons/info.png'
      v-on:click="active = true">

  <div id="info-popup" v-if="active">
    <div class="backdrop">
      <div class="container">
        <slot></slot>

        <button class="btn btn-sm btn-info action" v-on:click="openRules">
          More Info
        </button>
        <button class="btn btn-sm btn-primary action" v-on:click="active = false">
          Close
        </button>
      </div>
    </div>
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

#info-button {
  width: 1.3rem;
  height: 1.3rem;
}

#info-popup {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 1100;
}

.container {
  position: absolute;
  left: 25%;
  top: 7%;
  width: 50%;
  min-width: 45rem;
  max-height: 85%;
  overflow: auto;
  border: ridge grey 0.5rem;
  border-radius: 1rem;
  background-color: white;
  color: black;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: left;
  z-index: 1200;
}

.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(50, 50, 50, 0.7);
}

.action {
  display: inline-block;
  margin: 0.5rem;
}
</style>
