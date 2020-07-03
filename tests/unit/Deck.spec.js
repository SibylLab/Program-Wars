import Deck from '@/classes/game/Deck'

let count = function (cards, type) {
  return cards.reduce((acc, card) => {
    return card.type === type ? acc + 1 : acc
  }, 0)
}


describe('Deck.js', () => {
  test('constructor functions as expected', () => {
    let testDeck = new Deck()
    expect(testDeck.discard.length).toEqual(0)
    expect(testDeck.cards.length).toEqual(83)
  })
  test('deck refreshes when trying to draw a card from empty deck', () => {
    let testDeck = new Deck(1)
    let numCards = testDeck.cards.length
    for (let i = 0; i < numCards ; i++) {
      let card = testDeck.draw()
      testDeck.discard.push(card)
    }
    expect(testDeck.cards.length).toEqual(0)
    expect(testDeck.discard.length).toEqual(83)

    testDeck.draw()
    expect(testDeck.cards.length).toEqual(82)
    expect(testDeck.discard.length).toEqual(0)
  })

  describe('correct setup for deck', () => {
    let deck
    beforeEach(() => {
      deck = new Deck()
    })
    test('correct number of instructions', () => {
      expect(count(deck.cards, 'INSTRUCTION')).toEqual(28)
    })
    test('correct number of methods', () => {
      expect(count(deck.cards, 'METHOD')).toEqual(12)
    })
    test('correct number of repeats', () => {
      expect(count(deck.cards, 'REPEAT')).toEqual(16)
    })
    test('correct number of Rx', () => {
      let num = deck.cards.reduce((acc, card) => {
        return card.type === 'REPEAT' && card.value === 1 ? acc + 1 : acc
      }, 0)
      expect(num).toEqual(5)
    })
    test('correct number of variables', () => {
      expect(count(deck.cards, 'VARIABLE')).toEqual(7)
    })
    test('correct number of virus', () => {
      expect(count(deck.cards, 'VIRUS')).toEqual(3)
    })
    test('correct number of ransom', () => {
      expect(count(deck.cards, 'RANSOM')).toEqual(3)
    })
    test('correct number of spyware', () => {
      expect(count(deck.cards, 'SPYWARE')).toEqual(3)
    })
    test('correct number of trojan', () => {
      expect(count(deck.cards, 'TROJAN')).toEqual(3)
    })
    test('correct number of anti viruses', () => {
      expect(count(deck.cards, 'ANTIVIRUS')).toEqual(1)
    })
    test('correct number of firewall cards', () => {
      expect(count(deck.cards, 'FIREWALL')).toEqual(2)
    })
    test('correct number of scan cards', () => {
      expect(count(deck.cards, 'SCAN')).toEqual(5)
    })
    test('draw function works properly', () => {
      // The deck shuffles itself when created, no way of know what the top card is
      expect(deck.draw()).not.toBeUndefined()
      expect(deck.cards.length).toEqual(82)
    })
  })

  test('refresh deck when it needs cards added', () => {
    let testDeck = new Deck()
    for (let i = 0; i < 5; i++) { testDeck.draw() }
    expect(testDeck.cards.length).toEqual(78)
    testDeck.refresh()
    expect(testDeck.cards.length).toEqual(92)
  })
})
