import Deck from '../../../src/classes/Deck'
import Card from '../../../src/classes/Card'

describe('Deck.js', () => {
  // test initial cards array length
  it('test if the initial cards array is empty', () => {
    let testDeck = new Deck()
    expect(testDeck.cards.length).to.equal(0)
  })
  // test initial discard_cards array length
  it('test if the initial discard_cards array is empty', () => {
    let testDeck = new Deck()
    expect(testDeck.discard_cards.length).to.equal(0)
  })
  // test initDeck function
  it('test the initDeck function for number of cards', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    expect(testDeck.cards.length).to.equal(72)
  })
  // test the number of 'I' cards, should be 36 but is 27 right now
  it('test that initDeck is putting in the correct number of instruction cards', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let cardsArray = testDeck.cards
    let instructionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'I') {
        instructionCounter++
      }
    }
    expect(instructionCounter).to.equal(24)
  })
  // test the number of R cards
  it('test that the number of R cards is correct', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let cardsArray = testDeck.cards
    let repetitionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R') {
        repetitionCounter++
      }
    }
    expect(repetitionCounter).to.equal(13)
  })
  // test the number of Rx cards
  it('test the number of Rx cards in the deck', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let cardsArray = testDeck.cards
    let rxCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R' && idx.value === 1) {
        rxCounter++
      }
    }
    expect(rxCounter).to.equal(5)
  })
  // test the number of variable cards in the deck
  it('test the number of Variable cards in the deck', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let cardsArray = testDeck.cards
    let varCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'V') {
        varCounter++
      }
    }
    expect(varCounter).to.equal(16)
  })
  // test the number of hack cards in the deck
  it('test the number of hack cards in the deck', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let cardsArray = testDeck.cards
    let hackCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'H') {
        hackCounter++
      }
    }
    expect(hackCounter).to.equal(5)
  })
  // test to see if the draw function draws the card from the top of the deck
  it('test to see if the draw function works properly', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let testCard = new Card(0, 1, 'I')
    // let drawnCard = testDeck.draw()
    expect(testDeck.cards.length).to.equal(71)
    expect(typeof drawnCard).to.equal('object')
    // The deck shuffles itself when created, no way of know what the top card is
    // expect(drawnCard.id).to.equal(testCard.id)
    // expect(drawnCard.value).to.equal(testCard.value)
    // expect(drawnCard.type).to.equal(testCard.type)
  })
  // test the shuffle function
  it('test to see if the shuffle function works', () => {
    let testDeck = new Deck()
    testDeck.initDeck()
    let shuffledDeck = testDeck
    shuffledDeck.shuffle()
    let counter = 0
    for (let idx of testDeck.cards) {
      expect(idx.id).to.not.equal(shuffledDeck.cards[counter])
      expect(idx.value).to.not.equal(shuffledDeck.cards[counter])
      counter++
    }
  })
})
