import Stack from '@/classes/Models/Stack'
import Card from '@/classes/Models/Card'

let stack
let instruction = new Card(2, 75, 'INSTRUCTION')
let group = new Card(3, 150, 'GROUP')
let repeat = new Card(4, 3, 'REPEAT')


describe('Stack.js', () => {
  beforeEach(() => {
    stack = new Stack(1)
  })
  test('constructor functions properly', () => {
    expect(stack.playerId).toEqual(1)
    expect(stack.id).not.toBeDefined()  // uuid is random so just make sure it is set
  })
  test('is empty true and false', () => {
    expect(stack.isEmpty()).toBeTruthy()
    stack.cards.push(instruction)
    expect(stack.isEmpty()).toBeFalsy()
  })
  test('get base card', () => {
    stack.cards.push(instruction)
    expect(stack.getBase()).toEqual(instruction)
  })
  test('get top card', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    expect(stack.getTop()).toEqual(repeat)
  })
  test('calculate correct score no repeats', () => {
    expect(stack.getScore()).toEqual(0)
    stack.cards.push(instruction)
    expect(stack.getScore()).toEqual(75)
  })
  test('calculate correct score with repeats', () => {
    stack.cards.push(group)
    stack.cards.push(repeat)
    expect(stack.getScore()).toEqual(450)
    stack.cards.push(repeat)
    expect(stack.getScore()).toEqual(1350)
  })
  test('maximum number of repeats (2)', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    expect(stack.hasMaxRepeats()).toBeFalsy()
    stack.cards.push(repeat)
    expect(stack.hasMaxRepeats()).toBeTruthy()
    stack.cards.push(repeat)
    expect(stack.hasMaxRepeats()).toBeTruthy()
  })
  test('stack is hackable true', () => {
    stack.cards.push(instruction)
    expect(stack.isHackable()).toBeTruthy()
  })
  test('stack is hackable false', () => {
    expect(stack.isHackable()).toBeFalsy()
    stack.cards.push(group)
    expect(stack.isHackable()).toBeFalsy()
  })
})
