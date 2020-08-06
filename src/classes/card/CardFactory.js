import Instruction from '@/classes/card/Instruction'
import Method from '@/classes/card/Method'
import Repeat from '@/classes/card/Repeat'
import Variable from '@/classes/card/Variable'
import Scan from '@/classes/card/Scan'
import Virus from '@/classes/card/Virus'
import Trojan from '@/classes/card/Trojan'
import SqlInjection from '@/classes/card/SqlInjection'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import PositiveEffectCard from '@/classes/card/PositiveEffectCard'
import Search from '@/classes/card/Search'
import Sort from '@/classes/card/Sort'
import { isNegativeEffect, isPositiveEffect } from '@/classes/card/cardData'

export default class CardFactory {
  newCard (type, value, deck) {
    if (type === 'INSTRUCTION') {
      return new Instruction(value, deck)
    } else if (type === 'METHOD') {
      return new Method(deck)
    } else if (type === 'REPEAT') {
      return new Repeat(value, deck)
    } else if (type === 'VARIABLE') {
      return new Variable(value, deck)
    } else if (type === 'SCAN') {
      return new Scan(deck)
    } else if (type === 'VIRUS') {
      return new Virus(deck)
    } else if (type === 'TROJAN') {
      return new Trojan(deck)
    } else if (type === 'SQL_INJECTION') {
      return new SqlInjection(deck)
    } else if (isNegativeEffect(type)) {
      return new NegativeEffectCard(type, deck)
    } else if (isPositiveEffect(type)) {
      return new PositiveEffectCard(type, deck)
    } else if (type === 'SEARCH') {
      return new Search(deck)
    } else if (type === 'SORT') {
      return new Sort(deck)
    } else {
      throw "CardFactory: Not a valid card type: " + type
    }
  }
}
