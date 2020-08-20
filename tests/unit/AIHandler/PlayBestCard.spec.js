import PlayBestCard from '@/classes/AIHandler/PlayBestCard'

function fakeStack (score, accepts = true, isMethod = false) {
  return {
    getScore: jest.fn(() => { return score }),
    willAccept: jest.fn(() => { return accepts }),
    isMethod,
    cards: { length: 2 }
  }
}

describe('PlayBestCard', () => {
  const order = [
    'METHOD', 'VARIABLE', 'REPEAT', 'INSTRUCTION', 'ANTIVIRUS', 'FIREWALL',
    'SCAN', 'VIRUS', 'RANSOM'
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  }) 

  test('creating a new play best card action, and checking card priority', () => {
    const action = new PlayBestCard(order)
    expect(action.cardPriority.METHOD).toEqual(0)
    expect(action.cardPriority.INSTRUCTION).toEqual(3)
    expect(action.cardPriority.VIRUS).toEqual(7)
  })

  describe('handle', () => {
    const players = 'players'
    const scores = 'scores'
    const deck = 'deck'

    test('with saftey card in hand', () => {
      const action = new PlayBestCard(order)
      action.playSafety = jest.fn(() => { return 'saftey' })

      const sortSpy = jest.spyOn(PlayBestCard.prototype, 'sortHand')
      const validSpy = jest.spyOn(PlayBestCard.prototype, 'isValidCard')

      const card = { type: 'FIREWALL' }
      const hand = { cards: [card] }
      const player = { hand }
      const args = { player, players, scores, deck }
      let result = action.handle(player, players, scores, deck)

      expect(sortSpy).toBeCalledTimes(1)
      expect(sortSpy).toBeCalledWith(hand)
      expect(validSpy).toBeCalledTimes(1)
      expect(validSpy).toBeCalledWith(card)

      expect(action.playSafety).toBeCalledTimes(1)
      expect(action.playSafety).toBeCalledWith(card, args)
      expect(result).toEqual('saftey')
    })

    test('with negative effect card in hand', () => {
      const action = new PlayBestCard(order)
      action.playNegativeEffect = jest.fn(() => { return 'negativeEffect' })

      const card = { type: 'RANSOM' }
      const hand = { cards: [card] }
      const player = { hand }
      const args = { player, players, scores, deck }
      let result = action.handle(player, players, scores, deck)

      expect(action.playNegativeEffect).toBeCalledTimes(1)
      expect(action.playNegativeEffect).toBeCalledWith(card, args)
      expect(result).toEqual('negativeEffect')
    })

    test('with instruction card in hand', () => {
      const action = new PlayBestCard(order)
      action.instruction = jest.fn(() => { return 'instruction' })

      const card = { type: 'INSTRUCTION' }
      const hand = { cards: [card] }
      const player = { hand }
      const args = { player, players, scores, deck }
      let result = action.handle(player, players, scores, deck)

      expect(action.instruction).toBeCalledTimes(1)
      expect(action.instruction).toBeCalledWith(card, args)
      expect(result).toEqual('instruction')
    })

    test('when card type does not have implementation', () => {
      const action = new PlayBestCard(order)
      action.cardPriority.INVALID = 1000

      const card = { type: 'INVALID' }
      const hand = { cards: [card] }
      const player = { hand }
      let result = action.handle(player, players, scores, deck)

      expect(result).toBeUndefined()
    })

    test('when type is not in play order', () => {
      const action = new PlayBestCard(order)

      const card = { type: 'INVALID' }
      const hand = { cards: [card] }
      const player = { hand }
      let result = action.handle(player, players, scores, deck)

      expect(result).toBeUndefined()
    })
  })

  test('sorting a hand', () => {
    const action = new PlayBestCard(order)

    const card_I2 = { type: 'INSTRUCTION', value: 2 }
    const card_I3 = { type: 'INSTRUCTION', value: 3 }
    const card_N1 = { type: 'NOT_IN_ORDER', value: 0 }
    const card_N2 = { type: 'NOT_IN_ORDER', value: 0 }
    const card_R2 = { type: 'REPEAT', value: 2 }
    const hand = { cards: [card_N1, card_I2, card_N2, card_R2, card_I3] }
    let sorted = action.sortHand(hand)

    expect(sorted[0]).toBe(card_R2)
    expect(sorted[1]).toBe(card_I3)
    expect(sorted[2]).toBe(card_I2)
    
    // can't be entirely sure of order of these cards, but what matters is
    // that they are both pushed to the back of the list
    expect(sorted[3] === card_N1 || sorted[3] === card_N2).toBeTruthy()
    expect(sorted[4] === card_N1 || sorted[4] === card_N2).toBeTruthy()
  })

  describe('instruction', () => {
    test('when instruction can be added to method stack', () => {
      const action = new PlayBestCard(order)

      const method = {
        isComplete: jest.fn(() => { return false }),
        toLimit: jest.fn(() => { return 5 })
      }
      const player = { playField: { method }, hurtBy: jest.fn(() => { return false }) }
      const card = { value: 2 }
      let result = action.instruction(card, { player })

      expect(method.isComplete).toBeCalledTimes(1)
      expect(result.type).toEqual('playOnStack')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual(player)
      expect(result.player).toEqual(player)
      expect(result.stack).toEqual(method)
    })

    test('when method is already complete', () => {
      const action = new PlayBestCard(order)

      const method = {
        isComplete: jest.fn(() => { return true }),
        toLimit: jest.fn(() => { return 5 })
      }
      const player = { playField: { method }, hurtBy: jest.fn(() => { return false }) }
      const card = { value: 2 }
      let result = action.instruction(card, { player })

      expect(method.isComplete).toBeCalledTimes(1)
      expect(result).toBeUndefined()
    })

    test('when method is not complete, but card is to large', () => {
      const action = new PlayBestCard(order)

      const method = {
        isComplete: jest.fn(() => { return false }),
        toLimit: jest.fn(() => { return 1 })
      }
      const player = { playField: { method }, hurtBy: jest.fn(() => { return false }) }
      const card = { value: 3 }
      let result = action.instruction(card, { player })

      expect(method.isComplete).toBeCalledTimes(1)
      expect(result).toBeUndefined()
    })

    test('when player is under stack overflow', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return true }) }
      const card = { value: 3 }
      let result = action.instruction(card, { player })

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('STACK_OVERFLOW')
      expect(result).toBeUndefined()
    })
  }) 

  describe('method', () => {
    test('when method can start a new stack', () => {
      const action = new PlayBestCard(order)

      const player = { playField: {},  hurtBy: jest.fn(() => { return false }) }
      const card = { value: 0 }
      let result = action.method(card, { player })

      expect(result.type).toEqual('newStack')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual(player)
      expect(result.player).toEqual(player)
      expect(result.playField).toEqual(player.playField)
    })

    test('when player is hurt by stack overflow', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return true }) }
      const card = { value: 3 }
      let result = action.method(card, { player })

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('STACK_OVERFLOW')
      expect(result).toBeUndefined()
    })
  })

  describe('repeat', () => {
    const stackLow = fakeStack(5)
    const stackHigh = fakeStack(10)

    test('when repeat is played on stack with highest score', () => {
      const action = new PlayBestCard(order)

      const playField = { stacks: [stackLow, stackHigh] }
      const player = { playField,  hurtBy: jest.fn(() => { return false }) }
      const card = { value: 3 }
      let result = action.repeat(card, { player })

      expect(stackLow.willAccept).toBeCalledTimes(1)
      expect(stackLow.willAccept).toBeCalledWith(card)
      expect(stackLow.getScore).toHaveBeenCalled()

      expect(stackHigh.willAccept).toBeCalledTimes(1)
      expect(stackHigh.willAccept).toBeCalledWith(card)
      expect(stackHigh.getScore).toHaveBeenCalled()

      expect(result.type).toEqual('playOnStack')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual(player)
      expect(result.player).toEqual(player)
      expect(result.stack).toEqual(stackHigh)
    })

    test('when there are no stacks to play the repeat on', () => {
      const action = new PlayBestCard(order)

      const playField = { stacks: [] }
      const player = { playField,  hurtBy: jest.fn(() => { return false }) }
      const card = { value: 3 }
      let result = action.repeat(card, { player })

      expect(result).toBeUndefined()
    })

    test('when player is hurt by stack overflow', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return true }) }
      const card = { value: 3 }
      let result = action.repeat(card, { player })

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('STACK_OVERFLOW')
      expect(result).toBeUndefined()
    })
  })

  describe('variable', () => {
    const stack = fakeStack(5)

    test('when variable can be played on one of the stacks', () => {
      const action = new PlayBestCard(order)

      const stacks = [stack]
      stacks.sort = jest.fn(() => { return stacks }) // don't need to sort for this test
      const player = {
        playField: { stacks }, 
        hurtBy: jest.fn(() => { return false })
      }
      const card = { value: 3 }
      let result = action.variable(card, { player })

      expect(stack.willAccept).toBeCalledTimes(1)
      expect(stack.willAccept).toBeCalledWith(card)

      expect(result.type).toEqual('playOnStack')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual(player)
      expect(result.player).toEqual(player)
      expect(result.stack).toEqual(stack)
    })

    test('when there are no stacks to play on', () => {
      const action = new PlayBestCard(order)

      const stacks = []
      stacks.sort = jest.fn(() => { return stacks }) // don't need to sort for this test
      const player = {
        playField: { stacks }, 
        hurtBy: jest.fn(() => { return false })
      }
      const card = { value: 3 }
      let result = action.variable(card, { player })

      expect(result).toBeUndefined()
    })

    test('when player is hurt by stack overflow', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return true }) }
      const card = { value: 3 }
      let result = action.variable(card, { player })

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('STACK_OVERFLOW')
      expect(result).toBeUndefined()
    })
  })

  describe('virus', () => {
    const stackLow = fakeStack(5)
    const stackHigh = fakeStack(10)

    test('when virus can be played on one of the stacks', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return false }) }

      const stacks = [stackLow, stackHigh]
      const opponent = {
        playField: { stacks },
        protectedFrom: jest.fn(() => { return false })
      }

      const players = [player, opponent]
      const card = { value: 3 }
      let result = action.virus(card, { player, players })

      expect(stackLow.willAccept).toBeCalledTimes(1)
      expect(stackLow.willAccept).toBeCalledWith(card)
      expect(stackHigh.willAccept).toBeCalledTimes(1)
      expect(stackHigh.willAccept).toBeCalledWith(card)

      expect(result.type).toEqual('playOnStack')
      expect(result.card).toEqual(card)
      expect(result.cardOwner).toEqual(player)
      expect(result.player).toEqual(player)
      expect(result.stack).toEqual(stackHigh)
    })

    test('when opponent is protected, then there are no stacks', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return false }) }

      const stacks = [stackLow, stackHigh]
      const opponent = {
        playField: { stacks },
        protectedFrom: jest.fn(() => { return true })
      }

      const players = [player, opponent]
      const card = { value: 3 }
      let result = action.virus(card, { player, players })

      expect(result).toBeUndefined()
    })


    test('when player is hurt by stack overflow', () => {
      const action = new PlayBestCard(order)

      const player = { hurtBy: jest.fn(() => { return true }) }
      const card = { value: 3 }
      let result = action.virus(card, { player })

      expect(player.hurtBy).toBeCalledTimes(1)
      expect(player.hurtBy).toBeCalledWith('STACK_UNDERFLOW')
      expect(result).toBeUndefined()
    })
  })
})
