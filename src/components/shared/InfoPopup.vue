<template>
<div id="info-component">
  <input type='image' id='info-button' src='static/miscIcons/info.png'
      v-on:click="active = true">

  <div id="info-popup" v-if="active">
    <div class="backdrop">
      <div class="container">
        <slot></slot>

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
 * This component is used with a default `<slot>` tag to allow the specific
 * content to be added to it with HTML. This allows the text to be styled
 * differently for each popup, as needed for the specific content. It does not
 * contain any information itself.
 *
 * The component itself is a button, that when clicked will show the popup.
 * Any positioning of the element will move the button around. The popup uses
 * `fixed` positioning to keep it in the center of the screen, and blocks
 * clicks to elements outside of it until closed.
 *
 * The example below shows simple usage, but as the content of the popup uses
 * HTML you can make it as elaborate or complex as needed. Though the intent of
 * these popups is to be short descriptions of a portion of the screen, detailed
 * help information should be kept on the help pages.
 *
 * @example
 * <info-popup>
 *   <h3> Some title for the popup </h3>
 *   <p> A paragraph of content for the popup </p>
 * </info-popup>
 */
export default {
  name: 'info-popup',
  data () {
    return {
      active: false
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
