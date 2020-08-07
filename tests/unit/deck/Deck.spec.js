import CardFactory from '@/classes/card/CardFactory'
import Deck from '@/classes/deck/Deck'

// Mock out CardFactory in Deck tests
jest.mock('@/classes/card/CardFactory')

describe('Deck class', () => {
  beforeEach(() => {
    CardFactory.mockClear()
  })

  test('constructor calls correct methods', () => {
    const spyAddCards = jest.spyOn(Deck.prototype, '_addCardTypes')
    const spyShuffle =jest.spyOn(Deck.prototype, 'shuffle')

    const deck = new Deck([])

    expect(deck.cards).toHaveLength(0)
    expect(deck.discardPile).toHaveLength(0)
    expect(spyAddCards).toHaveBeenCalledTimes(1)
    expect(spyShuffle).toHaveBeenCalledTimes(1)
  })

  describe('Draw method', () => {
    test('draw card from top', () => {
      const deck = new Deck([])
      deck.cards = ['I', 'R']

      const card = deck.draw()
      expect(card).toEqual('I')
      expect(deck.cards).toHaveLength(1)
    })

    test('draw card from top, when the deck.cards is empty', () => {
      const deck = new Deck([]) 
      deck.discardPile = ['I']  // only want one because it will be shuffled

      const card = deck.draw()
      expect(card).toEqual('I')
      expect(deck.cards).toHaveLength(0)
      expect(deck.discardPile).toHaveLength(0)
    })

    test('draw card from top, when the deck is totally empty', () => {
      const deck = new Deck([]) 

      const card = deck.draw()
      expect(card).toBeNull()
      expect(deck.cards).toHaveLength(0)
      expect(deck.discardPile).toHaveLength(0)
    })
  })

  describe('drawCards', () => {
    test('draw several cards from top', () => {
      const deck = new Deck([])    
      deck.cards = ['I', 'R', 'M', 'S', 'G']

      const cards = deck.drawCards(4)
      expect(cards).toEqual(['I', 'R', 'M', 'S'])
      expect(deck.cards).toHaveLength(1)
    })

    test('draw several cards from top, deck has only 1 card total', () => {
      const deck = new Deck([]) 
      deck.cards = ['I']

      const cards = deck.drawCards(4)
      expect(cards).toEqual(['I'])
      expect(deck.cards).toHaveLength(0)
    })
  })

  describe('takeCardAt', () => {
    test('take card at valid index', () => {
      const deck = new Deck([])
      deck.cards = ['I', 'R', 'M']

      const card = deck.takeCardAt(1)
      expect(card).toEqual('R')
      expect(deck.cards).toEqual(['I', 'M'])
    })

    test('take card at invalid index', () => {
      const deck = new Deck([])
      deck.cards = ['I', 'R', 'M']

      const card = deck.takeCardAt(-1)
      expect(card).toBeUndefined()
      expect(deck.cards).toEqual(['I', 'R', 'M'])
    })
  })

  test('remove given card from deck', () => {
    const deck = new Deck([])
    deck.cards = ['I', 'R', 'M']
    const card = 'M'

    deck.removeCard(card)
    expect(deck.cards).toEqual(['I', 'R'])
  })

  test('shuffle and add the discard back to the deck', () => {
    const deck = new Deck([])
    deck.discardPile = ['I', 'R', 'M']

    // Create spy here to ignore calls during construction
    const spyShuffleCards = jest.spyOn(Deck.prototype, '_shuffleCards')

    deck.refresh()
    expect(deck.cards).toHaveLength(3)
    expect(deck.discardPile).toHaveLength(0)
    expect(spyShuffleCards).toHaveBeenCalledTimes(1)
  })

  test('put a single card on the top of the deck', () => {
    const deck = new Deck([])
    deck.cards = ['I', 'R', 'M']
    
    deck.putCardOnTop('G')
    expect(deck.cards).toEqual(['G', 'I', 'R', 'M'])
  })

  test('add a collection of cards to the top of the deck', () => {
    const deck = new Deck([])
    deck.cards = ['I']
 
    // Top of added cards go on top of deck one at a time, not just a concatination
    deck.addCardsToTop(['G', 'M', 'R'])
    expect(deck.cards).toEqual(['R', 'M', 'G', 'I'])
  })

  test('discard a card', () => {
    const deck = new Deck([])

    deck.discard('I')
    expect(deck.discardPile).toEqual(['I'])
  })

  test('add cards to the deck using a list of card types', () => {
    const cardTypes = [
      { type: 'I', val: 1, num: 5 },
      { type: 'R', val: 3, num: 5 },
      { type: 'V', val: 4, num: 5 }
    ]

    const deck = new Deck([])
    CardFactory.mockClear()  // ignore calls during construction

    deck._addCardTypes(cardTypes)
    expect(CardFactory).toHaveBeenCalledTimes(1)
    // Mock is not creating actual cards so we just check length
    expect(deck.cards).toHaveLength(15)

    const mockFactory = CardFactory.mock.instances[0]
    expect(mockFactory.newCard).toHaveBeenCalledTimes(15)
    expect(mockFactory.newCard).toHaveBeenCalledWith('I', 1, deck)
    expect(mockFactory.newCard).toHaveBeenCalledWith('R', 3, deck)
    expect(mockFactory.newCard).toHaveBeenCalledWith('V', 4, deck)
  })

  // Checks that a shuffled array of 10000 numbers is not identical to
  // the original array. Highly unlikely, but this could fail because of
  // the randomness of the shuffle. So if this fails just re-run tests.
  test('pseudo random shuffle an array of cards, USES RANDOM', () => {
    const nums = Array(10000).keys() // array from 0 to 9999

    const deck = new Deck([])
    deck.cards = [...nums]

    deck._shuffleCards(deck.cards)
    expect(deck.cards).not.toEqual(nums)
  })
})
