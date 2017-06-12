/**
 * @file Deck.js file
 * @author Lance on 2017-03-10.
 */
import Card from './Card'

const instruction1 = 8;
const instruction2 = 8;
const instruction3 = 8;
const repetition2 = 2;
const repetition3 = 2;
const repetition4 = 2;
const repetition5 = 2;
const repetitionX = 5;
const group2 = 2;
const group3 = 4;
const group4 = 4;
const group5 = 2;
const group6 = 2;
const variable2 = 4;
const variable3 = 4;
const variable4 = 4;
const variable5 = 2;
const variable6 = 2;
const hack = 5;

const cardDeck = [
  {type:'I', cardValue: 1, imgSrc: '../../static/cardImg/I1.png', howMany: instruction1},
  {type:'I', cardValue: 2, imgSrc: '../../static/cardImg/I2.png', howMany: instruction2},
  {type:'I', cardValue: 3, imgSrc: '../../static/cardImg/I3.png', howMany: instruction3},
  {type:'R', cardValue: 2, imgSrc: '../../static/cardImg/R2.png', howMany: repetition2},
  {type:'R', cardValue: 3, imgSrc: '../../static/cardImg/R3.png', howMany: repetition3},
  {type:'R', cardValue: 4, imgSrc: '../../static/cardImg/R4.png', howMany: repetition4},
  {type:'R', cardValue: 5, imgSrc: '../../static/cardImg/R5.png', howMany: repetition5},
  {type:'R', cardValue: 1, imgSrc: '../../static/cardImg/Rx.png', howMany: repetitionX},
  {type:'G', cardValue: 2, imgSrc: '../../static/cardImg/G2.png', howMany: group2},
  {type:'G', cardValue: 3, imgSrc: '../../static/cardImg/G3.png', howMany: group3},
  {type:'G', cardValue: 4, imgSrc: '../../static/cardImg/G4.png', howMany: group4},
  {type:'G', cardValue: 5, imgSrc: '../../static/cardImg/G5.png', howMany: group5},
  {type:'G', cardValue: 6, imgSrc: '../../static/cardImg/G6.png', howMany: group6},
  {type:'V', cardValue: 2, imgSrc: '../../static/cardImg/V2.png', howMany: variable2},
  {type:'V', cardValue: 3, imgSrc: '../../static/cardImg/V3.png', howMany: variable3},
  {type:'V', cardValue: 4, imgSrc: '../../static/cardImg/V4.png', howMany: variable4},
  {type:'V', cardValue: 5, imgSrc: '../../static/cardImg/V5.png', howMany: variable5},
  {type:'V', cardValue: 6, imgSrc: '../../static/cardImg/V6.png', howMany: variable6},
  {type:'H', cardValue: 0, imgSrc: '../../static/cardImg/H.png', howMany: hack},
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
  initDeck() {
    let cardId = 0;
    for(var i = 0; i < cardDeck.length; i++){
      for(var j = 0; j < cardDeck[i].howMany; j++) {
        this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc));
        cardId++;
      }
    }
    this.shuffle();
  };//end Init game

  /**
   * draw function returns the card at the front (top) of the deck and removes it from the deck
   * @memberOf Deck
   * @returns {Card}
   */
  draw() {
    let card = this.cards[0];//[0] is the top of the deck
    this.cards.shift();//unshift removes the first element.
    console.log(this.cards.length);
    return card;
  };

  /**
   * shuffle function that will psuedo shuffle the contents of the deck into a random order
   * @memberOf Deck
   */
  shuffle() {
    for (let i = this.cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [this.cards[i - 1], this.cards[j]] = [this.cards[j], this.cards[i - 1]];
    }
  }

}
