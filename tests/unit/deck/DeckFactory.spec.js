import Deck from '@/classes/deck/Deck'
import deckData from '@/classes/deck/deckData'
import DeckFactory from '@/classes/deck/DeckFactory'

// Mock out Deck in DeckFactory tests
jest.mock('@/classes/deck/Deck')

describe('DeckFactory', () => {
  beforeEach(() => {
    Deck.mockClear()
  })

  describe('beginnerDeck', () => {
    test('create a new beginner deck with a valid type', () => {
      const data = deckData['beginner']['hack1']
      const cardTypes = data.base.concat(data.extra)

      const fact = new DeckFactory()
      
      const deck = fact.beginnerDeck('hack1')
      expect(deck).toBeDefined()  // it will be a mock, but it should still be there
      expect(Deck).toBeCalledTimes(1)
      expect(Deck).toBeCalledWith(cardTypes)
    })

    test('create a new beginner deck with an invalid type', () => {
      const data = deckData['beginner']['default']
      const cardTypes = data.base.concat(data.extra)

      const fact = new DeckFactory()
      
      const deck = fact.beginnerDeck('invalid-type')
      expect(deck).toBeDefined()
      expect(Deck).toBeCalledTimes(1)
      expect(Deck).toBeCalledWith(cardTypes)
      
    })
  })

  describe('standardDeck', () => {
    test('create a new standard deck with a valid type', () => {
      const data = deckData['standard']['stdCombined1']
      const cardTypes = data.base.concat(data.extra)

      const fact = new DeckFactory()
      
      const deck = fact.standardDeck('stdCombined1')
      expect(deck).toBeDefined()
      expect(Deck).toBeCalledTimes(1)
      expect(Deck).toBeCalledWith(cardTypes)
    })

    test('create a new standard deck with an invalid type', () => {
      const data = deckData['standard']['default']
      const cardTypes = data.base.concat(data.extra)

      const fact = new DeckFactory()
      
      const deck = fact.standardDeck('invalid-type')
      expect(deck).toBeDefined()
      expect(Deck).toBeCalledTimes(1)
      expect(Deck).toBeCalledWith(cardTypes)
    })
  })
})
