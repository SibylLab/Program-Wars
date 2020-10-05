// The default maximum number of cards a hand can hold
const MAX_CARDS = 5

/**
 * Class for a player's hand.
 * @prop {int} maxCards - The max number of cards the hand can hold.
 * @prop {Card[]} cards - The cards in the hand.
 */
class Hand {
  /**
   * Creates a new hand for a given player.
   * @param {Player} player - The player that owns the hand.
   */
  constructor (player) {
    this.player = player
    this.maxCards = MAX_CARDS
    this.cards = []
  }

  /**
   * Returns the number of cards in the hand.
   * @return {int} The number of cards in the hand.
   */
  numCards () {
    return this.cards.length
  }

  /**
   * Finds a card in the hand using a card id.
   * @param {string} cardId - The id of a card to find.
   * @return {Card|undefined} The card matching the given id, or `undefined`
   * if there is no card with the given id in the hand.
   */
  getCardById (cardId) {
    return this.cards.find(c => c.id === cardId)
  }

  /**
   * Returns the card at the given index.
   *
   * Does not remove the card from the hand.
   *
   * @param {int} idx - The index of the card to get.
   * @return {Card|undefined} The card at the given idx, or `undefined` if the
   * idx is out of bounds.
   */
  getCardAt (idx) {
    return this.cards[idx]
  }

  /**
   * Adds a list of cards to the hand.
   * @param {Card[]} cards - The cards to add.
   */
  addCards (cards) {
    for (const card of cards) {
      this.addCard(card)
    }
  }

  /**
   * Add a single card to the hand.
   * @param {Card} card - the card to add.
   */
  addCard (card) {
    this.cards.push(card)
  }

  /**
   * Removes all cards from the hand and returns them in a list.
   * @return {Card[]} A list of all cards in the hand.
   */
  takeAll () {
    const cards = this.cards
    this.cards = []
    return cards
  }

  /**
   * Removes a list of cards from the hand.
   *
   * Does not return anything as the caller already has the cards being removed.
   * @param {Card[]} cards - The cards to remove.
   */
  removeCards (cards) {
    for (const card of cards) {
      this.removeCard(card)
    }
  }

  /**
   * Removes a card from the hand.
   *
   * Does not return anything as the caller already has the card being removed.
   * @param {Card} card - The card to remove.
   */
  removeCard (card) {
    this.cards = this.cards.filter(c => c !== card)
  }

  /**
   * Removes all the cards in the hand that are mimics.
   * @return {Card[]} A list of all cards that are mimicks
   */
  cleanMimics () {
    const mimics = this.getMimics()
    this.cards = this.cards.filter(c => !c.isMimic)
    return mimics
  }

  /**
   * Returns all the cards in the hand that are mimics, without removing them.
   * @return {Card[]} A List of the cards that are mimics.
   */
  getMimics () {
    return this.cards.filter(c => c.isMimic)
  }
}

export default Hand;
