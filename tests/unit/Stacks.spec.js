import Stack from '@/classes/Models/Stack'
import Card from '@/classes/Models/Card'

let testStack = new Stack(1, true)
let testCard = new Card(2, 3, 'I')
let testGroup = new Card(3, 3, 'G')
let testRep = new Card(4, 3, 'R')
let testRep2 = new Card(4, 3, 'R')
let testRep3 = new Card(4, 3, 'R')

describe('Stack.js', () => {
  it('test player id in stack', () => {
    expect(testStack.playerId).toEqual(1)
  })

  it('test bool side in stack', () => {
    expect(testStack.boolSide).toEqual(true)
  })

  it('test addCardToStack', () => {
    testStack.addCardToStack(testCard)
    expect(testStack.cards.length).toEqual(1)
  })

  it('test CalculateStackScore', () => {
    testStack.calculateStackScore()
    expect(testStack.score).toEqual(3)
    testStack.addCardToStack(testGroup)
    testStack.calculateStackScore()
    expect(testStack.score).toEqual(6)
    testStack.addCardToStack(testRep)
    testStack.calculateStackScore()
    expect(testStack.score).toEqual(18)
  })

  it('test StackTopCard', () => {
    expect(testStack.stackTopCard()).toEqual(testRep)
  })

  it('test popTopCard', () => {
    testStack.popTopCard()
    expect(testStack.cards.length).toEqual(2)
  })

  it('test stackBottomCard', () => {
    expect(testStack.stackBottomCard()).toEqual(testCard)
  })
  it('test maxRepeats', () => {
    testStack.calculateStackScore()
    expect(testStack.maxRepeats()).toEqual(false)
    testStack.addCardToStack(testRep)
    testStack.addCardToStack(testRep2)
    testStack.addCardToStack(testRep3)
    expect(testStack.maxRepeats()).toEqual(true)
  })
})
