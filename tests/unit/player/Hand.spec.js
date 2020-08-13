import Hand from '@/classes/player/Hand'

describe('Hand class', () => {
  const card = {id: 'card-1', isMimic: false}
  const card2 = {id: 'card-2', isMimic: true}
  const card3 = {id: 'card-3', isMimic: false}

  test('creating a new hand', () => {
    const hand = new Hand('player')
    expect(hand.player).toEqual('player')
    expect(hand.maxCards).toEqual(5)
    expect(hand.cards).toHaveLength(0)
  })

  test('getting the number of cards', () => {
    const hand = new Hand('player')
    expect(hand.numCards()).toEqual(0)
  })

  test('getting a card by id from the hand', () => {
    const hand = new Hand('player')
    hand.cards.push(card)
    expect(hand.getCardById('card-1')).toBe(card)
    expect(hand.getCardById('card-77')).toBeUndefined()
  })

  test('getting a card at a specific position in the hand', () => {
    const hand = new Hand('player')
    hand.cards.push(card)
    expect(hand.getCardAt(0)).toBe(card)
    expect(hand.getCardAt(10)).toBeUndefined()
  })

  test('adding a list of cards to the hand', () => {
    const hand = new Hand('player')
    hand.addCards([card, card2])
    expect(hand.cards).toEqual([card, card2])
  })

  test('taking all cards from the hand', () => {
    const hand = new Hand('player')
    hand.addCards([card, card2])
    const cards = hand.takeAll()
    expect(hand.cards).toHaveLength(0)
    expect(cards).toEqual([card, card2])
  })

  test('removing a list of cards from the hand', () => {
    const hand = new Hand('player')
    hand.addCards([card, card2, card3])
    hand.removeCards([card, card2])
    expect(hand.cards).toEqual([card3])
  })

  test('remove all mimics from the hand', () => {
    const hand = new Hand('player')
    hand.addCards([card, card2, card3])
    const mimics = hand.cleanMimics()
    expect(hand.cards).toEqual([card, card3])
    expect(mimics).toEqual([card2])
  })
})
