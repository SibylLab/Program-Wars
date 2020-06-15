import aiHelpers from '@/classes/ai/aiHelpers'


describe('aiHelpers', () => {
  const topRepeat = jest.fn(() => { return {type: "REPEAT"} })
  const topVar = jest.fn(() => { return {type: "VARIABLE"} })
  const getValue = (v) => { return jest.fn(() => { return v }) }

  const cards = [
    {type: "GROUP"},
    {type: "REPEAT", value: 1},
    {type: "VARIABLE", value: 3},
    {type: "REPEAT", value: 1},
    {type: "VARIABLE", value: 5}
  ]
  const stack = {getTop: topVar, cards: cards}

  describe('varStackCompare', () => {
    test('only a has top Rx', () => {
      let a = {getTop: topRepeat}
      let b = {getTop: topVar}
      let result = aiHelpers.varStackCompare(a, b)
      expect(result).toEqual(-1)
    })
    test('only b has top Rx', () => {
      let a = {getTop: topVar}
      let b = {getTop: topRepeat}
      let result = aiHelpers.varStackCompare(a, b)
      expect(result).toEqual(1)
    })
    test('both a and b have top Rx', () => {
      let a = {getTop: topRepeat, getScore: getValue(1)}
      let b = {getTop: topRepeat, getScore: getValue(10)}
      let result = aiHelpers.varStackCompare(a, b)
      expect(result).toEqual(9)
    })
    test('both stacks just contain vars', () => {
      let result = aiHelpers.varStackCompare(stack, stack)
      expect(result).toEqual(0)
    })
  })

  describe('lowestVar', () => {
    const cards2 = [
      {type: "GROUP"},
      {type: "REPEAT", value: 1},
      {type: "VARIABLE", value: 6},
      {type: "REPEAT", value: 1},
      {type: "VARIABLE", value: 4}
    ]
    const stack2 = {cards: cards2}

    test('lowestVar first var is lower', () => {
      let result = aiHelpers.lowestVar(stack)
      expect(result).toEqual(3)
    })
    test('lowestVar second var is lower', () => {
      let result = aiHelpers.lowestVar(stack2)
      expect(result).toEqual(4)
    })
  })

  describe('groupStacks', () => {
    const stack_1a = {getScore: getValue(1)}
    const stack_1b = {getScore: getValue(1)}
    const stack_1c = {getScore: getValue(1)}
    const stack_3 = {getScore: getValue(3)}
    const stack_4 = {getScore: getValue(4)}

    test('simple one stack has goal', () => {
      const stacks = [stack_3]
      let result = aiHelpers.groupStacks(3, stacks)
      expect(result.size).toEqual(1)
      expect(result.has(stack_3)).toBeTruthy()
    })
    test('simple one stack does not have goal', () => {
      const stacks = [stack_3]
      let result = aiHelpers.groupStacks(4, stacks)
      expect(result.size).toEqual(0)
    })
    test('several stacks single stack meets goal', () => {
      const stacks = [stack_4, stack_1a, stack_3, stack_1b]
      let result = aiHelpers.groupStacks(3, stacks)
      expect(result.size).toEqual(1)
      expect(result.has(stack_3)).toBeTruthy()
    })
    test('several stacks multiple solutions want [3, 1, 1, 1]', () => {
      const stacks = [stack_1a, stack_4, stack_3, stack_1b, stack_1c]
      let result = aiHelpers.groupStacks(6, stacks)
      expect(result.size).toEqual(4)
      expect(result.has(stack_3)).toBeTruthy()
      expect(result.has(stack_1a)).toBeTruthy()
      expect(result.has(stack_1b)).toBeTruthy()
      expect(result.has(stack_1c)).toBeTruthy()
    })
    test('several stacks does not have goal', () => {
      const stacks = [stack_1a, stack_3, stack_4]
      let result = aiHelpers.groupStacks(6, stacks)
      expect(result.size).toEqual(0)
    })
  })
})
