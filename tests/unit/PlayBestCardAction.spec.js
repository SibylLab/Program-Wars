import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'


describe('PlayBestCardAction', () => {
  const getValue = (v) => { return jest.fn(() => { return v }) }

  let player, order, action
  beforeEach(() => {
    player = {id: 0}
    order = [
      'GROUP', 'VARIABLE', 'REPEAT', 'INSTRUCTION', 'ANTIVIRUS', 'FIREWALL',
      'OVERCLOCK', 'HACK', 'VIRUS'
    ]
    action = new PlayBestCardAction(player, order) 
  }) 

  test('constructor and play order', () => {
    expect(action.playOrder['GROUP']).toEqual(0)
    expect(action.playOrder['INSTRUCTION']).toEqual(3)
    expect(action.playOrder['VIRUS']).toEqual(8)
  })

  describe('handle', () => {
    const players = 'players'
    const stacks = 'stacks'
    const scores = 'scores'

    test('with saftey card in hand', () => {
      const card = {type: 'FIREWALL', value: 0, isSafety: getValue(true)}
      const hand = {cards: [card]}
      action.playSafety = getValue('play safety')

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual('play safety')
      expect(action.playSafety.mock.calls.length).toEqual(1)
      expect(action.playSafety.mock.calls[0]).toEqual([card])
    })
    test('with attack card in hand', () => {
      const card = {
        type: 'VIRUS',
        value: 0,
        isSafety: getValue(false),
        isAttack: getValue(true)
      }
      const hand = {cards: [card]}
      action.playAttack = getValue('play attack')

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual('play attack')
      expect(action.playAttack.mock.calls.length).toEqual(1)
      expect(action.playAttack.mock.calls[0]).toEqual([card, players, scores])
    })
    test('with instruction card in hand', () => {
      const card = {
        type: 'INSTRUCTION',
        value: 2,
        isSafety: getValue(false),
        isAttack: getValue(false)
      }
      const hand = {cards: [card]}
      action.instruction = getValue('play instruction')

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual('play instruction')
      expect(action.instruction.mock.calls.length).toEqual(1)
      expect(action.instruction.mock.calls[0]).toEqual([card, {hand, players, stacks, scores}])
    })
    test('card type does not have implementation', () => {
      action.playOrder.INVALID = 1000
      const card = {
        type: 'INVALID',
        value: 2,
        isSafety: getValue(false),
        isAttack: getValue(false)
      }
      const hand = {cards: [card]}
      let result = action.handle(hand, players, stacks, scores)
      expect(result).toBeUndefined()
    })
    test('type not in play order', () => {
      const hand = {cards: [{type: 'INVALID', value: 0}]}
      let result = action.handle(hand, players, stacks, scores)
      expect(result).toBeUndefined()
    })
  })

  test('sortHand has card to satisfy all comparison conditions', () => {
    const card_I2 = {type: 'INSTRUCTION', value: 2}
    const card_I3 = {type: 'INSTRUCTION', value: 3}
    const card_N1 = {type: 'NOT_IN_ORDER', value: 0}
    const card_N2 = {type: 'NOT_IN_ORDER', value: 0}
    const card_R2 = {type: 'REPEAT', value: 2}
    const hand = {cards: [card_N1, card_I2, card_N2, card_R2, card_I3]}

    let sorted = action.sortHand(hand)
    expect(sorted[0]).toBe(card_R2)
    expect(sorted[1]).toBe(card_I3)
    expect(sorted[2]).toBe(card_I2)
    expect(sorted[3]).toBe(card_N1)
    expect(sorted[4]).toBe(card_N2)
  })

  test('instruction', () => {
    let result = action.instruction('card', 'state')
    expect(result.playType).toEqual('startNewStack')
    expect(result.card).toEqual('card')
    expect(result.player).toEqual(player)
    expect(result.target).toEqual(player)
  }) 

  describe('card plays that filter and sort stacks', () => {
    const hand = 'hand'
    const players = 'players'
    const scores = 'scores'

    const stackScore_3 = {playerId: 0, willAccept: getValue(true), getScore: getValue(3)}
    const stackScore_6 = {playerId: 0, willAccept: getValue(true), getScore: getValue(6)}
    const stackNotPlayers = {playerId: 1, willAccept: getValue(true), getScore: getValue(4)}
    const stackNoAccept = {playerId: 0, willAccept: getValue(false), getScore: getValue(5)} 

    test('repeat can play', () => {
      const stacks = [stackNotPlayers, stackNoAccept, stackScore_3, stackScore_6]
      let result = action.repeat('card', {hand, players, stacks, scores})
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(stackScore_6)
    })
    test('repeat no play', () => {
      const stacks = [stackNotPlayers, stackNoAccept]
      let result = action.repeat('card', {hand, players, stacks, scores})
      expect(result).toBeUndefined()
    })
    test('variable can play', () => {
      let varStack = Object.assign(stackScore_3)
      varStack.getTop = getValue("REPEAT")
      const stacks = [stackNoAccept, varStack]

      let result = action.variable('card', {hand, players, stacks, scores})
      expect(result.playType).toEqual('playCardOnStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(varStack)
    })
    test('variable no play', () => {
      const stacks = [stackNotPlayers, stackNoAccept]
      let result = action.variable('card', {hand, players, stacks, scores})
      expect(result).toBeUndefined()
    })
    test('hack can play', () => {
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

      let result = action.hack('card', {hand, players, stacks, scores})
      expect(result.playType).toEqual('hackStack')
      expect(result.card).toEqual('card')
      expect(result.player).toEqual(player)
      expect(result.target).toEqual(hackStack_6)
    })
    test('hack no play', () => {
      let noHack = Object.assign(stackScore_3)
      noHack.cards = ['card', 'card']
      noHack.isHackable = getValue(false)
      const stacks = [stackNoAccept, noHack]

      let result = action.hack('card', {hand, players, stacks, scores})
      expect(result).toBeUndefined()
    })
    test('group can play', () => {
      const stacks = [stackScore_3, stackNotPlayers]
      let result = action.group({value: 3}, {hand, players, stacks, scores})
      expect(result.playType).toEqual('groupStacks')
      expect(result.card).toEqual({value: 3})
      expect(result.player).toEqual(player)
      expect(result.target.has(stackScore_3)).toBeTruthy()
    })
    test('group no stacks available to group', () => {
      const stacks = [stackScore_6]
      let result = action.group({value: 4}, {hand, players, stacks, scores})
      expect(result).toBeUndefined()
    })
    test('group stacks do not meet value', () => {
      const stacks = [stackScore_3]
      let result = action.group({value: 4}, {hand, players, stacks, scores})
      expect(result).toBeUndefined()
    })
  })
})
