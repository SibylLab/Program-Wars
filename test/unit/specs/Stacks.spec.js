import Stack from '../../../src/classes/Models/Stack'
import Card from '../../../src/classes/Models/Card'

let testStack = new Stack(1, true)
let testCard = new Card(2, 3, 'I')
let testGroup = new Card(3, 3, 'G')
let testRep = new Card(4, 3, 'R')

describe('Stack.js', () => {
  it('test player id in stack', () => {
    expect(testStack.playerId).to.equal(1)
  })

  it('test bool side in stack', () => {
    expect(testStack.boolSide).to.equal(true)
  })

  it('test addCardToStack', () => {
    testStack.addCardToStack(testCard)
    expect(testStack.cards.length).to.equal(1)
  })

  it('test CalculateStackScore', () => {
    testStack.calculateStackScore()
    expect(testStack.score).to.equal(3)
    testStack.addCardToStack(testGroup)
    testStack.calculateStackScore()
    expect(testStack.score).to.equal(6)
    testStack.addCardToStack(testRep)
    testStack.calculateStackScore()
    expect(testStack.score).to.equal(18)
  })

  it('test StackTopCard', () => {
    expect(testStack.stackTopCard()).to.equal(testRep)
  })

  it('test popTopCard', () => {
    testStack.popTopCard()
    expect(testStack.cards.length).to.equal(2)
  })

  it('test stackBottomCard', () => {
    expect(testStack.stackBottomCard()).to.equal(testCard)
  })
})
