import Deck from '@/classes/deck/Deck'
import DeckFactory from '@/classes/deck/DeckFactory'
import cardCatalog from '@/classes/deck/cardCatalog'
import { buildCardTypes } from '@/classes/deck/distributionBuilder'
import { getDistribution } from '@/classes/deck/distributionConfig'

// Mock out Deck so we can inspect what the factory builds it with.
jest.mock('@/classes/deck/Deck')

describe('DeckFactory', () => {
  beforeEach(() => {
    Deck.mockClear()
  })

  describe('beginnerDeck', () => {
    test('builds a deck from the active card distribution', () => {
      const expectedCardTypes = buildCardTypes(getDistribution(), cardCatalog)

      const fact = new DeckFactory()
      const deck = fact.beginnerDeck('malware1')

      expect(deck).toBeDefined()
      expect(Deck).toHaveBeenCalledTimes(1)
      expect(Deck).toHaveBeenCalledWith(expectedCardTypes)
    })
  })
})
