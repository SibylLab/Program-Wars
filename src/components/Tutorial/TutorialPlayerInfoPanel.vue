<template xmlns="http://www.w3.org/1999/html">
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
      <div class="container" style="width: 900px; float: left">
        <div class="row">
          <div id="cards">

            <ul id="example-1">
              <h4 class="modal-title"><b>{{ currentPlayerName() }}</b>, It's Your Turn</h4>
              <li v-for="(card,index) in hand" :id="card.type + card.value + index + currentPlayerName()">
                <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div id="controls" class="col-sm" style="height: 80px; justify-content: center; align-items: center">
            <button class="btn btn-primary btn-lg" v-on:click="discardSelected" style="border-radius: 40px">
              Discard <br/> Selected Card
            </button>
          </div>
        </div>
      </div>
      <display-used-cards></display-used-cards>

    </div>
    <div class="container" style="border-top: 1px solid white; padding: 10px;">
      <div class="row">
        <div class="col-md-12">
          <h4>Instructions To Win is: <b>{{ getScoreLimit() }}</b></h4>
        </div>
      </div>
      <div class="row">
        <div :class="colSize" v-for="player in players" style="text-align: left;">
          <div style="float: left; margin-right: 10px;"><h4><b><a @click="openModal" style="cursor: pointer; color: rgba(10,1,1,0.79); font-size: 17px">{{ player.name }}:</a></b></h4></div>
          <div>
            True Path:&nbsp;
            <meter :max="getScoreLimit()" min=0
                   :value="getScore(player.id).trueScore"
                   :high="getScoreLimit()/2"
                   :low="getScoreLimit()/3"
                   :optimum="getScoreLimit()-5"
                   style="width: 150px"
            ></meter>
            <br>
            False Path:
            <meter :max="getScoreLimit()" min=0
                   :value="getScore(player.id).falseScore"
                   :high="getScoreLimit()/2"
                   :low="getScoreLimit()/3"
                   :optimum="getScoreLimit()-5"
                   style="width:150px"
            ></meter>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { bus } from '../SharedComponents/Bus';
  import Card from '../SharedComponents/Card'
  import Modal from '../Modals/Modal'
  import StatsPanel from '../SharedComponents/StatsPanel'
  import DisplayUsedCards from '../SharedComponents/DisplayUsedCards'
  import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'

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
          'Your false path needs an instruction, let\'s add one to the false path.',
          'Great! Your paths are started, let\'s place another instruction in the true path.',
          'It\'s time to build up one of our paths. Add the repetition card to your flase path. This will allow you'
          + ' to add a variable on top of it to change how often it repeats.',
          'Either of your paths could be attacked by a hack card, which would ruin your stack. Group cards can be used on' +
          ' one or more stacks of cards in one path that equal up to the group card value. Let\'s protect your true path with'
          + ' a group card. Click on the check boxes above the cards in your true path to group them. You also get a small bonus for using group cards.',
          'You\'re getting closer to completing a path, add the variable (5) card to build up your false path.',
          'The computer has at least one stack that isn\'t grouped, so use the hack card on one of its stacks to set him back.',
          'Your false path is vulnerable to getting hacked, but you dont have any more group card. Use the Firewall card to get full protection from hack cards.',
          'The computer is vulnerable to getting a virus, send him a virus to slow down his program and half their total instructions.',
          'Speaking of being vulnerable to viruses, you\'re also vulnerable. Let\'s use an AntiVirus to protect you from all further viruses',
          'You have one more attack card in your hand. Use the Power Outage card to stop your opponent from playing instruction cards.',
          'With our last attack card of course we have a protection card. You can play a generator to reverse a power outage and prevent them or just use a '+
          'Battery Backup to reverse it. Let\'s use the generator.',
          'We have one last card to use. Maybe our most powerful. Let\'s use a overclock card to speed up your pc to run double the instructions.',
          'Congratulations, you\'ve completed the tutorial! You can continue playing or click \'End Tutorial\' in the top right corner.'
        ],
        showTextBoxButton: true,
      }
    },
    computed: {

      colSize() {
        let size = 12/this.getPlayers().length;
        return 'col-sm-6 col-md-'+size;
      },
      players() {
        return this.getPlayers();
      },
      displayStyle() {
        if(this.getTips().fact) {
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
        if (this.getHasPlayed())
          return "hasPlayed";
        else
          return ""
      },
      hand() {
        let hand = this.getCurrentPlayerHand();
        if (hand === null){
          return []
        } else {
          return hand.cards
        }
      },
      activeSide() {
        let activeSideString = String(this.$store.getters.getActiveSide)
        return activeSideString.toUpperCase()
      },

    },
    components: {
      'card': Card,
      'modal': Modal,
      'stats-panel': StatsPanel,
      'display-used-cards': DisplayUsedCards
    },
    methods: {
      ...mapActions([
        'playerTookTurn',
        'turn'
      ]),
      ...mapGetters([
        'getPlayers',
        'getActiveCard',
        'getActiveSide',
        'getTips',
        'getTutorialState',
        'getHasPlayed',
        'getCurrentPlayer',
        'getScoreLimit',
        'getCurrentPlayerHand',
        'currentPlayerName',
        'getTutorialState',
        'getFactIndex'
      ]),
      ...mapMutations([
        'discardSelectedCard',
        'selectCard',
        'removeAllSelectedStacks',
        'setStackSelectedBoolean',
        'setActiveCardUndefined',
        'removeCard',
        'addCardToHand',
        'giveVirus',
        'givePowerOutage',
        'giveFirewall',
        'giveGenerator',
        'giveAntiVirus',
        'giveOverclock',
        'giveBatteryBackup'
      ]),
      ...mapState([
        'isDiscard',
        'aiTurn',
        'activeCard'
      ]),
      getScore(player){
        let trueSide = 0;
        let falseSide = 0;
        trueSide = this.getPlayers()[player].trueScore + this.getPlayers()[player].bonusTrue;
        falseSide = this.getPlayers()[player].falseScore + this.getPlayers()[player].bonusFalse;
        if(this.getPlayers()[player].hasVirus){
          trueSide = trueSide/2;
          falseSide = falseSide/2;
        } else if(this.getPlayers()[player].hasOverclock){
          trueSide = trueSide*2;
          falseSide = falseSide*2
        }
        return {trueScore: trueSide, falseScore: falseSide }
      },
      openModal() {
        $('.hack').modal('show');
      },
      discardSelected() {
        if (this.getActiveCard() !== undefined) {
          this.isDiscard = true;
          setTimeout(() => {
            this.isDiscard = false;
          },1250);
          this.discardSelectedCard();
          this.playerTookTurn();
          this.turn(true);
        }
      },
      cardClicked (c) {
        if(this.hand[0] === c || this.getFactIndex() >= this.facts.length) {
          if (this.getTips().tutorial) {
            this.tipsCardSelected = this.setTipBox(c);
          } else {
            this.tipsCardSelected = this.setTipBox('default');
          }
          let prevActive = this.getActiveCard();
          if (c.type === 'VIRUS') {
            $('.virus').modal('show')
          } else if (c.type === 'POWEROUTAGE') {
            $('.powerOutage').modal('show');
          } else if (c.type === 'BATTERYBACKUP') {
            $('.batteryBackup').modal('show');
          } else if (c.type === 'OVERCLOCK') {
            $('.overclock').modal('show');
          } else if (c.type === 'FIREWALL') {
            $('.firewall').modal('show');
          }
          else if (c.type === 'GENERATOR') {
            $('.generator').modal('show');
          }
          else if (c.type === 'ANTIVIRUS') {
            $('.antiVirus').modal('show');
          }
          this.selectCard(c);
          if (prevActive !== undefined) {
            if (c.type !== 'G' || c.id !== prevActive.id) {
              this.removeAllSelectedStacks();
              this.setStackSelectedBoolean({payload: undefined});
            }
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


          default :
            let fact = this.setTutorialFact();
            this.tipsInfoText = fact;
            return 'Next Step!';
        }
      },
      setTutorialFact() {
        let retFact = this.facts[this.facts.length];
        if(this.getFactIndex() < this.facts.length) {
          retFact = this.facts[this.getFactIndex()];
        }
        ++this.indexOfFact;
        return retFact;
      },
      deselectAll () {
        document.removeEventListener('click', this.hide);
        this.tipsCardSelected = this.setTipBox('default');
        bus.$emit('cardDeselected');
        this.setStackSelectedBoolean({payload: undefined})

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
        this.selectCard(c)
      },
      removeAnimation() {
        $('#tipBox').removeClass('animated bounce');
        this.showTextBoxButton = !this.showTextBoxButton;
      }

    },
    created: function () {
      bus.$on('hackCanceled', () => {
        this.deselectAll();
      });
      bus.$on('activeCardAddedToStack', (cardId) => {
        if(this.getTutorialState()) {
          this.removeTutorialCard(cardId);
          this.addCardToHand();
        }
      });
      bus.$on('aiDiscard', () => {
        this.discardSelected();
      });
        bus.$on('playAnimation', () =>{
          $('#tipBox').addClass('animated bounce');
      });
      bus.$on('cardPlayed', () => {
        this.tipsCardSelected = this.setTipBox('default');
      });
      bus.$on('aiAttack', (stackToHack) => {
        if(this.getTutorialState()) {
          if (this.aiTurn === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'POWEROUTAGE') {

                $('.powerOutage').modal('hide');
                this.givePowerOutage(stackToHack.playerId);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
              else if (this.getActiveCard().type === 'VIRUS') {

                $('.virus').modal('hide');
                this.giveVirus(stackToHack.playerId);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
            }
          }
        }
      });

      bus.$on('aiProtection', () => {
        if(this.getTutorialState()) {
          if (this.aiTurn === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'FIREWALL') {
                $('.firewall').modal('hide');
                this.giveFirewall(this.getCurrentPlayer().id);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
              else if (this.getActiveCard().type === 'ANTIVIRUS') {
                $('.antiVirus').modal('hide');
                this.giveAntiVirus(this.getCurrentPlayer().id);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
              else if (this.getActiveCard().type === 'GENERATOR') {
                $('.generator').modal('hide');
                this.giveGenerator(this.getCurrentPlayer().id);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
            }
          }
        }
      });

      bus.$on('aiEnhance', () => {
        if(this.getTutorialState()){
          if (this.aiTurn === true) {
            if (this.activeCard !== undefined) {
              if (this.getActiveCard().type === 'BATTERYBACKUP') {
                $('.batteryBackup').modal('hide');
                this.giveBatteryBackup(this.getCurrentPlayer().id);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
              else if (this.getActiveCard().type === 'OVERCLOCK') {
                $('.batteryBackup').modal('hide');
                this.giveOverclock(this.getCurrentPlayer().id);
                this.playerTookTurn();
                bus.$emit('cardDeselected');
                if (this.getHasPlayed()) {
                  this.turn(true);
                }
                this.aiTurn = false;
              }
            }
          }
        }
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
  li#I30You, li#G30You, li#R10You, li#V50You, li#H00You, li#I10You, li#I20You, li#R30You, li#VIRUS00You,li#POWEROUTAGE00You,
  li#ANTIVIRUS00You,li#GENERATOR00You,li#FIREWALL00You,li#OVERCLOCK00You{
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
    vertical-align: middle;
  //justify-content: space-between;
    align-items: center;
  //padding-right: 50px;
    flex-basis: content;
    flex-shrink: 5;
  //margin-top: -120px;
  }

  #disabilityPanel {
    top: 0;
    width: 300px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    padding: 0;
    padding-right: 80px;
    flex-basis: content;
    flex-shrink: 3;
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
