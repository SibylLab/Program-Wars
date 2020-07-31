/**
 * @file Deck.js file
 * @author Lance on 2017-03-10, Steven modified 2020-05-25
 */

import Card from './Card'

// cards to add in when the deck is refreshed
const refreshCards = {
  "METHOD": {0: 3},
  "REPEAT": {1: 2, 3: 3, 4: 2},
  "VARIABLE": {4: 1, 5: 2, 6: 1},
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
  constructor (cardsToAdd) {
    this.cards = []
    this.discard = []
    this.addCards(cardsToAdd, 4)
  }

  /**
   * Initializes the deck with a pre determined number and type of cards.
   * Shuffles the deck.
   * @param cardsToAdd An object with card types as keys, each card type maps to
   * an object of card values mapped to the number of cards to put in the deck.
   * @param shuffles The number of times to shuffle the deck.
   */
  addCards (cardsToAdd, shuffles) {
    for (let [type, values] of Object.entries(cardsToAdd)) {
      for (let [value, number] of Object.entries(values)) {
        for (let i = 0; i < number; i++) {
          this.cards.push(new Card(type, parseInt(value)))
        }
      }
    }
    // Shuffle a few times to try and get a good random order
    for (let i = 0; i < shuffles; i++) {
      this.shuffle(this.cards)
    }
  }

  /**
   * Removes and returns the top card of the deck.
   * @returns {Card} the top card.
   */
  draw () {
    if (this.cards.length === 0) {
      this.refresh()
    }
    return this.cards.shift()
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
   * Also, adds some more method, variable, and repeat cards to keep the game
   * moving. Especially in 4 player games these cards are moslty used up by
   * the time the deck runs out, so we add some more in to ensure players
   * can still play.
   */
  refresh () {
    this.cards = this.cards.concat(this.discard)
    this.discard = []
    if (this.cards.length < 80) {
      this.addCards(refreshCards)
    }
  }
}
