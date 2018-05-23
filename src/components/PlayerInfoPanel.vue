<template>
    <div id="player-info-panel">
      <div id="flexcontainer">
        <div id="tipBox" class="container" :style="displayStyle" :cardClicked="tipsCardSelected">
          <div class="panel panel-default" style="border-radius: 10px">
            <div class="panel-heading" style="border-radius: 10px"><h5>{{ tipsCardSelected }}</h5></div>
            <div class="panel-body">{{ tipsInfoText }}</div>
          </div>
        </div>
        <div class="container" style="width: 900px; float: left">
        <div class="row">
        <div id="cards">

          <ul id="example-1">
            <h4 class="modal-title"><b>{{ currentPlayerName }}</b>, It's Your Turn</h4>
              <li v-for="(card) in hand">
                  <card :cardData="card" v-on:cardClicked="cardClicked" @setActiveCard="setActiveCard"></card>
              </li>
          </ul>
        </div>
        </div>
        <div class="row">
          <div id="controls" class="col-sm">
            <button class="btn btn-primary btn-lg rightSide" v-on:click="discardSelected" style="border-radius: 40px">
              Discard <br/> Selected Card
            </button>
          </div>
        </div>
        </div>

        <div class="container-fluid rounded" id="disabilityPanel" style="border-radius: 40px">
          <div class="row">
            <div class="col-sm">
            <div class="panel panel-default">
              <div class="panel-heading">Perks/Disabilities</div>
              <div class="panel-body">Number of Viruses: {{getCurrentPlayer.numViruses}}</div>
              <div class="panel-body" v-if="getCurrentPlayer.hasPowerOutage">You have a power outage! </div>
              <div class="panel-body" v-if="getCurrentPlayer.hasAntiVirus">You're Protected From Viruses </div>
              <div class="panel-body" v-if="getCurrentPlayer.hasGenerator">You're Protected From Power Outages </div>
              <div class="panel-body" v-if="getCurrentPlayer.hasFirewall">You're Protected From Hacks </div>
            </div>
            </div>
          </div>
          <br>

      </div>
      </div>
      <!--<div class="container">-->
        <!--<div class="row">-->
          <!--<div class="col-lg">You have a virus</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="container" style="border-top: 1px solid white; padding: 10px;">
        <div class="row">
          <div class="col-md-12">
            <h4>Instructions To Win is: <b>{{ $store.getters.getScoreLimit }}</b></h4>
          </div>
        </div>
        <div class="row">
          <div :class="colSize" v-for="player in players" style="text-align: left;">
            <div style="float: left; margin-right: 10px;"><h4><b><a @click="openModal" style="cursor: pointer; color: rgba(10,1,1,0.79); font-size: 17px">{{ player.name }}:</a></b></h4></div>
              <div> True Path: {{ (player.trueScore - player.infectedAmountTrue) + player.overclockIncreaseTrue }}
                Instructions <br> False Path: {{ (player.falseScore - player.infectedAmountFalse) + player.overclockIncreaseFalse }} Instructions</div>
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
      tipsCardSelected:'Did you know?',
      tipsInfoText: 'You can toggle on or off this information window by checking the \"FUN FACTS\" box in the top right corner. ' +
      'You can also turn off the tutorials but keep the fun facts by checking the \"TUTORIAL\" box.',
      facts: [
        'The first high-level programming language was FORTRAN. invented in 1954 by IBM’s John Backus.',
        'The first computer programmer was Ada Lovelace, a woman.',
        'A \"Hello, World!\" program is often the first program written when learning a new programming language.',
        'The first electronic computer ENIAC weighed more than 27 tons and took up 1800 square feet.',
        'Only about 10% of the world’s currency is physical money, the rest only exists on computers.',
        'TYPEWRITER is the longest word that you can write using the letters only on one row of the keyboard of your computer.',
        'Doug Engelbart invented the first computer mouse in around 1964 which was made of wood.',
        'There are more than 5000 new computer viruses are released every month.',
        'Around 50\% of all Wikipedia vandalism is caught by a single computer program with more than 90\% accuracy.',
        'In programming, counting starts at 0, not 1.',
        ' If there was a computer as powerful as the human brain, it would be able to do 38 thousand trillion operations per second and hold more than 3580 terabytes of memory.',
        'The password for the computer controls of nuclear tipped missiles of the U.S was 00000000 for eight years.',
        'Approximately 70% of virus writers are said to work under contract for organized crime syndicates.',
        'HP, Microsoft and Apple have one very interesting thing in common – they were all started in a garage.',
        'An average person normally blinks 20 times a minute, but when using a computer he/she blinks only 7 times a minute.',
        'The house where Bill Gates lives, was designed using a Macintosh computer.',
        'The first ever hard disk drive was made in 1979, and could hold only 5MB of data.',
        'The first 1GB hard disk drive was announced in 1980 which weighed about 550 pounds, and had a price tag of $40,000.',
        'More than 80% of the emails sent daily are spams.',
        'A group of 12 engineers designed IBM PC and they were called \"The Dirty Dozen\"',
        'The original name of Windows was \"Interface Manager\".',
        'The first microprocessor created by Intel was the 4004. It was designed for a calculator, and in that time nobody imagined where it would lead.',
        'IBM 5120 from 1980 was the heaviest desktop computer ever made. It weighed about 105 pounds, not including the 130 pounds external floppy drive.',
        'Genesis Device demonstration video in Star Trek II: The Wrath of Khan was the the first entirely computer generated movie sequence in the history of cinema. That studio later become Pixar.',
        'In 1833 a man by the name of Charles Babbage invented all the parts that are now used for a modern computer. But it was only 120 years later that the first ‘modern’ computers were invented.',
        'The Motion Picture Academy refused to nominate Tron (1982) for a special-effects award because, according to director Steven Lisberger, \"The Academy thought we cheated by using computers\".',
        ' John Lasseter (CEO of Pixar) was fired from Disney for promoting computer animation.',
        'CAPTCHA is an acronym for \"Completely Automated Public Turing test to tell Computers and Humans Apart\"',
        'You will not be affected by viruses just by opening an email. It is only activated when you click a link or access an attachment.',
        'MyDoom was the fastest-spreading virus ever created. The total damage done by MyDoom is a whopping $38 billion.',
        '9 out of 10 of the world’s supercomputers run on Linux.',
        'E-mail has been around longer than the World Wide Web.',
        'In the 1980s, an IBM computer wasn’t considered 100% compatible unless it could run Microsoft Flight Simulator*.',
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
              return "trueFalse"
          else
              return ""
      },
      hasPlayed() {
        if (this.$store.getters.getHasPlayed)
            return "hasPlayed"
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
    getCurrentPlayer() {
      return this.$store.getters.getCurrentPlayer;
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
      let prevActive = this.$store.getters.getActiveCard
      if(c.type === 'VIRUS'){
        $('.virus').modal('show')
      } else if(c.type === 'POWEROUTAGE'){
        $('.powerOutage').modal('show');
      } else if(c.type === 'BATTERYBACKUP') {
        $('.batteryBackup').modal('show');
      } else if(c.type === 'OVERCLOCK'){
        $('.overclock').modal('show');
      }
      this.$store.commit('selectCard', c)
      if (prevActive !== undefined) {
        if (c.type !== 'G' || c.id !== prevActive.id) {
          this.$store.commit('removeAllSelectedStacks')
          this.$store.commit('setStackSelectedBoolean', {payload: undefined})
        }
      }
    },
    setTipBox(c) {
        switch(c.type) {
          case 'I' :
            this.tipsInfoText =
            'Use this to create your program.' +
            ' Place it on either the chosen path.';
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
            return 'Overclock Card'; break;

          case 'POWEROUTAGE':
            this.tipsInfoText = 'Use this card on an opponent to prevent them from playing instruction cards.';
            return 'PowerOutage Card'; break;

          case 'BATTERYBACKUP':
            this.tipsInfoText = 'Use this to be able to play instruction cards. (Negate Power Outage)';
            return 'BatteryBackup Card'; break;

          default :
            let fact = this.setFact();
            this.tipsInfoText = fact;
            return 'Did you know?';
        }
    },
    setFact() {
      let num = Math.floor(Math.random() * this.facts.length);
      return this.facts[num];
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
    removeCard (cardId) {
      this.$store.commit('removeCard', cardId)
    },
    setActiveCard(c) {
      this.$store.commit('selectCard', c)
    }
  },
  created: function () {
    bus.$on('hackCanceled', () => {
      this.deselectAll();
    });
    bus.$on('activeCardAddedToStack', (cardId) => {
      this.removeCard(cardId)
      this.$store.commit('addCardToHand')
    });
    bus.$on('tutorialOff', () => {
        this.tipsCardSelected = this.setTipBox('default');
    });
    bus.$on('tutorialOn', () => {
        let c = this.$store.getters.getActiveCard;
        if(c === undefined) {
          this.tipsCardSelected = this.setTipBox('default');
        } else {
          this.tipsCardSelected = this.setTipBox(c);
        }
    });
    bus.$on('aiDiscard', () => {
      this.discardSelected();
    })
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
    //position: relative;
    //top: 0;
    max-width: 350px;
    //height: 280px;
    vertical-align: middle;
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
