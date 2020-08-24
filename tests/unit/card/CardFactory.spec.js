import CardFactory from '@/classes/card/CardFactory'
import Scan from '@/classes/card/Scan'
import NegativeEffectCard from '@/classes/card/NegativeEffectCard'
import PositiveEffectCard from '@/classes/card/PositiveEffectCard'
import Instruction from '@/classes/card/Instruction'
import Virus from '@/classes/card/Virus'

jest.mock('@/classes/card/PositiveEffectCard')
jest.mock('@/classes/card/NegativeEffectCard')
jest.mock('@/classes/card/Instruction')
jest.mock('@/classes/card/Virus')

describe('CardFactory class', () => {
  const factory = new CardFactory()
  const value = 2
  const deck = 'deck'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('newCard', () => {
    test('when type is negative effect', () => {
      const card = factory.newCard('RANSOM', value, deck)
      expect(NegativeEffectCard).toBeCalledTimes(1)
      expect(NegativeEffectCard).toBeCalledWith('RANSOM', deck)
    })

    test('when type is positive effect', () => {
      const card = factory.newCard('ANTIVIRUS', value, deck)
      expect(PositiveEffectCard).toBeCalledTimes(1)
      expect(PositiveEffectCard).toBeCalledWith('ANTIVIRUS', deck)
    })

    test('when type is scan we dont want it to create PositiveEffectCard', () => {
      const card = factory.newCard('SCAN', value, deck)
      expect(card).toBeInstanceOf(Scan)
    })

    test('when type is one that needs a value and a deck', () => {
      const card = factory.newCard('INSTRUCTION', value, deck)
      expect(Instruction).toBeCalledTimes(1)
      expect(Instruction).toBeCalledWith(value, deck)
    })

    test('when type is one that only needs the deck', () => {
      const card = factory.newCard('VIRUS', value, deck)
      expect(Virus).toBeCalledTimes(1)
      expect(Virus).toBeCalledWith(deck)
    })

    test('when type is not a valid card type', () => {
      expect(() => {
        factory.newCard('ERROR', value, deck)
      }).toThrow()
    })
  })
})
