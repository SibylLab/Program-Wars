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
})
