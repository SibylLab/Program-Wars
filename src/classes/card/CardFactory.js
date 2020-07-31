import Card from '@/classes/card/Card'
import Instruction from '@/classes/card/Instruction'
import Method from '@/classes/card/Method'
import Repeat from '@/classes/card/Repeat'
import Variable from '@/classes/card/Variable'
import Virus from '@/classes/card/Virus'
import Trojan from '@/classes/card/Trojan'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import PositiveEffectCard from '@/classes/card/PositiveEffectCard'
import cardData from '@/classes/card/cardData'

export default class CardFactory {
  newCard (type, value, ownerId = -1) {
    if (type === 'INSTRUCTION') {
      return new Instruction(value, ownerId)
    } else if (type === 'METHOD') {
      return new Method(value, ownerId)
    } else if (type === 'REPEAT') {
      return new Repeat(value, ownerId)
    } else if (type === 'VARIABLE') {
      return new Variable(value, ownerId)
    } else if (type === 'VIRUS') {
      return new Virus(ownerId)
    } else if (type === 'TROJAN') {
      return new Trojan(ownerId)
    } else if (type === 'SQL_INJECTION') {
      return new SqlInjection(ownerId)
    } else if (cardData.isNegativeEffect(type)) {
      return new NegativeEffectCard(ownerId)
    } else if (cardData.isPositiveEffect(type)) {
      return new PositiveEffectCard(ownerId)
    } else {
      throw "Not a valid card type: " + type
    }
  }
}
