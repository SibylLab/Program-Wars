import GroupedStacks from '@/classes/game/GroupedStacks'

let grouped  // Set to a new grouped stack in beforeEach
let stack = {getScore: () => {return 5}}

describe('GroupedStacks.js', () => {
  beforeEach(() => {
    grouped = new GroupedStacks(1)
  })
  test('get stacks as an array', () => {
    grouped.stacks.add(stack)
    grouped.stacks.add(stack)
    let stacks = grouped.getStacks()
    expect(stacks.length).toEqual(1)
  })
  test('grouped stack has stack', () => {
    grouped.stacks.add(stack)
    expect(grouped.hasStack(stack)).toBeTruthy()
  })
  test('grouped stack does not have stack', () => {
    expect(grouped.hasStack(stack)).toBeFalsy()
  })
  test('reset the group', () => {
    grouped.stacks.add(stack)
    grouped.score = 4
    expect(grouped.hasStack(stack)).toBeTruthy()
    grouped.reset()
    expect(grouped.getStacks().length).toEqual(0)
    expect(grouped.hasStack(stack)).toBeFalsy()
    expect(grouped.score).toEqual(0)
  })
  test('add new stack to the group', () => {
    let isFull = grouped.toggleStack(stack, 6)
    expect(grouped.hasStack(stack)).toBeTruthy()
    expect(grouped.score).toEqual(5)
    expect(isFull).toBeFalsy()
  })
  test('remove stack from the group', () => {
    grouped.toggleStack(stack, 6)
    let isFull = grouped.toggleStack(stack, 6)
    expect(grouped.hasStack(stack)).toBeFalsy()
    expect(grouped.score).toEqual(0)
    expect(isFull).toBeFalsy()
  })
  test('add stack to get full score', () => {
    let isFull = grouped.toggleStack(stack, 5)
    expect(grouped.score).toEqual(5)
    expect(isFull).toBeTruthy()
  })
})

