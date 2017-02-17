<template>
  <div id="card" :class="cardCss" v-on:click="cardClicked ($event)" @click.stop draggable="true" @dragstart="cardDragged" @ontouchstart="cardDragged">
    <h1>{{ title }}</h1>
    <span :class="typeCss"> {{ cardData.type }} </span>
    <br>
    <span :class="valueCss"> {{ cardData.value }} </span>
  </div>
</template>

<script>
import { bus } from './Bus'


export default {
  name: 'Card',
  props: ['cardData'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      valueCss: 'value',
      typeCss: 'type'
    }
  },
  computed: {
    cardCss () {
      let classString = 'card'

      if (this.cardData.selected) {
        classString = classString + ' selected'
      }

      if (this.cardData.value === '+') {
        classString = classString + ' addCard'
      } else if (this.cardData.category === 'stack') {
       classString = classString + ' stack'
     }

      return classString
    },
    title () {
      if (this.cardData.category !== 'stack') {
        return 'Card'
      } else {
        return ''
      }
    }
  },
  methods: {
    cardClicked (e) {

      this.$emit('cardClicked', this.cardData)

      if (this.cardData.value !== '+') {
        bus.$emit('cardClickedStack', e, this.cardData)
      }

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
    },
    cardDragged(e) {
      console.log('A card is being dragged')
      this.$emit('setActiveCard', this.cardData)
      bus.$emit('cardClickedStack', e, this.cardData)


    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card{


    background-color: #cff;
    min-width: 150px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
    border: 0px solid #000000;

    padding: 20px 0px 20px 0px;

    margin: 10px 0px 10px 0px;
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
  -webkit-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
  -moz-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
  box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
}

#card.stack {


    align-content: center;

    background-color: #fcf;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

  -webkit-border-radius: 2px;
  -webkit-border-top-left-radius: 4px;
  -moz-border-radius: 2px;
  -moz-border-radius-topleft: 4px;
  border-radius: 2px;
  border-top-left-radius: 4px;

  border-style: solid;
  border-width: thin;



}

#card.addCard {

  border-style: dashed;
  border-width: thin;
}

#card.addCard .value, #card.addCard .type {
  font-weight: normal;
  font-size: 1em;
}

#card.stack .value, #card.stack .type {
  font-weight: bold;
  font-size: 1.5em;
}
</style>
