import Deck from '@/classes/deck/Deck'
import cardCatalog from '@/classes/deck/cardCatalog'
import { buildCardTypes } from '@/classes/deck/distributionBuilder'
import { getDistribution } from '@/classes/deck/distributionConfig'

/**
 * Factory class to create decks for different modes.
 *
 * Deck composition is driven by the weighted distribution config (see
 * `public/cardDistribution.json` and {@link module:distributionConfig}) rather
 * than a hard-coded card list, so card frequencies can be tuned without code
 * changes.
 */
class DeckFactory {
  /**
   * Creates a new beginner deck from the active card distribution.
   * @return {Deck} A new deck whose composition matches the distribution config.
   */
  beginnerDeck () {
    return new Deck(buildCardTypes(getDistribution(), cardCatalog))
  }
}

export default DeckFactory
