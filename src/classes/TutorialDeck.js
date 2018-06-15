/**
 * @file TutorialDeck.js file
 * @author Jace Riehl on 2018-05-08.
 */
import Card from './Card'

const instruction1 = 7;
const instruction2 = 7;
const instruction3 = 7;

const group2 = 1;
const group3 = 2;
const group4 = 3;
const group5 = 2;
const group6 = 1;

const repetition2 = 4;
const repetition3 = 4;
const repetition4 = 0;
const repetitionX = 5;

const variable3 = 4;
const variable4 = 3;
const variable5 = 3;
const variable6 = 1;

const hack = 3;
const virus = 3;
const powerOutage = 3;

const overClock = 3;
const batteryBackup = 3;

const antiVirus = 1;
const firewall = 1;
const generator = 1;


const cardDeck = [
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'I', cardValue: 3, imgSrc: '/static/cardImg/I3.png', howMany: instruction3},
  {type:'I', cardValue: 2, imgSrc: '/static/cardImg/I2.png', howMany: instruction2},
  {type:'R', cardValue: 1, imgSrc: '/static/cardImg/Rx.png', howMany: repetitionX},
  {type:'G', cardValue: 3, imgSrc: '/static/cardImg/G3.png', howMany: group3},


  {type:'V', cardValue: 3, imgSrc: '/static/cardImg/V3.png', howMany: variable3},
  {type:'I', cardValue: 2, imgSrc: '/static/cardImg/I2.png', howMany: instruction2},
  {type:'I', cardValue: 2, imgSrc: '/static/cardImg/I2.png', howMany: instruction2},
  {type:'R', cardValue: 2, imgSrc: '/static/cardImg/R2.png', howMany: repetition2},
  {type:'G', cardValue: 2, imgSrc: '/static/cardImg/G2.png', howMany: group2},

  {type:'V', cardValue: 5, imgSrc: '/static/cardImg/V5.png', howMany: variable5},
  {type:'R', cardValue: 4, imgSrc: '/static/cardImg/R4.png', howMany: repetition4},
  {type:'I', cardValue: 3, imgSrc: '/static/cardImg/I3.png', howMany: instruction3},


  {type:'R', cardValue: 2, imgSrc: '/static/cardImg/R2.png', howMany: repetition2},
  {type:'R', cardValue: 3, imgSrc: '/static/cardImg/R3.png', howMany: repetition3},

  {type:'R', cardValue: 3, imgSrc: '/static/cardImg/R3.png', howMany: repetition3},

  {type:'V', cardValue: 4, imgSrc: '/static/cardImg/V4.png', howMany: variable4},
  {type:'V', cardValue: 6, imgSrc: '/static/cardImg/V6.png', howMany: variable6},


  {type:'OVERCLOCK', cardValue: 0, imgSrc: '/static/cardImg/OverClock.png', howMany: overClock},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'GENERATOR', cardValue: 0, imgSrc: '/static/cardImg/Generator.png', howMany: generator},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'POWEROUTAGE', cardValue: 0, imgSrc: '/static/cardImg/PowerOutage.png', howMany: powerOutage},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'ANTIVIRUS', cardValue: 0, imgSrc: '/static/cardImg/AntiVirus.png', howMany: antiVirus},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'VIRUS', cardValue: 0, imgSrc: '/static/cardImg/Virus.png', howMany: virus},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'FIREWALL', cardValue: 0, imgSrc: '/static/cardImg/Firewall.png', howMany: firewall},
  {type:'I', cardValue: 1, imgSrc: '/static/cardImg/I1.png', howMany: instruction1},
  {type:'H', cardValue: 0, imgSrc: '/static/cardImg/H.png', howMany: hack},
  {type:'V', cardValue: 3, imgSrc: '/static/cardImg/V3.png', howMany: variable3},
  {type:'V', cardValue: 5, imgSrc: '/static/cardImg/V5.png', howMany: variable5},
];

/**
 * This is the object repesentaiton of the tutorial's deck
 */
export default class TutorialDeck {
  /**
   * The constructor for the Deck class
   * @constructor Deck
   */
  constructor(){
    this.cards = [];
    this.discard_cards = [];
  };

  /**
   * initDeck function to initialize the deck with a pre determined number and type of cards
   * @memberOf Deck
   */
  initDeck(value) {
    let cardId = 0;
    for(let k = 0; k < value; k++) {
      for (let i = 0; i < cardDeck.length; i++) {

          this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc));
          cardId++;

      }
    }
  };//end Init game

  /**
   * draw function returns the card at the front (top) of the deck and removes it from the deck
   * @memberOf Deck
   * @returns {Card}
   */
  draw() {
    let card = this.cards[0];//[0] is the top of the deck
    this.cards.shift();//unshift removes the first element.
    return card;
  };

}
