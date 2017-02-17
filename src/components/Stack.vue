<template>
  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" :class="stackCss" @click="stackClicked ()" @click.stop>
    <h1>{{ title }}</h1>
    <ul id="example-1">
      <button v-if="!playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>

      <li v-for="card in cards">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)"></card>
        </li>
      <button v-if="playfieldBoolean"  class="btn btn-primary" :class="buttonStyle" v-on:click="addToStackClicked">
        <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
    </ul>
  </div>
</template>

<script>
import { bus } from './Bus';
import Card from './Card'


export default {
  name: 'Stack',
  props: ['playfieldBoolean', 'stackId'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      title: 'Stack',
      cards: [],
      id: this.stackId,
      activeCard: undefined
    }
  },
  computed: {
    stackCss () {
      return 'stack'
    },
    buttonStyle () {
        if (this.activeCard !== undefined) {
            return 'selected'
        } else {
            return ''
        }
    }
  },
  created: function () {

    bus.$on('cardClickedStack', (event, card) => {
      // a card was selected

      if (card.category !== 'stack') {
        console.log('hello '+ card.id + ' ' + card.value + ' ' + card.type + ' --- ' + card.selected )
        if (card.selected === true) {
          this.activeCard = Object.assign({}, card);

          this.activeCard.category = 'stack'
          this.activeCard.selected = false
        }

      }
    })

    bus.$on('cardDeselected', () => {
      // a card was selected
      this.activeCard = undefined
      console.log('no active card selected')
    })
  },
  methods: {
    cardAddClicked () {
      this.$emit('cardAddClicked', this.id)

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
    stackClicked () {
      console.log('The stack knows a card was clicked')
    },
    cardClickedInStack(event, card) {
      console.log('card in stack was clicked')
      console.log(card)

      if (this.activeCard !== undefined && card.value === '+' ) {

        // do logic here that check if the move is valid
        console.log(event)
        if (this.playfieldBoolean) {
          this.cards.push(this.activeCard)
        } else {
          this.cards.unshift(this.activeCard)
        }

        bus.$emit('activeCardAddedToStack', this.activeCard.id )
        this.activeCard = undefined

        this.$emit('cardAdded', this.stackId)

        bus.$emit('cardDeselected')


      }
    },
    addToStackClicked(event) {
      console.log('card in stack was clicked')
      console.log(card)

      if (this.activeCard !== undefined) {

        // do logic here that check if the move is valid
        console.log(event)
        if (this.playfieldBoolean) {
          this.cards.push(this.activeCard)
        } else {
          this.cards.unshift(this.activeCard)
        }

        bus.$emit('activeCardAddedToStack', this.activeCard.id)
        this.activeCard = undefined

        this.$emit('cardAdded', this.stackId)

        bus.$emit('cardDeselected')
      }
    },
    drop (e) {
      console.log('You dropped a card on a stack', e)

      if (this.activeCard !== undefined) {

        // do logic here that check if the move is valid
        console.log(event)
        if (this.playfieldBoolean) {
          this.cards.push(this.activeCard)
        } else {
          this.cards.unshift(this.activeCard)
        }

        bus.$emit('activeCardAddedToStack', this.activeCard.id)

        this.activeCard = undefined

        this.$emit('cardAdded', this.stackId)

        bus.$emit('cardDeselected')
      }
    }

  },
  components: {
    'card': Card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: #cff;
    min-width: 150px;
    min-height: 50px;
    color: #000;
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
