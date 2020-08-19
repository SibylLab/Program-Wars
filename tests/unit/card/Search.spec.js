import Search from '@/classes/card/Search'

describe('Search class', () => {
  test('creating a new search card', () => {
    const card = new Search('deck')
    expect(card.getValue()).toEqual(10)
    expect(card.type).toEqual('SEARCH')
    expect(card.deck).toEqual('deck')
    expect(card.image).toEqual('static/cardImages/search.png')
  })

  test('playing the search card', () => {
    const player = { hand: { addCard: jest.fn() } }
    const deck = { removeCard: jest.fn(), shuffle: jest.fn(), discard: jest.fn() }
    const chosenCard = 'card_recieved_from_search'
    const playInfo = { player, chosenCard, deck }

    const card = new Search(deck)
    card.play(playInfo)

    expect(player.hand.addCard).toBeCalledTimes(1)
    expect(player.hand.addCard).toBeCalledWith(chosenCard)

    expect(deck.removeCard).toBeCalledTimes(1)
    expect(deck.removeCard).toBeCalledWith(chosenCard)
    expect(deck.shuffle).toBeCalledTimes(1)
    expect(deck.discard).toBeCalledTimes(1)
  })
})
