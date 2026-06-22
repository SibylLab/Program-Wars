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
import ComponentCard from '@/classes/card/ComponentCard'
import DefensiveMultiplier from '@/classes/card/DefensiveMultiplier'
import Polymorphism from '@/classes/card/Polymorphism'
import Logger from '@/classes/card/Logger'
import Bug from '@/classes/card/Bug'
import Disaster from '@/classes/card/Disaster'
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
  'LOGGER': Logger,
  'BUG': Bug,
  'DISASTER': Disaster,
  'POLYMORPHISM': Polymorphism,
}

// Defensive multiplier card types that need a type and a deck
const defensiveMultiplierTypes = ['INTERFACE', 'GIT', 'ERROR_HANDLING']

// Component card types that require a name
const componentTypes = ['MODEL', 'VIEW', 'CONTROLLER']

/**
 * Factory to cread new cards given a type, value, and deck.
 */
class CardFactory {
  /**
   * Creates a new card.
   * @param {string} type - The type of card to create.
   * @param {int|string} value - The value of the card, or component name for component cards.
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
    } else if (componentTypes.includes(type)) {
      // For component cards, value is actually the component name
      card = new ComponentCard(type, value, deck)
    } else if (defensiveMultiplierTypes.includes(type)) {
      card = new DefensiveMultiplier(type, deck)
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

