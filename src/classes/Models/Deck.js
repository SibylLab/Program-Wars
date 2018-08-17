/**
 * @file Deck.js file
 * @author Lance on 2017-03-10.
 */
import Card from './Card'

const instruction1 = 9
const instruction2 = 9
const instruction3 = 9
// const instruction4 = 0;

const group2 = 1
const group3 = 2
const group4 = 3
const group5 = 2
const group6 = 1
// const group7 = 0;
// const group8 = 0;

const repetition2 = 3
const repetition3 = 3
const repetition4 = 3
const repetitionX = 5

// const variable2 = 2;
const variable3 = 2
const variable4 = 2
const variable5 = 2
const variable6 = 1

const hack = 3
const malware = 3
const powerOutage = 3

const overClock = 3
const batteryBackup = 3

const antiVirus = 1
const firewall = 7
const generator = 1

const cardDeck = [
  {type: 'I', cardValue: 1, imgSrc: '/static/cardImg/Instruction1.png', howMany: instruction1},
  {type: 'I', cardValue: 2, imgSrc: '/static/cardImg/Instruction2.png', howMany: instruction2},
  {type: 'I', cardValue: 3, imgSrc: '/static/cardImg/Instruction3.png', howMany: instruction3},

  {type: 'R', cardValue: 2, imgSrc: '/static/cardImg/Repetition2.png', howMany: repetition2},
  {type: 'R', cardValue: 3, imgSrc: '/static/cardImg/Repetition3.png', howMany: repetition3},
  {type: 'R', cardValue: 4, imgSrc: '/static/cardImg/Repetition4.png', howMany: repetition4},
  {type: 'R', cardValue: 1, imgSrc: '/static/cardImg/RepetitionX.png', howMany: repetitionX},

  {type: 'G', cardValue: 2, imgSrc: '/static/cardImg/Group2.png', howMany: group2},
  {type: 'G', cardValue: 3, imgSrc: '/static/cardImg/Group3.png', howMany: group3},
  {type: 'G', cardValue: 4, imgSrc: '/static/cardImg/Group4.png', howMany: group4},
  {type: 'G', cardValue: 5, imgSrc: '/static/cardImg/Group5.png', howMany: group5},
  {type: 'G', cardValue: 6, imgSrc: '/static/cardImg/Group6.png', howMany: group6},

  {type: 'V', cardValue: 3, imgSrc: '/static/cardImg/Variable3.png', howMany: variable3},
  {type: 'V', cardValue: 4, imgSrc: '/static/cardImg/Variable4.png', howMany: variable4},
  {type: 'V', cardValue: 5, imgSrc: '/static/cardImg/Variable5.png', howMany: variable5},
  {type: 'V', cardValue: 6, imgSrc: '/static/cardImg/Variable6.png', howMany: variable6},

  {type: 'H', cardValue: 0, imgSrc: '/static/cardImg/Hacker.png', howMany: hack},
  {type: 'VIRUS', cardValue: 0, imgSrc: '/static/cardImg/Malware.png', howMany: malware},
  {type: 'POWEROUTAGE', cardValue: 0, imgSrc: '/static/cardImg/PowerOutage.png', howMany: powerOutage},

  {type: 'OVERCLOCK', cardValue: 0, imgSrc: '/static/cardImg/Overclock.png', howMany: overClock},
  {type: 'BATTERYBACKUP', cardValue: 0, imgSrc: '/static/cardImg/BatteryBackup.png', howMany: batteryBackup},

  {type: 'FIREWALL', cardValue: 0, imgSrc: '/static/cardImg/Firewall.png', howMany: firewall},
  {type: 'GENERATOR', cardValue: 0, imgSrc: '/static/cardImg/Generator.png', howMany: generator},
  {type: 'ANTIVIRUS', cardValue: 0, imgSrc: '/static/cardImg/AntiVirus.png', howMany: antiVirus}

]

/**
 * This is the object representation of the games deck.
 * We use one deck that grows depending on the number of players instead of multiple decks.
 */
export default class Deck {
  /**
   * The constructor for the Deck class
   * @constructor Deck
   */
  constructor () {
    // this.initDeck();
    this.cards = []
    this.discard_cards = []
  };

  /**
   * initDeck function to initialize the deck with a pre determined number and type of cards
   * @memberOf Deck
   */
  initDeck (value) {
    let cardId = 0
    // let fwPlayed = false
    // let avPlayed = false
    // let genPlayed = false
    for (let k = 0; k < value; k++) {
      for (let i = 0; i < cardDeck.length; i++) {
        for (let j = 0; j < cardDeck[i].howMany; j++) {
          this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc))
          cardId++
          // if (cardDeck[i].type === 'FIREWALL' && !fwPlayed) {
          //   this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc))
          //   cardId++
          //   fwPlayed = true
          // } else if (cardDeck[i].type === 'GENERATOR' && !genPlayed) {
          //   this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc))
          //   cardId++
          //   genPlayed = true
          // } else if (cardDeck[i].type === 'ANTIVIRUS' && !avPlayed) {
          //   this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc))
          //   cardId++
          //   avPlayed = true
          // } else if (cardDeck[i].type !== 'ANTIVIRUS' && cardDeck[i].type !== 'FIREWALL' && cardDeck[i].type !== 'GENERATOR') {
          //   this.cards.push(new Card(cardId, cardDeck[i].cardValue, cardDeck[i].type, cardDeck[i].imgSrc))
          //   cardId++
          // }
        }
      }
    }
    this.shuffle(this.cards)
  };// end Init game

  /**
   * draw function returns the card at the front (top) of the deck and removes it from the deck
   * @memberOf Deck
   * @returns {Card}
   */
  draw () {
    let card = this.cards[0]// [0] is the top of the deck
    this.cards.shift()// unshift removes the first element.
    return card
  };

  /**
   * shuffle function that will psuedo shuffle the contents of the deck into a random order
   * @memberOf Deck
   */
  shuffle (event) {
    for (let i = event.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [event[i - 1], event[j]] = [event[j], event[i - 1]]
    }
  }
}
