<template>

  <div class="container" @dragover.prevent @drop="drop" @ontouchend="drop"  @click="stackClicked()" @click.stop style="text-align: left; color: black;">
    <modal :modalId="modalId2" :modalTitle="groupSelectConfirm" :modalBody="groupSelectText" :cancel="true" :modalCards="[]" :modalCallback="() => {groupStacks()}" data-backdrop="static" data-keyboard="false"></modal>
    <div class="row">
      <div class="col-md-12">
        <span style="padding: 10px; font-size: 16px" v-if="showBtn || score > 0">Stack Score: {{ score }}</span>
      </div>
      <div class="col-md-12">
        <input v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" type="checkbox" :id="stackId" @click="stackSelected" :checked="selectedStacksLength">
        <label  v-if="activeCardIsGroup && cards.length > 0 && currentSelectedStacksMatch" for="stackId"><b>Group Select</b></label>
      </div>
      <div class="col-md-12" style="margin-left: 20px">
        <button
        style="margin-top: 7px;"
        class="btn btn-secondary"
        :class="buttonStyle"
        :stackId="this.stackId"
        @click="addToStackClicked"
        type="button"
        data-container="body"
        data-placement="top"
        data-trigger="hover"
        v-if="showBtn">
        Add
        </button>
      </div>

      <div class="col-md-12">
        <ul id="example-1">
        <li v-for="card in cards" style="zoom: 80%; margin: 4px">
        <card :cardData="card" v-on:cardClicked="cardClickedInStack(card, $event)" :inStack="true"></card>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  import { bus } from './Bus';
  import Card from './Card'
  import Modal from '../Modals/Modal';

/**
 * The component that holds what will be used as the true and false stacks
 * @file Stack.vue
 */
