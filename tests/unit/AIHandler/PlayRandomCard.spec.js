import PlayRandomCard from '@/classes/AIHandler/PlayRandomCard'

describe('PlayRandomCard class', () => {
  test('creating a new play random card action handler', () => {
    const action = new PlayRandomCard()
    expect(action.playOrder).toEqual([])
  })

  // Checks that a shuffled array of 10000 numbers is not identical to
  // the original array. Highly unlikely, but this could fail because of
  // the randomness of the shuffle. So if this fails just re-run tests.
  test('sorting the cards into a random order, USES RANDOM', () => {
    const nums = Array(10000).keys() // array from 0 to 9999

    const action = new PlayRandomCard()
    const result = action.sortCards([...nums])
    expect(result).not.toEqual(nums)
  })

  test('validating a card is true as long as it is defined', () => {
    const action = new PlayRandomCard()
    expect(action.isValidCard('card')).toBeTruthy()
    expect(action.isValidCard(undefined)).toBeFalsy()
  })

  describe('search', () => {
    test('there is a card to take', () => {
      const action = new PlayRandomCard()
      const deck = {
        cards: [1, 2, 3, 4, 5],  // don't need to actually be cards for the test
        takeCardAt: jest.fn(() => { return 'chosen' })
      }
      const player = 'player'
      const card = { value: 1 }

      const result = action.search(card, { player, deck })

      expect(deck.takeCardAt).toBeCalledTimes(1)
      const idx = deck.takeCardAt.mock.calls[0][0]
      expect(idx >= 0 && idx < card.value).toBeTruthy()
      
      expect(result.type).toEqual('playSearch')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual('player')
      expect(result.player).toEqual('player')
      expect(result.chosenCard).toEqual('chosen')
      expect(result.deck).toEqual(deck)
    })

    test('there is not a card to take', () => {
      const action = new PlayRandomCard()
      const deck = {
        cards: [],
        takeCardAt: jest.fn(() => { return undefined })
      }
      const player = 'player'
      const card = { value: 10 } // value is greater than deck size

      const result = action.search(card, { player, deck })

      expect(deck.takeCardAt).toBeCalledTimes(1)
      const idx = deck.takeCardAt.mock.calls[0][0]
      expect(idx).toEqual(0)
      
      expect(result).toBeUndefined()
    })
  })
})
