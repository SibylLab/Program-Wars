<template>
  <div id="player-info-panel">
    <div id="flexcontainer">
      <div id="tipBox" class="container" :style="displayStyle" :cardClicked="tipsCardSelected">
        <div class="panel panel-default" style="border-radius: 10px">
          <div class="panel-heading" style="border-radius: 10px"><h5>{{ tipsCardSelected }}</h5></div>
          <div class="panel-body">{{ tipsInfoText }}</div>
          <button class="btn btn-primary" v-if="showTextBoxButton" @click="removeAnimation()" style="align-content: right">OK</button>
          <br v-if="showTextBoxButton"><br v-if="showTextBoxButton">
        </div>
      </div>
      <div id="cards">

        <ul id="example-1">
          <h4 class="modal-title"><b>{{ currentPlayerName }}</b>, It's Your Turn</h4>
          <li v-for="(card,index) in hand" :id="card.type + card.value + index">
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
        tipsInfoText: 'Welcome to the tutorial, you can find tips on what on what to do next here. ' +
        'Click on the first instruction card and place it in the true path to get started. If you get lost at any time click on the rules button in the top right!',
        facts: [
          'This path is not looking very strong, let\'s add another instruction to the true path.',
          'Great! The first path is started, let\'s place an instruction in the false path.',
          'Either of your paths could be attacked by a hack card, which would ruin your stack. Group cards can be used on' +
          ' one or more stacks of cards that equal up to the group card value. Let\'s protect your true path with'
          + ' a group card. Click on the check boxes above the cards in your true path to group them.',
          'It\'s time to build up one of our paths. Add the repetition card to your true path. This will allow you'
          + ' to add a variable on top of it to change how often it repeats.',
          'The computer is getting closer to completing a path. He has no grouped stacks, so use the hack card on one of its stacks to set him back.',
          'You\'re getting close to completing a path, add the variable (4) card to build up your true path. This will bring you up to 12 instructions.',
          'Your false path is not looking very solid, add the Repetition (3) card to your false path to get a score of 9 in that path.',
          'You can complete your truth path! Add the instruction card to complete it and give yourself a 50/50 shot of winning each round.',
          'That\'s the end of the tutorial, you can continue playing until you win or click \'End Tutorial\' in the top right corner. '
        ],
        showTextBoxButton: true,
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
      },

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
      /**
       * This changes gathers which instruction to display in the text box
       * @param c The type of card played or default for a fact.
       * @returns {string} This returns the string that will be displayed.
       */
      setTipBox(c) {
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

<<<<<<< HEAD
          case 'FIREWALL':
          this.tipsInfoText = 'Use this to remove the chance of being hacked.';
          return 'Firewall Card'; break;

          case 'GENERATOR':
          this.tipsInfoText = 'Use this card to prevent prevent a power outage.';
          return 'Generator Card'; break;

          case 'ANTIVIRUS':
          this.tipsInfoText = 'Use this card to prevent all viruses.';
          return 'AntiVirus Card'; break;

          case 'VIRUS':
          this.tipsInfoText = 'Use this on an opponent to cut their current score in half.';
          return 'Virus Card'; break;

          case 'OVERCLOCK':
          this.tipsInfoText = 'Use this card to double your current score.';
          return 'OverClock Card'; break;

          case 'POWEROUTAGE':
          this.tipsInfoText = 'Use this card on an opponent to prevent them from playing instruction cards.';
          return 'PowerOutage Card'; break;

          case 'BATTERYBACKUP':
          this.tipsInfoText = 'Use this to be able to play instruction cards. (Negate Power Outage)';
          return 'BatteryBackup Card'; break;

=======
>>>>>>> 27b2cad457a8e8833132432cee4ca9f65479a564
          default :
            var fact = this.setTutorialFact();
            this.tipsInfoText = fact;
            return 'Next Step!';
        }
      },
      setTutorialFact() {
        let retFact = this.facts[this.facts.length-1];
        if(this.$store.getters.getFactIndex < this.facts.length) {
          retFact = this.facts[this.$store.getters.getFactIndex];
        }
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
      },
      removeAnimation() {
        $('#tipBox').removeClass('animated bounce');
        this.showTextBoxButton = !this.showTextBoxButton;
      }

    },
    created: function () {
      bus.$on('hackCanceled', () => {
        this.deselectAll();
      }),
      bus.$on('activeCardAddedToStack', (cardId) => {
        if(this.$store.getters.getTutorialState) {
          this.removeTutorialCard(cardId);
          this.$store.commit('addCardToHand');
        }
      }),
      bus.$on('aiDiscard', () => {
        this.discardSelected();
      }),
        bus.$on('playAnimation', () =>{
          $('#tipBox').addClass('animated bounce');
      }),
      bus.$on('cardPlayed', () => {
        this.tipsCardSelected = this.setTipBox('default');
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  @-webkit-keyframes myfirst
  {
    from {-webkit-box-shadow: 0 0 24px 6px rgb(247, 255, 0);}
    to {box-shadow : none;}
  }

  @-moz-keyframes myfirst
  {
    from {-moz-box-shadow: 0 0 24px 6px rgb(247, 255, 0);}
    to {box-shadow : none;}
  }
  @keyframes myfirst
  {
    from {box-shadow: 0 0 24px 6px rgb(247, 255, 0);}
    to {box-shadow : none;}
  }
  /**
   *this is for highlighting the card path that the player should take
   */
  li#I30, li#G30, li#R10, li#V40, li#H00, li#I10, li#I20, li#R30{
    -webkit-animation: myfirst 0.8s 98765432;
    -moz-animation: myfirst 0.8s 98765432;
    animation: myfirst 0.8s 98765432;
    -webkit-animation-delay: 4s;
    -moz-animation-delay: 4s;
    animation-delay: 4s;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }



  .hasPlayed {
    /*-webkit-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);*/
    /*-moz-box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);*/
    /*box-shadow: 0px 0px 24px 4px rgba(0,255,60,1);*/
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
    -webkit-animation-duration: 1.5s;
    -webkit-animation-delay: 0s;
    -webkit-animation-iteration-count: infinite;

    -moz-animation-duration: 1.5s;
    -moz-animation-delay: 0s;
    -moz-animation-iteration-count: infinite;

    animation-duration: 1.5s;
    animation-delay: 0s;
    animation-iteration-count: infinite;

    position: relative;
    top: 0;
    max-width: 350px;
    height: 280px;
  }


  #tipBox:hover {
    /*-webkit-animation:hoverColor infinite;*/
    -webkit-animation: none;
    -moz-animation: none;
    animation: none;

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


</style>
