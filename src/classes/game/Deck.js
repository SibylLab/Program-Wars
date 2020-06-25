/**
 * @file Deck.js file
 * @author Lance on 2017-03-10, Steven modified 2020-05-25
 */

import Card from './Card'

// card types along with {value: numCard} pairs for each
const cardTypes = {
  "INSTRUCTION": {1: 9, 2: 9, 3: 9},
  "GROUP": {2: 1, 3: 2, 4: 3, 5: 2, 6: 1},
  "REPEAT": {1: 5, 2: 3, 3: 3, 4: 3},
  "VARIABLE": {3: 2, 4: 2, 5: 2, 6: 1},
  "VIRUS": {0: 3},
  "RANSOM": {0: 3},
  "SPYWARE": {0: 3},
  "TROJAN": {0: 3},
  "ANTIVIRUS": {0: 1},
  "FIREWALL": {0: 2},
  "SCAN": {0: 6},
}

// cards to add in when the deck is refreshed
const refreshCards = {
  "GROUP": {4: 1, 5: 1, 6: 1},
  "REPEAT": {1: 2, 3: 2, 4: 2},
  "VARIABLE": {4: 1, 5: 1, 6: 1},
}


/**
 * A deck for a program wars game.
 * Only a single deck is used. Its size is determined by the number of players
 * it is initialized with.
 */
export default class Deck {
  /**
   * Constructor for the Deck class.
   */
  constructor () {
    this.cards = []
    this.discard = []
    this.addCards(cardTypes)
  }

  /**
   * Initializes the deck with a pre determined number and type of cards.
   * Shuffles the deck.
   */
  addCards (cardsToAdd) {
    for (let [type, values] of Object.entries(cardsToAdd)) {
      for (let [value, number] of Object.entries(values)) {
        for (let i = 0; i < number; i++) {
          this.cards.push(new Card(type, parseInt(value)))
        }
      }
    }
    this.shuffle(this.cards)
  }

  /**
   * Removes and returns the top card of the deck.
   * @returns {Card} the top card.
   */
  draw () {
    if (this.cards.length === 0) {
      this.refresh()
    }
    let card = this.cards[0]  // [0] is the top of the deck
    this.cards.shift()
    return card
  }

  /**
   * Shuffle a list of cards into a psuedo random order.
   * @param cards An array of Cards to shuffle.
   */
  shuffle (cards) {
    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]]
    }
  }

  /**
   * Refreshes the deck by adding back the discard pile and shuffling.
   * Also, adds some more group, variable, and repeat cards to keep the game
   * moving. Especially in 4 player games these cards are moslty used up by
   * the time the deck runs out, so we add some more in to ensure players
   * can still play.
   */
  refresh () {
    this.cards = this.cards.concat(this.discard)
    this.discard = []
    this.addCards(refreshCards)
  }
}
