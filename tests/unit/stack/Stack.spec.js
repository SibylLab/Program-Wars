import Stack from '@/classes/stack/Stack'

describe('Stack class', () => {
  // fake data
  const player = { name: 'player' }
  const baseI2 = { type: 'INSTRUCTION', getValue: () => { return 2 } }
  const baseM2 = { type: 'METHOD', getValue: () => { return 2 } }
  const R2 = { type: 'REPEAT', getValue: () => { return 2 } }
  const R3 = { type: 'REPEAT', getValue: () => { return 3 } }
  const Rx = { type: 'REPEAT', getValue: () => { return 1 } }
  const V3 = { type: 'VARIABLE', getValue: () => { return 3 } }
  const V4 = { type: 'VARIABLE', getValue: () => { return 4 } }
  const V5 = { type: 'VARIABLE', getValue: () => { return 5 } }
  const VIRUS = { type: 'VIRUS', getValue: () => { return 0 } }

  describe('constructor, getBase, and getTop', () => {
    test('creating a new stack with a given base card', () => {
      const stack = new Stack(baseI2, player)
      expect(stack.getBase()).toBe(baseI2)
      expect(stack.getTop()).toBe(baseI2)
    })

    test('creating a new stack with no base card', () => {
      const stack = new Stack(null, player)
      expect(stack.getTop()).toBeUndefined()
    })
  })

  test('popping the top card from the stack', () => {
    const stack = new Stack(baseI2, player)
    expect(stack.popTop()).toBe(baseI2)
    expect(stack.cards).toHaveLength(0)
  })

  describe('is the top Rx?', () => {
    test('yes', () => {
      const stack = new Stack(Rx, player)
      expect(stack.topIsRx()).toBeTruthy()
    })

    test('no', () => {
      const stack = new Stack(R2, player)
      expect(stack.topIsRx()).toBeFalsy()
    })

    test('no, card is repeat', () => {
      const stack = new Stack(V3, player)
      expect(stack.topIsRx()).toBeFalsy()
    })
  })

  describe('is there a variable in the stack?', () => {
    test('yes', () => {
      const stack = new Stack(V3, player)
      expect(stack.hasVariable()).toBeTruthy()
    })

    test('no', () => {
      const stack = new Stack(R2, player)
      expect(stack.hasVariable()).toBeFalsy()
    })
  })

  describe('getScore', () => {
    test('with standard card types', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(R2)
      expect(stack.getScore()).toEqual(4)

      stack.addCard(Rx)
      expect(stack.getScore()).toEqual(4)

      stack.addCard(V3) 
      expect(stack.getScore()).toEqual(12)
    })

    test('with virus on top and instruction base', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(R2)
      expect(stack.getScore()).toEqual(4)

      stack.addCard(VIRUS)
      expect(stack.getScore()).toEqual(0)
    })

    test('with virus on top and method base', () => {
      const stack = new Stack(baseM2, player)
      stack.addCard(R2)
      stack.addCard(R2)
      expect(stack.getScore()).toEqual(8)

      stack.addCard(VIRUS)
      expect(stack.getScore()).toEqual(4)
    })

    test('with empty stack', () => {
      const stack = new Stack(null, player)
      expect(stack.getScore()).toEqual(0)
    })
  })

  describe('replaceLowestVar', () => {
    test('when there is a lower variable in the stack', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(Rx)
      stack.addCard(V3)

      const replaced = stack.replaceLowestVar(V4)
      expect(replaced).toBe(V3)
      expect(stack.getTop()).toBe(V4)
      expect(stack.cards).toHaveLength(3)
    })

    test('when there are 2 Variables and the lower one is burried', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(Rx)
      stack.addCard(V3)
      stack.addCard(Rx)
      stack.addCard(V5)

      const replaced = stack.replaceLowestVar(V4)
      expect(replaced).toBe(V3)
      expect(stack.getTop()).toBe(V5)
      expect(stack.cards[2]).toBe(V4)
      expect(stack.cards).toHaveLength(5)
    })

    test('when there is a higher variable in the stack', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(Rx)
      stack.addCard(V5)

      const replaced = stack.replaceLowestVar(V4)
      expect(replaced).toBe(V4)
      expect(stack.getTop()).toBe(V5)
      expect(stack.cards).toHaveLength(3)
    })

    test('when there is no variable in the stack', () => {
      const stack = new Stack(baseI2, player)

      const replaced = stack.replaceLowestVar(V4)
      expect(replaced).toBe(V4)
      expect(stack.getTop()).toBe(baseI2)
      expect(stack.cards).toHaveLength(1)
    })
  })

  describe('willAccept', () => {
    describe('base card', () => {
      test('when stack is empty', () => {
        const stack = new Stack(null, player)
        expect(stack.willAccept(baseI2)).toBeTruthy()
        expect(stack.willAccept(baseM2)).toBeTruthy()
      })

      test('when stack has instruction base', () => {
        const stack = new Stack(baseI2, player)
        expect(stack.willAccept(baseI2)).toBeFalsy()
        expect(stack.willAccept(baseM2)).toBeFalsy()
      })

      test('when stack has method base', () => {
        const stack = new Stack(baseM2, player)
        expect(stack.willAccept(baseI2)).toBeFalsy()
        expect(stack.willAccept(baseM2)).toBeFalsy()
      })
    })

    describe('Repeat', () => {
      const card = Object.assign({}, R2)

      test('when top is Repeat', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(R2)
        expect(stack.willAccept(card)).toBeTruthy()
      })

      test('when top is Rx', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        expect(stack.willAccept(card)).toBeFalsy()
      })

      test('when there are max Repeats', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(R2)
        stack.addCard(R2)
        expect(stack.willAccept(card)).toBeFalsy()
      })

      test('when top is Virus', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(VIRUS)
        expect(stack.willAccept(card)).toBeFalsy()
      })

      test('when stack is empty', () => {
        const stack = new Stack(null, player)
        expect(stack.willAccept(card)).toBeFalsy()
      })
    })

    describe('Variable', () => {
      const card = Object.assign({}, V4)

      test('when top is Rx', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        expect(stack.willAccept(card)).toBeTruthy()
      })

      test('when top is lower value Variable', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        stack.addCard(V3)
        expect(stack.willAccept(card)).toBeTruthy()
      })

      test('when top is same value Variable', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        stack.addCard(V4)
        expect(stack.willAccept(card)).toBeFalsy()
      })

      test('when top is higher value Variable', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        stack.addCard(V5)
        expect(stack.willAccept(card)).toBeFalsy()
      })

      test('when there is a lower value Variable nested', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(Rx)
        stack.addCard(V3)
        stack.addCard(Rx)
        stack.addCard(V5)
        expect(stack.willAccept(card)).toBeTruthy()
      })
    })

    describe('Virus', () => {
      const card = Object.assign({}, VIRUS)

      test('when top is not Virus', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(R2)
        expect(stack.willAccept(card)).toBeTruthy()
      })

      test('when top is already Virus', () => {
        const stack = new Stack(baseM2, player)
        stack.addCard(VIRUS)
        expect(stack.willAccept(card)).toBeFalsy()
      })
    })
  })

  describe('isComplete', () => {
    test('when there are 2 regular Repeat cards', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(R2)
      stack.addCard(R3)
      expect(stack.isComplete()).toBeTruthy()
    })

    test('when there is an paired Rx and a Repeat', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(Rx)
      stack.addCard(V4)
      stack.addCard(R3)
      expect(stack.isComplete()).toBeTruthy()
    })

    test('when there is a Repeat and an unpaired Rx', () => {
      const stack = new Stack(baseI2, player)
      stack.addCard(R3)
      stack.addCard(Rx)
      expect(stack.isComplete()).toBeFalsy()
    })

    test('when there is only 1 Repeat', () => {
      const stack = new Stack(baseM2, player)
      stack.addCard(R3)
      expect(stack.isComplete()).toBeFalsy()
    })

    test('when there is a Virus on top of a complete stack', () => {
      const stack = new Stack(baseM2, player)
      stack.addCard(R2)
      stack.addCard(R3)
      stack.addCard(VIRUS)
      expect(stack.isComplete()).toBeFalsy()
    })

    test('when the stack is empty', () => {
      const stack = new Stack(null, player)
      expect(stack.isComplete()).toBeFalsy()
    })
  })

})
