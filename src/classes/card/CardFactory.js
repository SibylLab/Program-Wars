import Instruction from '@/classes/card/Instruction'
import Method from '@/classes/card/Method'
import Repeat from '@/classes/card/Repeat'
import Variable from '@/classes/card/Variable'
import Scan from '@/classes/card/Scan'
import Virus from '@/classes/card/Virus'
import Trojan from '@/classes/card/Trojan'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import PositiveEffectCard from '@/classes/card/PositiveEffectCard'
import Search from '@/classes/card/Search'
import Sort from '@/classes/card/Sort'
import { isNegativeEffect, isPositiveEffect } from '@/classes/card/cardData'

// Map of card types to their constructors for types that take
// both a card value and a deck
const needValueAndDeck = {
  'INSTRUCTION': Instruction,
  'REPEAT': Repeat,
  'VARIABLE': Variable,
}

// Map of card types to their constructors for types that take only a deck
const needDeckOnly = {
  'METHOD': Method,
  'SCAN': Scan,
  'VIRUS': Virus,
  'TROJAN': Trojan,
  'SEARCH': Search,
  'SORT': Sort,
}

/**
 * Factory to cread new cards given a type, value, and deck.
 */
class CardFactory {
  /**
   * Creates a new card.
   * @param {string} type - The type of card to create.
   * @param {int} value - The value of the card. For cards that do not use a
   * value set this to 0.
   * @param {Deck} deck - The deck the card is in.
   */
  newCard (type, value, deck) {
    let card
    if (type in needValueAndDeck) {
      const constructor = needValueAndDeck[type]
      card = new constructor(value, deck)
    } else if (type in needDeckOnly) {
      const constructor = needDeckOnly[type]
      card = new constructor(deck)
    } else if (isNegativeEffect(type)) {
      card = new NegativeEffectCard(type, deck)
    } else if (isPositiveEffect(type)) {
      card = new PositiveEffectCard(type, deck)
    } else {
      throw "CardFactory: Not a valid card type: " + type
    }
    return card
  }
}

export default CardFactory;
