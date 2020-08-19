import Sort from '@/classes/card/Sort'

describe('Sort class', () => {
  test('creating a new sort card', () => {
    const card = new Sort('deck')
    expect(card.getValue()).toEqual(5)
    expect(card.type).toEqual('SORT')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/sort.png')
  })

  test('playing the sort card', () => {
    const sortedCards = [1, 2, 3, 4]
    const deck = { addCardsToTop: jest.fn(), discard: jest.fn() }
    const playInfo = { sortedCards, deck }

    const card = new Sort(deck)
    card.play(playInfo)

    expect(sortedCards).toEqual([4, 3, 2, 1])
    expect(deck.addCardsToTop).toBeCalledTimes(1)
    expect(deck.addCardsToTop).toBeCalledWith(sortedCards)
    expect(deck.discard).toBeCalledTimes(1)
  })
})

