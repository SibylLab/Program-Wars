<template>
  <div id="player-info-panel">
    <div id="flexcontainer">
      <div id="tipBox" class="container" :style="displayStyle" :cardClicked="tipsCardSelected">
        <div class="panel panel-default" style="border-radius: 10px">
          <div class="panel-heading" style="border-radius: 10px"><h5>{{ tipsCardSelected }}</h5></div>
          <div class="panel-body">{{ tipsInfoText }}</div>
        </div>
      </div>
      <div id="cards">

        <ul id="example-1">
          <h4 class="modal-title"><b>{{ currentPlayerName }}</b>, It's Your Turn</h4>
          <li v-for="(card,index) in hand" :id="index">
            <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
          </li>
        </ul>
      </div>

      <div id="controls">
        <button class="btn btn-primary btn-lg rightSide" v-on:click="discardSelected" style="border-radius: 40px">
          Discard <br/> Selected Card
        </button>
      </div>

    </div>
    <div class="container" style="border-top: 1px solid white; padding: 10px;">
      <div class="row">
        <div class="col-md-12">
          <h4>Instructions To Win is: <b>{{ $store.getters.getScoreLimit }}</b></h4>
        </div>
      </div>
      <div class="row">
        <div :class="colSize" v-for="player in players" style="text-align: left;">
          <div style="float: left; margin-right: 10px;"><h4><b><a @click="openModal" style="cursor: pointer; color: rgba(10,1,1,0.79); font-size: 17px">{{ player.name }}:</a></b></h4></div>
          <div> True Path: {{ player.trueScore }} Instructions <br> False Path: {{ player.falseScore }} Instructions</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from './Bus';
  import Card from './Card'
  import Modal from './Modal'

  export default {
    name: 'PlayerInfoPanel',
    data () {
      return {
        title: 'Player Info Panel',
        idCounter: 6,
        modalText: "",
        modalCards: [],
        tipsToggle: true,
        factsToggle: true,
        indexOfFact: 0,
        tipsCardSelected:'Programming Wars Tutorial!',
        tipsInfoText: 'Welcome to the tutorial, the objective of this game is to get to the instruction score using good coding fundamentals. ' +
        'Click on the first instruction card to get started. If you get lost at any time click on the rules button in the top right!',
        facts: [
          'Great! You can either continue to build on top of your instruction or place another instruction in the false path.'
          + 'For this tutorial we\'re going to build on this instruction right now.',
          'This is the next step '
        ]
      }
    },
    computed: {
      colSize() {
        let size = 12/this.$store.getters.getPlayers.length;
        return 'col-sm-6 col-md-'+size;
      },
      players() {
        return this.$store.getters.getPlayers;
      },
      displayStyle() {
        if(this.$store.getters.getTips.fact) {
          return {'display':'block'}
        } else {
          return {'display':'none'}
        }
      },
      changeTrueFalse() {
        if (this.$store.getters.trueFalseAnim)
          return "trueFalse";
        else
          return ""
      },
      hasPlayed() {
        if (this.$store.getters.getHasPlayed)
          return "hasPlayed";
        else
          return ""
      },
      hand() {
        let hand = this.$store.getters.getCurrentPlayerHand;
        if (hand === null){
          return []
        } else {
          return hand.cards
        }
      },
      currentPlayerName() {
        return this.$store.getters.currentPlayerName;
      },
      activeSide() {
        let activeSideString = String(this.$store.getters.getActiveSide)
        return activeSideString.toUpperCase()
      }
    },
    components: {
      'card': Card,
      'modal': Modal
    },
    methods: {
      openModal() {
        $('.hack').modal('show');
      },
      discardSelected() {
        if (this.$store.getters.getActiveCard !== undefined) {
          this.$store.state.isDiscard = true;
          setTimeout(() => {
            this.$store.state.isDiscard = false;
          },1250);
          this.$store.commit('discardSelectedCard');
          this.$store.dispatch('playerTookTurn');
          this.$store.dispatch('turn', true);
        }
      },
      cardClicked (c) {
        if(this.$store.getters.getTips.tutorial) {
          this.tipsCardSelected = this.setTipBox(c);
        } else {
          this.tipsCardSelected = this.setTipBox('default');
        }
        let prevActive = this.$store.getters.getActiveCard;

        this.$store.commit('selectCard', c);
        if (prevActive !== undefined) {
          if (c.type !== 'G' || c.id !== prevActive.id) {
            this.$store.commit('removeAllSelectedStacks');
            this.$store.commit('setStackSelectedBoolean', {payload: undefined});
          }
        }
      },
      setTipBox(c) {
        console.log("setTipBox called");
        switch(c.type) {
          case 'I' :
            this.tipsInfoText =
              'Use this to create your program.' +
              ' Place it on either the "True" or "False" playing field.';
            return 'Instruction Card'; break;
          case 'R' :
            this.tipsInfoText = 'Play this card on top of an instruction or group card to repeat it.';
            return 'Repetition Card'; break;

          case 'V':
            this.tipsInfoText = 'Play this card on top of Variable Repetition cards to change the number of times an instruction or group card repeats.';
            return 'Variable Card'; break;

          case 'H':
            this.tipsInfoText = 'Use this card to remove cards from another player`s playing field. Group cards are immune to hacking.';
            return 'Hack Card'; break;

          case 'G' :
            this.tipsInfoText = 'Use this to combine instruction and group cards to protect them from Hack cards. The total of the instruction and group cards must match the value of this card';
            return 'Group Card'; break;

          default :
            var fact = this.setTutorialFact();
            this.tipsInfoText = fact;
            return 'Next Step!';
        }
      },
      setTutorialFact() {
        let retFact = this.facts[this.$store.getters.getFactIndex % this.facts.length];
        console.log(retFact);
        ++this.indexOfFact;
        return retFact;
      },
      deselectAll () {
        document.removeEventListener('click', this.hide);
        this.tipsCardSelected = this.setTipBox('default');
        bus.$emit('cardDeselected');
        this.$store.commit('setStackSelectedBoolean', {payload: undefined})

        this.$store.commit('setActiveCardUndefined');
        if(this.hand !== undefined) {
          for (let card of this.hand) {
            card.selected = false
          }
        }
      },
      removeTutorialCard (cardId) {
        this.$store.commit('removeCard', cardId)
      },
      setActiveCard(c) {
        this.$store.commit('selectCard', c)
      }
    },
    created: function () {
      bus.$on('hackCanceled', () => {
        this.deselectAll();
      }),
      bus.$on('activeCardAddedToStack', (cardId) => {
        this.removeTutorialCard(cardId);
        this.$store.commit('addCardToHand');
        console.log("Im in activeCardAddedToStack")
      }),
      bus.$on('tutorialOff', () => {
        this.tipsCardSelected = this.setTipBox('default');
      }),
      bus.$on('tutorialOn', () => {
        let c = this.$store.getters.getActiveCard;
        if(c === undefined) {
          this.tipsCardSelected = this.setTipBox('default');
        } else {
          this.tipsCardSelected = this.setTipBox(c);
        }
      }),
      bus.$on('aiDiscard', () => {
        this.discardSelected();
      }),
      bus.$on('cardPlayed', () => {
        console.log("WHY IS THIS NOT WORKING")
        this.tipsCardSelected = this.setTipBox('default');
      });
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hasPlayed {
    -webkit-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
    -moz-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
    box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);
  }

  #flexcontainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 10px;
    align-items: center;
  }

  #controls {
    display: flex;
    flex-direction: column;
    padding: 0px;
    justify-content: space-between;
    align-items: center;
    padding-right: 50px;
    flex-basis: content;
    flex-shrink:5;
    margin-top: -120px;
  }

  #cards {
    flex-grow: 4;
    align-self: flex-start;
  }


  #player-info-panel {
    background-color: #ccc;
  }

  #tipBox {
    position: relative;
    top: 0;
    max-width: 350px;
    height: 280px;
  }

  #playerTurn {
    position: absolute;
    top: 350px;
  }

  h1, h2, h3, h4, h5 {
    margin-top: 0px;
  }

  h1, h2 {
    font-weight: normal;
  }

  h4.boolState {
    margin-bottom: 0px;
    margin-top: 20px;
  }

  h4.playerName {
    /*margin-top: 10px;*/
    padding-top:10px;
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

  .endTurnButton {
    width: 200px;
    height: 100px;
  }

  .rightSide {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 80px;
  }

  .trueFalse {

    animation: cssAnimation 3s 16 ease-in-out;
  }
  @keyframes cssAnimation {
    from { -webkit-transform: rotate(0deg) scale(1) skew(0deg) translate(0px); }
    to { -webkit-transform: rotate(720deg) scale(1) skew(0deg) translate(0px); }
  }

  /*ul:first-child {*/
    /*position:relative;!* bring on top;*!*/
    /*box-shadow:0 0 0 10px rgba(0,0,0,0.65);!* dark around it *!*/
  /*}*/

</style>
