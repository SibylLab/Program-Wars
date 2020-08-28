import PlayBestCard from '@/classes/AIHandler/PlayBestCard'

/**
 * Class for an action handler that selects cards at random from the player's
 * hand to try to find a valid play.
 *
 * Uses all the same logic to decide on if a card can be played and how to play
 * it as {@link PlayBestCard}. The main difference is that it has no priority  list
 * and will play any card type that can be played.
 * @extends PlayBestCard
 */
class PlayRandomCard extends PlayBestCard {
  /**
   * Create a new handler with no priorities.
   */
  constructor () {
    super([])
  }

  /**
   * Shuffles the given cards rather than giving them a priority.
   * This will apply anywhere in the class that cards are sorted.
   * @param {Card[]} cards - The list of cards to sort. Modifies the list.
   * @private
   */
  _sortCards (cards) {
    for (let i = cards.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [cards[i - 1], cards[j]] = [cards[j], cards[i - 1]]
    }
  }

  /**
   * Returns `true` for all cards that are not `undefined`.
   * @param {Card} card - The card to check.
   * @param {bool} True if the card is not `undefined`, false otherwise.
   */
  isValidCard (card) {
    return card !== undefined
  }

  /**
   * Selects a random card from the top N cards of the deck.
   *
   * @param {Card} card - The card to attempt to play.
   * @param {Object} state - An object with the state info needed to make this decision.
   * @param {Player} state.player - The player making the play.
   * @param {Deck} state.deck - The deck to search.
   * @return {Object|undefined} A `playSearch` playInfo object if a play could be made,
   * `undefined` otherwise.
   */
  search (card, { player, deck }) {
    const length = Math.min(card.value, deck.cards.length)
    const idx = Math.floor(Math.random() * length)
    const chosen = deck.takeCardAt(idx)

    if (chosen) {
      return {
        type: 'playSearch',
        player, card, cardOwner: player,
        chosenCard: chosen, deck
      }
    }
    return undefined
  }
}

export default PlayRandomCard;
