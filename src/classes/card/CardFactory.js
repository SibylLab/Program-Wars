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

// Tables to associate a card type to it's constructor
const needValueAndDeck = {
  'INSTRUCTION': Instruction,
  'REPEAT': Repeat,
  'VARIABLE': Variable,
}

const needDeckOnly = {
  'METHOD': Method,
  'SCAN': Scan,
  'VIRUS': Virus,
  'TROJAN': Trojan,
  'SEARCH': Search,
  'SORT': Sort,
}

export default class CardFactory {
  newCard (type, value, deck) {
    let card
    if (isNegativeEffect(type)) {
      card = new NegativeEffectCard(type, deck)
    } else if (isPositiveEffect(type)) {
      card = new PositiveEffectCard(type, deck)
    } else if (type in needValueAndDeck) {
      const constructor = needValueAndDeck[type]
      card = new constructor(value, deck)
    } else if (type in needDeckOnly) {
      const constructor = needDeckOnly[type]
      card = new constructor(deck)
    } else {
      throw "CardFactory: Not a valid card type: " + type
    }
    return card
  }
}
