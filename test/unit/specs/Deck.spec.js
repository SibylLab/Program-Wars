import Deck from '../../../src/classes/Deck'

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
    expect(testDeck.cards.length).to.equal(73)
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
    expect(instructionCounter).to.equal(36)
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

})
