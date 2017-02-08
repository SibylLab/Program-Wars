<template>
  <div id="stack" :class="stackCss" @click="stackClicked ()" @click.stop>
    <h1>{{ title }}</h1>
    <!-- <span :class="typeCss"> {{ cardData.type }} </span>
    <br>
    <span :class="valueCss"> {{ cardData.value }} </span> -->
  </div>
</template>

<script>
export default {
  name: 'Stack',
  props: ['unknown'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Stack',
      valueCss: 'value',
      typeCss: 'type',
      id: '001'
    }
  },
  computed: {
    stackCss () {
      return 'stack'
    }
  },
  methods: {
    stackClicked () {
      this.$emit('stackClicked', this.stack.id)

      // Emit an event here that a specific card was selected
      // handle the event in the parent so that other cards can be deselected

      // this should not be done here, should be done in the parent
      // and then the class would be a computed property that is based
      // on the selected: property
      // if (this.cardData.selected) {
      //   this.cardCss = 'card'
      //   this.cardData.selected = false
      // } else {
      //   this.cardCss = 'card selected'
      //   this.cardData.selected = true
      // }
      // global click event, do this in the parent
      // setTimeout(() => document.addEventListener('click', this.hide), 0)
    },
    hide () {
      // do this in parent
      // document.removeEventListener('click', this.hide)
      // this.cardCss = 'card'
      // this.cardData.selected = false
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: #cff;
    min-width: 150px;
}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.value {
    font-weight: bold;
    font-size: 5em;
}
.type {
    font-weight: bold;
    font-size: 2em;
}

.selected {
    -webkit-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    -moz-box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
    box-shadow: 0px 0px 25px 4px rgba(119,194,6,1);
}
</style>
