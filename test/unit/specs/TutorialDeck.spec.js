import TutorialDeck from '../../../src/classes/TutorialDeck'
// import Card from '../../../src/classes/Card'

describe('TutorialDeck.js', () => {
  // test initial cards array length
  it('test if the initial cards array is empty', () => {
    let testDeck = new TutorialDeck()
    expect(testDeck.cards.length).to.equal(0)
  })

  // test initial discard_cards array length
  it('test if the initial discard_cards array is empty', () => {
    let testDeck = new TutorialDeck()
    expect(testDeck.discard_cards.length).to.equal(0)
  })

  // test initDeck function 1 player
  it('test the initDeck function for number of cards', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    expect(testDeck.cards.length).to.equal(32)
  })

  // test initDeck function 3 players
  it('test the initDeck function for number of cards', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    expect(testDeck.cards.length).to.equal(96)
  })

  // test the number of 'I' cards 1 player
  it('test that initDeck is putting in the correct number of instruction cards', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let instructionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'I') {
        instructionCounter++
      }
    }
    expect(instructionCounter).to.equal(13)
  })

  // test the number of 'I' cards 3 players
  it('test that initDeck is putting in the correct number of instruction cards', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let instructionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'I') {
        instructionCounter++
      }
    }
    expect(instructionCounter).to.equal(39)
  })

  // test the number of R cards 1 player
  it('test that the number of R cards is correct', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let repetitionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R') {
        repetitionCounter++
      }
    }
    expect(repetitionCounter).to.equal(6)
  })

  // test the number of R cards 3 player
  it('test that the number of R cards is correct', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let repetitionCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R') {
        repetitionCounter++
      }
    }
    expect(repetitionCounter).to.equal(18)
  })

  // test the number of Rx cards 1 player
  it('test the number of Rx cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let rxCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R' && idx.value === 1) {
        rxCounter++
      }
    }
    expect(rxCounter).to.equal(1)
  })

  // test the number of Rx cards 3 players
  it('test the number of Rx cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let rxCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'R' && idx.value === 1) {
        rxCounter++
      }
    }
    expect(rxCounter).to.equal(3)
  })

  // test the number of variable cards in the deck 1 player
  it('test the number of Variable cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let varCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'V') {
        varCounter++
      }
    }
    expect(varCounter).to.equal(6)
  })

  // test the number of variable cards in the deck 3 players
  it('test the number of Variable cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let varCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'V') {
        varCounter++
      }
    }
    expect(varCounter).to.equal(18)
  })

  // test the number of hack cards in the deck 1 player
  it('test the number of hack cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let hackCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'H') {
        hackCounter++
      }
    }
    expect(hackCounter).to.equal(1)
  })

  // test the number of Virus cards in the deck 1 player
  it('test the number of virus cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'VIRUS') {
        counter++
      }
    }
    expect(counter).to.equal(1)
  })

  // test the number of Power Outage cards in the deck 1 player
  it('test the number of power outage cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'POWEROUTAGE') {
        counter++
      }
    }
    expect(counter).to.equal(1)
  })

  // PROTECTION CARDS
  // test the number of AntiVirus cards in the deck 1 player
  it('test the number of AntiVirus cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'ANTIVIRUS') {
        counter++
      }
    }
    expect(counter).to.equal(1)
  })

  // test the number of Generator cards in the deck 1 player
  it('test the number of Generator cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'GENERATOR') {
        counter++
      }
    }
    expect(counter).to.equal(1)
  })

  // test the number of Firewall cards in the deck 1 player
  it('test the number of Firewall cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'FIREWALL') {
        counter++
      }
    }
    expect(counter).to.equal(1)
  })

  // test the number of hack cards in the deck 3 players
  it('test the number of hack cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let hackCounter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'H') {
        hackCounter++
      }
    }
    expect(hackCounter).to.equal(3)
  })

  // test the number of Virus cards in the deck 3 player
  it('test the number of virus cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'VIRUS') {
        counter++
      }
    }
    expect(counter).to.equal(3)
  })

  // test the number of Power Outage cards in the deck 3 player
  it('test the number of power outage cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'POWEROUTAGE') {
        counter++
      }
    }
    expect(counter).to.equal(3)
  })

  // PROTECTION CARDS
  // test the number of AntiVirus cards in the deck 3 player
  it('test the number of AntiVirus cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'ANTIVIRUS') {
        counter++
      }
    }
    expect(counter).to.equal(3)
  })

  // test the number of Generator cards in the deck 3 player
  it('test the number of Generator cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'GENERATOR') {
        counter++
      }
    }
    expect(counter).to.equal(3)
  })

  // test the number of Firewall cards in the deck 3 player
  it('test the number of Firewall cards in the deck', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(3)
    let cardsArray = testDeck.cards
    let counter = 0
    for (let idx of cardsArray) {
      if (idx.type === 'FIREWALL') {
        counter++
      }
    }
    expect(counter).to.equal(3)
  })

  // test to see if the draw function draws the card from the top of the deck
  it('test to see if the draw function works properly', () => {
    let testDeck = new TutorialDeck()
    testDeck.initDeck(1)
    let drawnCard = testDeck.draw()
    expect(testDeck.cards.length).to.equal(32)
    expect(typeof drawnCard).to.equal('object')
  })
})
