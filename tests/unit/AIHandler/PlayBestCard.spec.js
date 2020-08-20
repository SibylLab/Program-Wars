import PlayBestCard from '@/classes/AIHandler/PlayBestCard'


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
    const players = 'players'
    const scores = 'scores'
    const deck = 'deck'

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

  /*
  test('method', () => {
    let result = action.method('card', 'state')
    expect(result.playType).toEqual('startNewStack')
    expect(result.card).toEqual('card')
    expect(result.player).toEqual(player)
    expect(result.target).toEqual(player)
  })

  describe('card plays that filter and sort stacks', () => {
    const hand = 'hand'
    const players = 'players'
    const method = 'method'
    const scores = 'scores'

    const stackScore_3 = {playerId: 0, willAccept: getValue(true), getScore: getValue(3)}
    const stackScore_6 = {playerId: 0, willAccept: getValue(true), getScore: getValue(6)}
    const stackNotPlayers = {playerId: 1, willAccept: getValue(true), getScore: getValue(4)}
    const stackNoAccept = {playerId: 0, willAccept: getValue(false), getScore: getValue(5)} 

    test('repeat can play', () => {
      const stacks = [stackNotPlayers, stackNoAccept, stackScore_3, stackScore_6]
      let result = action.repeat('card', {hand, players, stacks, method, scores})
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(stackScore_6)
    })
    test('repeat no play', () => {
      const stacks = [stackNotPlayers, stackNoAccept]
      let result = action.repeat('card', {hand, players, stacks, method, scores})
      expect(result).toBeUndefined()
    })
    test('variable can play', () => {
      let varStack = Object.assign(stackScore_3)
      varStack.getTop = getValue("REPEAT")
      const stacks = [stackNoAccept, varStack]

      let result = action.variable('card', {hand, players, stacks, method, scores})
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(varStack)
    })
    test('variable no play', () => {
      const stacks = [stackNotPlayers, stackNoAccept]
      let result = action.variable('card', {hand, players, stacks, method, scores})
      expect(result).toBeUndefined()
    })
    test('virus can play', () => {
      let notEnoughCards = Object.assign({cards: ['c']}, stackScore_3)
      notEnoughCards.playerId = 4

      let hackStack_3 = Object.assign({
        cards: ['c','c'], isHackable: getValue(true)
      }, stackScore_3)
      hackStack_3.playerId = 4

      let hackStack_6 = Object.assign({
        cards: ['c','c'], isHackable: getValue(true)
      }, stackScore_6)
      hackStack_6.playerId = 4

      const stacks = [stackNoAccept, hackStack_3, notEnoughCards, hackStack_6]

      let result = action.virus('card', {hand, players, stacks, method, scores})
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(hackStack_6)
    })
    test('virus no play', () => {
      let noHack = Object.assign(stackScore_3)
      noHack.cards = ['card', 'card']
      noHack.isHackable = getValue(false)
      const stacks = [stackNoAccept, noHack]

      let result = action.virus('card', {hand, players, stacks, method, scores})
      expect(result).toBeUndefined()
    })
  })

  describe('play safety and attack cards', () => {
    test('can play safety', () => {
      player.helpedBy = getValue(false)
      let result = action.playSafety({type: "ANTIVIRUS"})
      expect(result.playType).toEqual('playSpecialCard')
      expect(result.card).toEqual({type: "ANTIVIRUS"})
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(player)
      expect(player.helpedBy.mock.calls[0]).toEqual(["ANTIVIRUS"])
    })    
    test('cannot play safety', () => {
      player.helpedBy = getValue(true)
      let result = action.playSafety({type: "ANTIVIRUS"})
      expect(result).toBeUndefined()
    })    
    test('can play attack', () => {
      const isHurt = {id: 1, hurtBy: getValue(true)}
      const isProtected = {id: 2, hurtBy: getValue(false), isProtectedFrom: getValue(true)}
      const canAttack_3 = {id: 3, hurtBy: getValue(false), isProtectedFrom: getValue(false)}
      const canAttack_6 = {id: 4, hurtBy: getValue(false), isProtectedFrom: getValue(false)}
      const players = [isHurt, isProtected, canAttack_3, canAttack_6]

      let scores = {}
      scores[canAttack_6.id] = {score: 6},
      scores[canAttack_3.id] = {score: 3}

      let result = action.playAttack({type: "VIRUS"}, players, scores)
      expect(result.playType).toEqual('playSpecialCard')
      expect(result.card).toEqual({type: "VIRUS"})
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(canAttack_6)
    })    
    test('cannot play attack', () => {
      const isHurt = {id: 1, hurtBy: getValue(true)}
      let result = action.playAttack({type: "ANTIVIRUS"}, [isHurt], 'scores')
      expect(result).toBeUndefined()
    })    
    test('cannot play attack on self', () => {
      let result = action.playAttack({type: "ANTIVIRUS"}, [player], 'scores')
      expect(result).toBeUndefined()
    })    
  })
  */
})