export default {
  name: 'Stack',
  props: ['playfieldBoolean', 'stackId', 'playerId'],
  data () {
    return {
      title: 'Stack',
      id: this.stackId,
      activeStack: '',
      dataContent: "hello",
      groupSelectConfirm: "Group Stacks",
      groupSelectText: "Would you like to group these stacks?"
    }
  },
  computed: {
    showBtn() {
      if(this.$store.state.activeCard !== undefined) {
        let activeCard = this.$store.state.activeCard.type;
        let thisStack = this.$store.getters.getStacks.find(stack => this.stackId === stack.stackId);
        if (this.$store.getters.getCoinMsg.valueOf() === this.playfieldBoolean && !this.$store.getters.getCurrentPlayer.hasPowerOutage) {

          if (activeCard === 'I' && thisStack.cards.length === 0) {
            return true;
          } else if (activeCard === 'R') {
            let rCount = 0;
            if(thisStack.cards.length !== 0 && (thisStack.stackTopCard().type !== 'R' || thisStack.stackTopCard().value !== 1)) {
              for(let i=0; i<thisStack.cards.length; i++){
                if(thisStack.cards[i].type === 'R'){
                  rCount++;
                }
              }
              if(rCount < 2){
                return true;
              }
            }
          } else if (activeCard === 'V' && thisStack.cards.length > 1 && thisStack.cards.length < 5) {
            if (thisStack.stackTopCard().type  === 'R' && thisStack.stackTopCard().value === 1) {
              return true;
            }
          }
        }
      }
      return false;
    },
    modalId2() {
      return this.id + "Modal"
    },
    cards() {

      if (this.playerId === this.$store.getters.getCurrentPlayerId ) {
        if (this.$store.getters.getCurrentPlayerStacks.length !== 0) {
          let stack = this.$store.getters.getCurrentPlayerStacks.find(stack => stack.stackId === this.stackId)
          if (stack !== undefined) {
            return stack.cards
          } else {
            return []
          }
        }
      } else {
        let stack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
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
    stackCss () {
      return 'stack'
    },
    buttonStyle() {
      return ''
    },
    score() {
        let thisStack = this.$store.getters.getStacks.find(stack => stack.stackId === this.stackId)
         thisStack.calculateStackScore();
          return thisStack.score;
    },
    activeCardIsGroup() {
        let thisActiveCard = this.$store.getters.getActiveCard

        if (thisActiveCard !== undefined && thisActiveCard.type === 'G') {
          return true;
        } else {
          return false;
        }
    },
    currentSelectedStacksMatch() {
      if (this.$store.getters.getCoinMsg.valueOf() === this.playfieldBoolean) {
        if (this.$store.getters.getSelectedStacksBoolean === undefined) {
          return true
        } else if (this.playfieldBoolean === this.$store.getters.getSelectedStacksBoolean) {
          return true;
        } else {
          return false;
        }
      }
    },
    selectedStacksLength () {
      let selectedStacks = this.$store.getters.getSelectedStacks;

      for (let stack of selectedStacks) {
          if (stack.stackId === this.stackId)
              return true;
      }
      return false;
    }
  },
  created: function () {
    bus.$on('cardClickedStack', (event, card) => {
      if (card.category !== 'stack') {
        if (card.selected === true) {
          this.activeCard = Object.assign({}, card);
          this.activeCard.category = 'stack';
          this.activeCard.selected = false
        }
      }
    });

    bus.$on('cardHasBeenSelected', () => {
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" )
    });

    bus.$on('cardDeselected', () => {
      this.activeCard = undefined
      this.$store.commit('setActiveCardUndefined')
      this.$store.commit('removeAllSelectedStacks')
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" )
    });

    bus.$on('aiAddToStack', (newStackId) => {
      this.activeStack = newStackId;
      if(this.$store.state.aiTurn === true) {
        if(this.$store.state.activeCard !== undefined) {
          if(this.stackId === newStackId.stackId) {
            this.activeStack = newStackId;
            this.addToStack();
            this.$store.state.aiTurn = false;
          }
        }
      }
    });

    bus.$on('aiGroup', (boolSide, currentPlayerId) => {
      if(this.$store.state.aiTurn === true && this.$store.state.activeCard !== undefined && this.playfieldBoolean === boolSide && this.playerId === currentPlayerId) {
        this.$store.commit('setStackSelectedBoolean', {boolean: boolSide});
        this.checked = true;
        this.groupStacks();
        this.$store.state.aiTurn = false;
      }
    });
  },
  methods: {
    stackSelected() {
      this.$store.commit('addStackToSelected', {stackId: this.stackId});
      this.$store.commit('setStackSelectedBoolean', {boolean: this.playfieldBoolean});
      let selectedStacks = this.$store.getters.getSelectedStacks;
      if (selectedStacks.length === 0) {
        this.$store.commit('setStackSelectedBoolean', {boolean: undefined})
      }
        let totalScore = 0;
        for (let stack of selectedStacks) {
            totalScore += stack.score
        }
        let activeCardValue = this.$store.getters.getActiveCard.value;
        if (selectedStacks.length >= 1 && activeCardValue === totalScore) {
            $('#'+this.modalId2).modal('show')
        }
    },
    groupStacks() {
      let groupingBonus = 5;
      if(this.$store.getters.getTutorialState){
        bus.$emit('cardPlayed');
        this.$store.commit('increaseFactIndex');
      }

      let selectedStacks = this.$store.getters.getSelectedStacks
        for (let stack of selectedStacks) {
          while (stack.cards.length !== 0) {
            this.$store.commit('stackDiscard', {stackId: stack.stackId})
          }
          this.$store.commit('removeStack', {stackId: stack.stackId})
        }
        let stacks = this.$store.getters.getStacks.filter(stack => this.playerId === stack.playerId && this.playfieldBoolean === stack.boolSide)
        let stack = stacks[stacks.length - 1];
        this.$store.commit('addCardToStack', {stackId: stack.stackId, card: this.$store.getters.getActiveCard});
        this.updateBonus(groupingBonus,groupingBonus);
        this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean});
        this.$store.dispatch('playerTookTurn');
        bus.$emit('cardDeselected');
        this.$store.commit('groupStacks', {yesOrNo: false});
      this.$store.dispatch('turn', true);
    },
    cardAddClicked () {
      this.$emit('cardAddClicked', this.id)
    },
    hide () {
    },
    stackClicked () {
    },
    cardClickedInStack(event, card) {
    },
    addToStack() {
      $('button[stackId="'+this.stackId+'"]').removeAttr( "data-content" );
      $('button[stackId="'+this.stackId+'"]').popover({
        trigger: 'hover',
        delay: { "show": 200 }
      });
      $('button[stackId="'+this.stackId+'"]').popover('hide');
      if (this.$store.getters.getActiveCard !== undefined) {
        let activeCard = this.$store.getters.getActiveCard;
        let thisStack = this.$store.getters.getStacks.find(stack => this.stackId === stack.stackId);
        if(this.$store.state.players[this.$store.state.activePlayer].isAi) {
          thisStack = this.activeStack;
        }

        switch (activeCard.type) {
          case 'I':
            if (thisStack.cards.length === 0) {
              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
              this.$store.dispatch('playerTookTurn');
              this.$store.commit('addStackToPlayer', {playerId: this.playerId, boolSide: this.playfieldBoolean})
              bus.$emit('cardDeselected');
              this.$store.getters.getCurrentPlayer.hasPlayedInstruction = true;
            } else {
                  $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add an instruction card to a non-empty stack. Instead add the card to a new stack" );
                  $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }
            break;
          case 'R':
            let repBonus = 3;
            if (thisStack.cards.length === 0) {
              $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a repetition card to a stack without an instruction card. Instead add the card to a stack with an instruction card." );
              $('button[stackId="'+this.stackId+'"]').popover('toggle')
            } else if (thisStack.stackTopCard().type === 'I' || thisStack.stackTopCard().type === 'G' || thisStack.stackTopCard().type === 'R' || thisStack.stackTopCard().type === 'V') {
              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
              this.$store.dispatch('playerTookTurn');
              bus.$emit('cardDeselected');
              this.updateBonus(repBonus,repBonus);
              this.$store.getters.getCurrentPlayer.repetitionBonus += repBonus;
            }else if(activeCard.value === 1 && thisStack.stackTopCard().type === 'R') {
              this.$store.commit('popCardFromStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
              this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
              this.$store.dispatch('playerTookTurn');
              bus.$emit('cardDeselected');
            } else if(thisStack.stackTopCard().type === 'R' && activeCard.value !== 1) {
              $('button[stackId="'+this.stackId+'"]').attr("data-content", "You can only replace a repetition card with a variable repetition card (Rx). Instead add the card to a stack with an Instruction or Group card." );
              $('button[stackId="'+this.stackId+'"]').popover('toggle')
            } else {
                  $('button[stackId="'+this.stackId+'"]').attr("data-content", "You cannot add a repetition card to a stack without an Instruction or Group card. Instead add the card to a stack with an Instruction or Group card." );
                  $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }
            break;

          case 'V':
            let varBonus = 2;
          if (thisStack.cards.length === 0) {
                $('button[stackId="'+this.stackId+'"]').attr("data-content", "You can only add variable cards to a stack with an open variable (Rx) repetition card or an existing variable card." );
                $('button[stackId="'+this.stackId+'"]').popover('toggle')
          } else if (thisStack.stackTopCard().type === 'R' && thisStack.stackTopCard().value === 1 ) {
            this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
            this.$store.dispatch('playerTookTurn');
            bus.$emit('cardDeselected');
            this.$store.getters.getCurrentPlayer.repetitionBonus += varBonus;
            this.updateBonus(varBonus,varBonus);
            } else if (thisStack.stackTopCard().type === 'V' && thisStack.stackTopCard().value < activeCard.value) {
                this.$store.commit('stackDiscard', {stackId: this.stackId});
                this.$store.commit('addCardToStack', {stackId: this.stackId, card: this.$store.getters.getActiveCard});
            this.$store.dispatch('playerTookTurn');
            } else {
                $('button[stackId="'+this.stackId+'"]').attr("data-content", "You can only add variable cards to a stack with an open variable (Rx) repetition card or an existing variable card." );
                $('button[stackId="'+this.stackId+'"]').popover('toggle')
            }

              break;

          case 'H':
            $('button[stackId="'+this.stackId+'"]').attr("data-content", "Hack cards are not played on a stack, you must open the opponent's stack to hack them." );
            $('button[stackId="'+this.stackId+'"]').popover('toggle');
            break;

          case 'G':
            $('button[stackId="'+this.stackId+'"]').attr("data-content", "Group cards are not played on a stack. Click the checkbox(es) to select the cards to group together. The total of the selected card(s) must equal the value of the group card." );
            $('button[stackId="'+this.stackId+'"]').popover('toggle');
                break;
          default:
              return '';
        }
      }
      if(this.$store.getters.getHasPlayed) {
        this.$store.dispatch('turn', true);
      }
    },
    addToStackClicked() {

      this.addToStack();
      if(this.$store.getters.getTutorialState){
        bus.$emit('cardPlayed');
        this.$store.commit('increaseFactIndex');
      }

      this.$store.commit('setActiveCardUndefined');
    },
    drop () {
      this.addToStack()
    },
    updateBonus(trueScore, falseScore){
      if(this.$store.getters.getActiveSide) {
        this.$store.commit('changeBonusScore', {
          id: this.$store.getters.getCurrentPlayer.id,
          trueScore: trueScore,
          falseScore: 0
        });
      } else if(!this.$store.getters.getActiveSide) {
        this.$store.commit('changeBonusScore', {
          id: this.$store.getters.getCurrentPlayer.id,
          trueScore: 0,
          falseScore: falseScore
        });
      }
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
  background-color: rgba(100, 149, 237, .50);
  min-width: 150px;
  min-height: 50px;
  color: #000;
  margin-top: 5px;
  padding-bottom:3px;
  border-radius: 8px;
  border: 1px solid gray;
  box-shadow: 4px 4px 9px 1px black;
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
