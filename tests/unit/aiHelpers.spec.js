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

  describe('findGroup', () => {
    const stack1 = {getScore: getValue(1)}
    const stack2 = {getScore: getValue(2)}
    const stack3 = {getScore: getValue(3)}
    const stack4 = {getScore: getValue(4)}
    const stack5 = {getScore: getValue(5)}

    test('simple one stack has goal', () => {
      const stacks = [stack5]
      let result = aiHelpers.findGroup(5, stacks)
      expect(result.has(stack5)).toBeTruthy()
    })
    test('simple one stack does not have goal', () => {
      const stacks = [stack5]
      let result = aiHelpers.findGroup(6, stacks)
      expect(result).toBeUndefined()
    })
    test('several stacks single stack meets goal', () => {
      const stacks = [stack5, stack3, stack4, stack2, stack1]
      let result = aiHelpers.findGroup(2, stacks)
      expect(result.has(stack2)).toBeTruthy()
    })
    test('several stacks mutiple stacks meets goal', () => {
      const stacks = [stack5, stack3, stack4, stack2, stack1]
      let result = aiHelpers.findGroup(2, stacks)
      // Because the selection is random we cannot be sure which
      // stacks will be selected. However with this small number of them
      // we can be confident that we will find one.
      expect(result).toBeDefined()
    })
    test('several stacks does not have goal', () => {
      const stacks = [stack1, stack1, stack1, stack1, stack1]
      let result = aiHelpers.findGroup(6, stacks)
      expect(result).toBeUndefined()
    })
  })
})
