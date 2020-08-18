import MethodStack from '@/classes/stack/MethodStack'

describe('MethodStack class', () => {
  // fake data
  const player = { name: 'player' }
  const I2 = { type: 'INSTRUCTION', getValue: () => { return 2 } }
  const I3 = { type: 'INSTRUCTION', getValue: () => { return 3 } }

  test('calling the constructor', () => {
    const stack = new MethodStack(player)
    expect(stack.isMethod).toBeTruthy()
    expect(stack.adjustment).toEqual(0)
  })

  describe('getScore', () => {
    test('when there are a few cards and the adjustment is small', () => {
      const stack = new MethodStack(player)
      stack.addCard(I2)
      stack.addCard(I3)
      stack.adjustment = -2

      expect(stack.getScore()).toEqual(3)
    })

    test('when the stack adjustment puts the score below 0', () => {
      const stack = new MethodStack(player)
      stack.addCard(I2)
      stack.adjustment = -5

      expect(stack.getScore()).toEqual(0)
    })
  })

  test('hasMaxReapeats is always true', () => {
    const stack = new MethodStack(player)
    expect(stack.hasMaxRepeats()).toBeTruthy()
  })

  test('hasVariable is always false', () => {
    const stack = new MethodStack(player)
    // the stack will not accept this card in general, but we want to
    // make sure that even when there is a varaible it is false
    stack.addCard({ type: 'VARIABLE', value: 3 })
    expect(stack.hasVariable()).toBeFalsy()
  })

  describe('willAccept', () => {
    test('adding a card that will not put it over the limit', () => {
      const stack = new MethodStack(player)
      expect(stack.willAccept(I2)).toBeTruthy()
    })

    test('adding a card that will put it over the limit', () => {
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.addCard(I3)
      expect(stack.willAccept(I2)).toBeFalsy()
    })

    test('adding a card that fits only with the current negative adjustment', () => {
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.adjustment = -2
      expect(stack.willAccept(I2)).toBeFalsy()
    })

    test('adding a card that fits without current positive adjustment', () => {
      // Positive adjustments are allowed to put score over the limit
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.adjustment = 3
      expect(stack.willAccept(I2)).toBeTruthy()
    })

    test('adding a card that does not fit without current positive adjustment', () => {
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.addCard(I2)
      stack.adjustment = 3
      expect(stack.willAccept(I2)).toBeFalsy()
    })
  })

  describe('is the stack complete?', () => {
    test('yes', () => {
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      stack.addCard(I3)
      expect(stack.isComplete()).toBeTruthy()
    })

    test('no', () => {
      const stack = new MethodStack(player)
      stack.addCard(I3)
      stack.addCard(I3)
      expect(stack.isComplete()).toBeFalsy()
    })
  })

  test('finding out how far to the limit', () => {
    const stack = new MethodStack(player)
    stack.addCard(I3)
    stack.addCard(I3)
    expect(stack.toLimit()).toEqual(3)
  })
})
