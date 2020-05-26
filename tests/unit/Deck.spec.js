import Deck from '@/classes/Models/Deck'

let count = function (cards, type) {
  return cards.reduce((acc, card) => {
    return card.type === type ? acc + 1 : acc
  }, 0)
}


describe('Deck.js', () => {
  it('test if the initial discard array is empty', () => {
    let testDeck = new Deck()
    expect(testDeck.discard.length).toEqual(0)
  })
  it('test the initDeck function for number of cards', () => {
    let testDeck = new Deck(1)
    expect(testDeck.cards.length).toEqual(72)
  })
  it('test the initDeck function for number of cards', () => {
    let testDeck = new Deck(3)
    expect(testDeck.cards.length).toEqual(219)
  })

  describe('correct setup for one player decks', () => {
    let deck1
    beforeEach(() => {
      deck1 = new Deck(1)
    })
    test('correct number of instructions', () => {
      expect(count(deck1.cards, 'I')).toEqual(27)
    })
    test('correct number of repeats', () => {
      expect(count(deck1.cards, 'R')).toEqual(14)
    })
    test('correct number of Rx', () => {
      let num = deck1.cards.reduce((acc, card) => {
        return card.type === 'R' && card.value === 1 ? acc + 1 : acc
      }, 0)
      expect(num).toEqual(5)
    })
    test('correct number of variables', () => {
      expect(count(deck1.cards, 'V')).toEqual(7)
    })
    it('correct number of hacks', () => {
      expect(count(deck1.cards, 'H')).toEqual(3)
    })
    it('correct number of viruses', () => {
      expect(count(deck1.cards, 'VIRUS')).toEqual(3)
    })
    it('correct number of power outages', () => {
      expect(count(deck1.cards, 'POWEROUTAGE')).toEqual(3)
    })
    it('correct number of anti viruses', () => {
      expect(count(deck1.cards, 'ANTIVIRUS')).toEqual(0)
    })
    it('correct number of generator cards', () => {
      expect(count(deck1.cards, 'GENERATOR')).toEqual(0)
    })
    it('correct number of firewall cards', () => {
      expect(count(deck1.cards, 'FIREWALL')).toEqual(0)
    })
    it('draw function works properly', () => {
      // The deck shuffles itself when created, no way of know what the top card is
      expect(deck1.draw()).not.toBeUndefined()
      expect(deck1.cards.length).toEqual(71)
    })
    // deleted shuffle test as it didn't really test anything
    // could write a new one to check that shuffle changes order a bit, but this
    // is inherently difficult to be sure of
  })

  describe('correct setup for two player decks', () => {
    let deck2
    beforeEach(() => {
      deck2 = new Deck(2)
    })
    test('correct number of anti virus cards', () => {
      expect(count(deck2.cards, 'ANTIVIRUS')).toEqual(1)
    })
    test('correct number of generator cards', () => {
      expect(count(deck2.cards, 'GENERATOR')).toEqual(1)
    })
    test('correct number of firewall cards', () => {
      expect(count(deck2.cards, 'FIREWALL')).toEqual(1)
    })
  })

  describe('correct setup for three player decks', () => {
    let deck3
    beforeEach(() => {
      deck3 = new Deck(3)
    })
    test('correct number instructions', () => {
      expect(count(deck3.cards, 'I')).toEqual(81)
    })
    test('correct number of repeats', () => {
      expect(count(deck3.cards, 'R')).toEqual(42)
    })
    test('correct number of Rx', () => {
      let num = deck3.cards.reduce((acc, card) => {
        return card.type === 'R' && card.value === 1 ? acc + 1 : acc
      }, 0)
      expect(num).toEqual(15)
    })
    test('correct number of variables', () => {
      expect(count(deck3.cards, 'V')).toEqual(21)
    })
    it('correct number of hacks', () => {
      expect(count(deck3.cards, 'H')).toEqual(9)
    })
    it('correct number of viruses', () => {
      expect(count(deck3.cards, 'VIRUS')).toEqual(9)
    })
    it('correct number of power outages', () => {
      expect(count(deck3.cards, 'POWEROUTAGE')).toEqual(9)
    })
    it('correct number of anti viruses', () => {
      expect(count(deck3.cards, 'ANTIVIRUS')).toEqual(1)
    })
    it('correct number of generator cards', () => {
      expect(count(deck3.cards, 'GENERATOR')).toEqual(1)
    })
    it('correct number of firewall cards', () => {
      expect(count(deck3.cards, 'FIREWALL')).toEqual(1)
    })
  })


  describe('correct setup for four player decks', () => {
    let deck4
    beforeEach(() => {
      deck4 = new Deck(4)
    })
    test('correct number of anti virus cards', () => {
      expect(count(deck4.cards, 'ANTIVIRUS')).toEqual(2)
    })
    test('correct number of generator cards', () => {
      expect(count(deck4.cards, 'GENERATOR')).toEqual(2)
    })
    test('correct number of firewall cards', () => {
      expect(count(deck4.cards, 'FIREWALL')).toEqual(2)
    })
  })
})
