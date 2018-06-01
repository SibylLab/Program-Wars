/**
 * @file Deck.js file
 * @author Lance on 2017-03-10.
 */
import Card from './Card'

const instruction1 = 9;
const instruction2 = 9;
const instruction3 = 9;
// const instruction4 = 0;

const group2 = 1;
const group3 = 2;
const group4 = 3;
const group5 = 2;
const group6 = 1;
// const group7 = 0;
// const group8 = 0;

const repetition2 = 3;
const repetition3 = 3;
const repetition4 = 3;
const repetitionX = 5;

// const variable2 = 2;
const variable3 = 2;
const variable4 = 2;
const variable5 = 2;
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
  {type:'I', cardValue: 2, imgSrc: '/static/cardImg/I2.png', howMany: instruction2},
  {type:'I', cardValue: 3, imgSrc: '/static/cardImg/I3.png', howMany: instruction3},

  {type:'R', cardValue: 2, imgSrc: '/static/cardImg/R2.png', howMany: repetition2},
  {type:'R', cardValue: 3, imgSrc: '/static/cardImg/R3.png', howMany: repetition3},
  {type:'R', cardValue: 4, imgSrc: '/static/cardImg/R4.png', howMany: repetition4},
  {type:'R', cardValue: 1, imgSrc: '/static/cardImg/Rx.png', howMany: repetitionX},

  {type:'G', cardValue: 2, imgSrc: '/static/cardImg/G2.png', howMany: group2},
  {type:'G', cardValue: 3, imgSrc: '/static/cardImg/G3.png', howMany: group3},
  {type:'G', cardValue: 4, imgSrc: '/static/cardImg/G4.png', howMany: group4},
  {type:'G', cardValue: 5, imgSrc: '/static/cardImg/G5.png', howMany: group5},
  {type:'G', cardValue: 6, imgSrc: '/static/cardImg/G6.png', howMany: group6},

  // {type:'V', cardValue: 2, imgSrc: '/static/cardImg/V2.png', howMany: variable2},
  {type:'V', cardValue: 3, imgSrc: '/static/cardImg/V3.png', howMany: variable3},
  {type:'V', cardValue: 4, imgSrc: '/static/cardImg/V4.png', howMany: variable4},
  {type:'V', cardValue: 5, imgSrc: '/static/cardImg/V5.png', howMany: variable5},
  {type:'V', cardValue: 6, imgSrc: '/static/cardImg/V6.png', howMany: variable6},

  {type:'H', cardValue: 0, imgSrc: '/static/cardImg/H.png', howMany: hack},
  {type:'VIRUS', cardValue: 0, imgSrc: '/static/cardImg/Virus.png', howMany: virus},
  {type:'POWEROUTAGE', cardValue: 0, imgSrc: '/static/cardImg/PowerOutage.png', howMany: powerOutage},

  {type:'OVERCLOCK', cardValue: 0, imgSrc: '/static/cardImg/OverClock.png', howMany: overClock},
  {type:'BATTERYBACKUP', cardValue: 0, imgSrc: '/static/cardImg/BatteryBackup.png', howMany: batteryBackup},

  {type:'FIREWALL', cardValue: 0, imgSrc: '/static/cardImg/Firewall.png', howMany: firewall},
  {type:'GENERATOR', cardValue: 0, imgSrc: '/static/cardImg/Generator.png', howMany: generator},
  {type:'ANTIVIRUS', cardValue: 0, imgSrc: '/static/cardImg/AntiVirus.png', howMany: antiVirus},

]

export default class Deck {
  /**
   * The constructor for the Deck class
   * @constructor Deck
   */
  constructor(){
    //this.initDeck();
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
      for (var i = 0; i < cardDeck.length; i++) {
        for (var j = 0; j < cardDeck[i].howMany; j++) {
          this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc));
          cardId++;
        }
      }
    }
    this.shuffle(this.cards);
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

  /**
   * shuffle function that will psuedo shuffle the contents of the deck into a random order
   * @memberOf Deck
   */
  shuffle(event) {
    for (let i = event.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [event[i - 1], event[j]] = [event[j], event[i - 1]];
    }
  }
}
