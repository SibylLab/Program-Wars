import CardFactory from '@/classes/card/CardFactory'

/**
 * Class representing a deck of cards.
 * @prop {Card[]} cards - The cards in the deck.
 * @prop {Card[]} discardPile - The cards in the discard pile.
 */
class Deck {
  /**
   * Creates a new shuffled deck filled with the given card types.
   * @param {Object[]} cardTypes - A list of the types of cards to add. Each
   * object has the `type` {string} of the card, `val` {int} the cards value,
   * and `num` {int} the number of this type of card to add.
   * See {@link classes/deck/deckData.js} for more information.
   */
  constructor (cardTypes) {
    this.cards = []
    this.discardPile = []
    this._addCardTypes(cardTypes)
    this.shuffle()
  }

  /**
   * Draws a card from the top of the deck.
   *
   * If the deck is empty it will put the discard back into the deck and shuffle
   * it before returning the top card. If the deck and discard are empty it
   * will return `undefined`.
   *
   * @return {Card|undefined} A card off the top of the deck, or `undefined`
   * if there are no cards in the deck of discard.
   */
  draw () {
    if (this.cards.length === 0) {
      this.refresh()
    }
    return this.cards.shift()
  }

  /**
   * Draws a given number of cards.
   *
   * If there are not enough cards in the deck and discard to meet the given
   * number of cards it will return all it can. If there are no cards at all
   * then it will just return an empty list.
   *
   * @return {Card[]} A list of up to as many cards as are left.
   */
  drawCards (numCards) {
    const drawn = []
    for (let i = 0; i < numCards; i++) {
      const card = this.draw()
      if (card) {
        drawn.push(card)
      } else {
        break
      }
    }
    return drawn
  }

  /**
   * Removes and returns the card at the given index.
   * @return {Card|undefined} The card at the given idx, or undefined if the
   * index is out of bounds.
   */
  takeCardAt (idx) {
    const card = this.cards[idx]
    this.removeCard(card)
    return card
  }

  /**
   * Remove the given card from the card portion of the deck.
   * 
   * Does not return the removed card as in order to try and remove it the caller
   * must already have a reference to the card. If the card is not there nothing
   * will happen.
   */
  removeCard (card) {
    this.cards = this.cards.filter(c => c !== card)
  }

  /**
   * Shuffles the discard pile and adds it to the bottom of the deck.
   */
  refresh () {
    this._shuffleCards(this.discardPile)
    this.cards = this.cards.concat(this.discardPile)
    this.discardPile = []
  }

  /**
   * Puts a card on top of the deck.
   * @param {Card} card - The card to add.
   */
  putCardOnTop (card) {
    this.cards.unshift(card)
  }

  /**
   * Puts all the given cards on top of the deck.
   *
   * This starts with the first card and moves through them. Meaning that the
   * **last card in the list will be on top** of the deck when finished.
   *
   * @param {Card[]} cards - The cards to add.
   */
  addCardsToTop (cards) {
    cards.map(c => this.putCardOnTop(c))
  }

  /**
   * Place the given card in the discard pile.
   * @param {Card} card - The card to discard.
   */
  discard (card) {
    this.discardPile.push(card)
  }

  /**
   * Shuffle the deck a given number of times (default 3).
   * @param {int} [times=3] - The number of times to shuffle the deck.
   */
  shuffle (times = 3) {
    for (let i = 0; i < times; i++) {
      this._shuffleCards(this.cards)
    }
  }

  /**
   * Create Cards for each of the types in the list and add them to the deck.
   * The given cardTypes are the same as the `constructor` parameter `cardTypes`
   * @private
   */
  _addCardTypes (cardTypes) {
    const fact = new CardFactory()
    for (const {type, val, num} of cardTypes) {
      for (let i = 0; i < num; i++) {
        this.cards.push(fact.newCard(type, val, this))
      }
    }
  }

  /**
   * Shuffle a list of cards into a psuedo random order.
   * @param cards An array of Cards to shuffle.
   * @private
   */
  _shuffleCards (cards) {
    for (let i = cards.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]]
    }
  }
}

export default Deck;
