import Stack from '@/classes/game/Stack'
import Card from '@/classes/game/Card'

let stack
let instruction = new Card('INSTRUCTION', 2)
let method = new Card('METHOD', 2)
let repeat = new Card('REPEAT', 3)
let r_x = new Card('REPEAT', 1)
let variable = new Card('VARIABLE', 4)
let variable_sm = new Card('VARIABLE', 3)
let variable_lg = new Card('VARIABLE', 6)
let virus = new Card('VIRUS', 0)


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
    expect(stack.getScore()).toEqual(2)
  })
  test('calculate correct score with repeats', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    expect(stack.getScore()).toEqual(6)
    stack.cards.push(repeat)
    expect(stack.getScore()).toEqual(18)
  })
  test('calculate correct score virus', () => {
    stack.cards.push(instruction)
    stack.cards.push(virus)
    expect(stack.getScore()).toEqual(0)
  })
  test('calculate correct score virus on method', () => {
    stack.cards.push(method)
    stack.cards.push(virus)
    expect(stack.getScore()).toEqual(1)
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
  test('stack is complete true w/ no Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    stack.cards.push(repeat)
    expect(stack.isComplete()).toBeTruthy()
  })
  test('stack is complete false w/ no Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    expect(stack.isComplete()).toBeFalsy()
  })
  test('stack is complete true w/ Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    stack.cards.push(r_x)
    stack.cards.push(variable)
    expect(stack.isComplete()).toBeTruthy()
  })
  test('stack is complete false w/ Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    stack.cards.push(r_x)
    expect(stack.isComplete()).toBeFalsy()
  })
  test('stack is complete false w/ virus', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    stack.cards.push(repeat)
    stack.cards.push(virus)
    expect(stack.isComplete()).toBeFalsy()
  })
  test('stack has variable true', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable)
    expect(stack.hasVariable()).toBeTruthy()
  })
  test('stack has variable false', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    expect(stack.hasVariable()).toBeFalsy()
  })
  test('stack will accept repeat plain instruction', () => {
    stack.cards.push(instruction)
    expect(stack.willAccept(repeat)).toBeTruthy()
  })
  test('stack will not accept repeat already at max', () => {
    stack.cards.push(instruction)
    stack.cards.push(repeat)
    stack.cards.push(repeat)
    expect(stack.willAccept(repeat)).toBeFalsy()
  })
  test('stack will not accept repeat top is Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    expect(stack.willAccept(repeat)).toBeFalsy()
  })
  test('stack will accept variable top is Rx', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    expect(stack.willAccept(variable)).toBeTruthy()
  })
  test('stack will accept variable there is a smaller one in stack', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable_sm)
    stack.cards.push(repeat)
    expect(stack.willAccept(variable)).toBeTruthy()
  })
  test('stack will accept variable there is a smaller and a bigger one in stack', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable_sm)
    stack.cards.push(r_x)
    stack.cards.push(variable_lg)
    expect(stack.willAccept(variable)).toBeTruthy()
  })
  test('stack will not accept variable there is a bigger one in stack', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable)
    expect(stack.willAccept(variable_sm)).toBeFalsy()
  })
  test('stack will accept virus', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable)
    expect(stack.willAccept(virus)).toBeTruthy()
  })
  test('stack will not accept repeat card on top of virus', () => {
    stack.cards.push(instruction)
    stack.cards.push(virus)
    expect(stack.willAccept(repeat)).toBeFalsy()
  })
  test('stack will not accept variable replacement with virus top', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable_sm)
    expect(stack.willAccept(variable_lg)).toBeTruthy()
    stack.cards.push(virus)
    expect(stack.willAccept(variable_lg)).toBeFalsy()
  })
  test('replace lowest variable in stack', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    stack.cards.push(variable_lg)
    stack.cards.push(r_x)
    stack.cards.push(variable_sm)
    let replaced = stack.replaceLowestVar(variable)
    expect(replaced === variable_sm).toBeTruthy()
    expect(stack.cards.find(c => c === variable)).toBeTruthy()
  })
  test('No variables to replace', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    let replaced = stack.replaceLowestVar(variable)
    expect(replaced === variable).toBeTruthy()
    expect(stack.cards.find(c => c === variable)).toBeFalsy()
  })
  test('Trying to replace variable with non variable', () => {
    stack.cards.push(instruction)
    stack.cards.push(r_x)
    let replaced = stack.replaceLowestVar(repeat)
    expect(replaced === repeat).toBeTruthy()
    expect(stack.cards.find(c => c === repeat)).toBeFalsy()
  })
})
