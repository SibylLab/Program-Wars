<template>
  <div @dragover.prevent @drop="drop" @ontouchend="drop" id="stack" class="panel panel-default" :class="stackCss" @click="stackClicked()" @click.stop>
    <modal :modalId="modalId2" :modalTitle="groupSelectConfirm" :modalBody="groupSelectText" :cancel="true" :modalCards="[]" :modalCallback="() => {groupStacks()}"></modal>


    <input v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" type="checkbox" :id="stackId" @click="stackSelected" :checked="selectedStacksLength">
    <label  v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" for="stackId"><b>Group Select</b></label>
    <span style="padding: 10px">Stack Score: {{ score }}</span>


    <button
      style="margin-top: 7px"
      class="btn btn-secondary"
      :class="buttonStyle"
      :stackId="this.stackId"
      @click="addToStackClicked"
      type="button"
      data-container="body"
      data-placement="top"
      data-trigger="hover">
      Add to Stack
    </button>
    <br>
    <ul id="example-1">
      <li v-for="card in cards" style="zoom: 60%; margin: 4px">
            <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
      </li>

    </ul>
  </div>
</template>

<script>

  import { bus } from './Bus';
  import Card from './Card'
  import Modal from './Modal'

/**
 * @file Stack.vue
 */
export default {
  name: 'Stack',
  props: ['playfieldBoolean', 'stackId', 'playerId'],
  data () {
    return {
      title: 'Stack',
      id: this.stackId,
      dataContent: "hello",
      groupSelectConfirm: "Group Stacks",
      groupSelectText: "Would you like to group these stacks?"
    }
  },
  computed: {
      modalId2() {
        return this.id + "Modal"
      },
    cards () {

      if (this.playerId === this.$store.getters.getCurrentPlayerId ) {
        if (this.$store.getters.getCurrentPlayerStacks.length !== 0) {
          let stack = this.$store.getters.getCurrentPlayerStacks.find(stack => stack.stackId === this.stackId)
          console.log("stack: ", stack)
          if (stack !== undefined) {
            return stack.cards
          } else {
            return []
          }
        }
      } else {
        let stack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
        console.log("stack: ", stack)
        if (stack !== undefined) {
          return stack.cards
        } else {
          return []
        }
      }
    },
    selectedStackBoolean () {
      return this.$store.getters.getSelectedStackBoolean
    },
    currentPlayer () {

    },
    stackCss () {
      return 'stack'
    },
    buttonStyle() {
      return ''
    },
    score() {
        let thisStack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
         console.log("this stacks score: ", thisStack.calculateStackScore())
         thisStack.calculateStackScore()
          return thisStack.score
    },
    activeCardIsGroup() {
        let thisActiveCard = this.$store.getters.getActiveCard

        if (thisActiveCard !== undefined && thisActiveCard.type === 'G') {
          return true
        } else {
          return false
        }
    },
    currentSelectedStacksMatch() {
        if (this.$store.getters.getSelectedStacksBoolean === undefined) {
            return true
        } else if (this.playfieldBoolean === this.$store.getters.getSelectedStacksBoolean) {
            return true;
        } else {
            return false;
        }
    },
    selectedStacksLength () {
      let selectedStacks = this.$store.getters.getSelectedStacks

      for (let stack of selectedStacks) {
          if (stack.stackId === this.stackId)
              return true
      }
      return false
    }
  },
  created: function () {
    bus.$on('cardClickedStack', (event, card) => {
      // a card was selected
      if (card.category !== 'stack') {
        console.log('hello ' + card.id + ' ' + card.value + ' ' + card.type + ' --- ' + card.selected)
        if (card.selected === true) {
          this.activeCard = Object.assign({}, card);

          this.activeCard.category = 'stack'
          this.activeCard.selected = false
        }
      }
    })

    bus.$on('cardHasBeenSelected', () => {
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" )
    })

    bus.$on('cardDeselected', () => {
      // a card was selected
      this.activeCard = undefined
      this.$store.commit('setActiveCardUndefined')
      this.$store.commit('removeAllSelectedStacks')
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" )

      console.log('no active card selected')
      //this is a test again
    })
  },
  methods: {
    stackSelected() {
      this.$store.commit('addStackToSelected', {stackId: this.stackId})

      this.$store.commit('setStackSelectedBoolean', {boolean: this.playfieldBoolean})

      let selectedStacks = this.$store.getters.getSelectedStacks

      if (selectedStacks.length === 0) {
        this.$store.commit('setStackSelectedBoolean', {boolean: undefined})

      }
        let totalScore = 0
        for (let stack of selectedStacks) {
            totalScore += stack.score
        }

        let activeCardValue = this.$store.getters.getActiveCard.value

        if (selectedStacks.length >= 2 && activeCardValue === totalScore) {
           //result = confirm("Would you like to group the selected stacks")
            $('#'+this.modalId2).modal('show')

        }

//        if (result) {
//
//          for (let stack of selectedStacks) {
//            console.log('selected stack id ', stack.stackId)
//
//            while (stack.cards.length !== 0) {
//              console.log('how long is this while running', stack.stackId)
//
//              this.$store.commit('stackDiscard', {stackId: stack.stackId})
//            }
//            this.$store.commit('removeStack', {stackId: stack.stackId})
//          }
//
//          let stacks = this.$store.getters.getStacks.filter(stack => this.playerId === stack.playerId && this.playfieldBoolean === stack.boolSide)
//
//          let stack = stacks[stacks.length - 1]
//
//          this.$store.commit('addCardToStack', {stackId: stack.stackId, card: this.$store.getters.getActiveCard})
//
//          this.$store.commit('removeActiveCardFromHand')
//          this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean})
//
//
//          // the previous stack has an instruction card, give the player a new empty stack
//          bus.$emit('cardDeselected')
//          this.$store.commit('setHasPlayed', {hasPlayed: true})
//
//          this.$store.commit('groupStacks', {yesOrNo: false})
//
//        }

    },
    groupStacks() {
      let selectedStacks = this.$store.getters.getSelectedStacks

        for (let stack of selectedStacks) {
          console.log('selected stack id ', stack.stackId)

          while (stack.cards.length !== 0) {
            console.log('how long is this while running', stack.stackId)

            this.$store.commit('stackDiscard', {stackId: stack.stackId})
          }
          this.$store.commit('removeStack', {stackId: stack.stackId})
        }

        console.log("<<<<<<< ", this.playerId)
        console.log("<<<<<<<<< ", this.playfieldBoolean)

        let stacks = this.$store.getters.getStacks.filter(stack => this.playerId === stack.playerId && this.playfieldBoolean === stack.boolSide)

        let stack = stacks[stacks.length - 1]

        this.$store.commit('addCardToStack', {stackId: stack.stackId, card: this.$store.getters.getActiveCard})

        this.$store.commit('removeActiveCardFromHand')
        this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean})


        // the previous stack has an instruction card, give the player a new empty stack
        bus.$emit('cardDeselected')
        this.$store.commit('setHasPlayed', {hasPlayed: true})

        this.$store.commit('groupStacks', {yesOrNo: false})
    },
    cardAddClicked () {
      this.$emit('cardAddClicked', this.id)

    },
    hide () {

    },
    stackClicked () {
      console.log('The stack knows a card was clicked')
    },
    cardClickedInStack(event, card) {
      console.log('card in stack was clicked')


    },
    addToStack() {
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" );
      $('button[stackId="'+this.stackId+'"]').popover({
        trigger: 'hover',
        delay: { "show": 200 }
      });
      $('button[stackId="'+this.stackId+'"]').popover('hide');

      console.log('add to stack was clicked')

      if (this.$store.getters.getActiveCard !== undefined) {
        console.log('active card is not undefined')

        console.log('current active card: ' + this.$store.getters.getActiveCard)

        // get the active card from the store
        let activeCard = this.$store.getters.getActiveCard
        // get the stack data model that goes with this stack component
        let thisStack = this.$store.getters.getStacks.find(stack => this.stackId === stack.stackId)

        switch (activeCard.type) {
          case 'I':
            console.log('the current active card is instruction')
            console.log('current active card: ' + this.$store.getters.getActiveCard)

            if (thisStack.cards.length === 0) {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean})
              bus.$emit('cardDeselected')

              // TODO: UNCOMMENT TO MAKE TURN BUTTON WORK AGAIN
              this.$store.commit('setHasPlayed', {hasPlayed: true})


            } else {
              // TODO: the stack is not empty, cannot add instuction card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert
                  $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add an instruction card to a non-empty stack. Try adding that card to a different stack." );

                  $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }
            break;
          case 'R':

            console.log('the current active card is repetition')
            console.log('current active card: ' + this.$store.getters.getActiveCard)

            if (thisStack.cards.length === 0) {
              //alert("You cannot add a repetition card to a stack without an instruction card. Try adding that card to a stack with an instruction card.")
              //img[value="'+selectboxvalue+'"]'



              $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a repetition card to a stack without an instruction card. Try adding that card to a stack with an instruction card." );

              $('button[stackId="'+this.stackId+'"]').popover('toggle')

            } else if (thisStack.stackTopCard().type === 'I' || thisStack.stackTopCard().type === 'G') {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              bus.$emit('cardDeselected')

              // TODO: UNCOMMENT TO MAKE TURN BUTTON WORK AGAIN
              this.$store.commit('setHasPlayed', {hasPlayed: true})


            } else {
              // TODO: the stack does not have instruction or group card on top, cannot add repetition card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert

                  $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a repetition card to a stack without an Instruction or Group card. Try adding that card to a stack with an Instruction or Group card." );

                  $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }


            break;

          case 'V':

            console.log('the current active card is a variable')
            console.log('current active card: ' + this.$store.getters.getActiveCard)
          if (thisStack.cards.length === 0) {

                $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a variable card to a stack without an instruction card. Try adding that card to a stack with an instruction card." );


                $('button[stackId="'+this.stackId+'"]').popover('toggle')
          } else if (thisStack.stackTopCard().type === 'R' && thisStack.stackTopCard().value === 1 ) {

              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              // the previous stack has an instruction card, give the player a new empty stack
              bus.$emit('cardDeselected')

              this.$store.commit('setHasPlayed', {hasPlayed:true})


            } else if (thisStack.stackTopCard().type === 'V' && thisStack.stackTopCard().value < activeCard.value) {

                // remove the existing variable card from the stack and add it to the discard pile
                this.$store.commit('stackDiscard', {stackId: this.stackId})

                this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard})

              this.$store.commit('removeActiveCardFromHand')

              this.$store.commit('setHasPlayed', {hasPlayed:true})


            } else {
              // TODO: the stack does not have instruction or group card on top, cannot add repetition card, display help message explaining
              // TODO: implement help message popups
              // for now, showing alert

                $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a variable card to a stack without a Variable (Rx) repetition card. Try adding that card to a stack with an variable Repetition Card (Rx)." );


                $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }


              break;

          default:
              console.log('unknown card type')
              break;
        }
        let stackList = this.$store.getters.getStacks.filter(stack => stack.playerId === this.playerId)
        let score = 0;
        for (let stack of stackList) {
          score += stack.score
        }

        if (this.trueFalse === this.$store.getters.getActiveSide) {
          this.$store.commit('setPlayerScore', {id: this.playerId, score: score})
        }

      }
    },
    addToStackClicked(event) {
        console.log('the add to stack button was clicked')
        this.addToStack()
    },
    drop (e) {
      console.log('a card was dragged to the stack')

      this.addToStack()


    }
  },
  components: {
    'card': Card,
    'modal': Modal
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#stack{
    background-color: #cff;
    min-width: 150px;
    min-height: 50px;
    color: #000;
  margin-top: 5px;
}

h1, h2 {
  font-weight: normal;
  font-size: 1em;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0; padding: 0;
  margin-top: 5px;
}

li {
  margin: 0;
  padding: 0;
  margin-right: 13px;
  display: inline-block;
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
