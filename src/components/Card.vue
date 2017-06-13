<template>
  <div id="card" :class="cardCss" class="panel panel-default" @click="cardClicked ($event)" @click.stop draggable="true" @dragstart="cardDragged">
    <img :src="cardGraphics" alt="Instruction Card (Value 1)">
  </div>
</template>

<script>
import { bus } from './Bus'

export default {
  name: 'Card',
  props: ['cardData', 'inStack'],
  data () {
    return {
      msg: 'Programming Wars',
      valueCss: 'value',
      typeCss: 'type'
    }
  },
  computed: {
    cardGraphics() {
      return this.cardData.cardImg;
    },
    cardCss () {
      let classString = 'card'

      if (this.cardData.selected) {
        classString = classString + ' selected'
      }

      if (this.inStack) {
       classString = classString + ' stack'
     }

      return classString
    },
    title () {
        /*
      if (this.cardData.category !== 'stack') {
        return 'Card'
      } else {
        return ''
      }
      */
        return 'Card'
    },
    cardType(){
        if(this.cardData.type === 'R' && this.cardData.value === 1){
            return 'Rx'
        }else{
            return this.cardData.type
        }
    },
    cardValue(){
      if(this.cardData.type === 'R' && this.cardData.value === 1){
        return '_'
      }else{
        return this.cardData.value
      }
    }
  },
  methods: {
    cardClicked (e) {
      if (this.$store.getters.getHasPlayed === false) {
        this.$emit('cardClicked', this.cardData)

        if (this.cardData.value !== '+') {
          bus.$emit('cardClickedStack', e, this.cardData)
        }
      } else {
        return '';
      }


    },
    hide () {

    },
    cardDragged(e) {
      if (this.$store.getters.getHasPlayed === false) {
        this.$emit('setActiveCard', this.cardData)
        bus.$emit('cardClickedStack', e, this.cardData)
      } else {
        return '';
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#card{


    background-color: #fff;
    min-width: 90px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    min-height: 120px;
    border: 0px solid #000;
    border-radius: 10px;
    /*padding: 10px 0px 10px 0px;*/
    margin: 0px 0px 0px 0px;
    }

.flex-container {
  flex-direction:column;
  padding: 0px;

}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  display: inline;
  padding: 0;
}

li {
  display: inline;
  margin: 0 5px;
}

a {
  color: #42b983;
}

.value {
    font-weight: bold;
    font-size: 1.5em;
}
.type {
    font-weight: bold;
    font-size: 1.5em;
}

.selected {
  -webkit-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
  -moz-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
  box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
}

#card.stack {


    align-content: center;

    background-color: #fff;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    padding: 0;
    margin: 0;

    min-height:50px;
    min-width: 50px;

  max-width: 20px;



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
  font-size: 1em;
}
</style>
