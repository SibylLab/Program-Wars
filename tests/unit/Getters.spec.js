import getters from '@/store/getters.js'


describe('vuex getters', () => {
  // Mock functions
  const isProtected = jest.fn(e => e || true)
  const isNotProtected = jest.fn(e => e && false)
  const trueFn = jest.fn().mockReturnValue(true)
  const falseFn = jest.fn().mockReturnValue(false)

  // Mock state
  const state = {
      activeCard: {},
      players: [
        {id: 0, isProtectedFrom: isProtected, helpedBy: trueFn, hurtBy: trueFn},
        {id: 1, isProtectedFrom: isNotProtected, helpedBy: falseFn, hurtBy: trueFn},
        {id: 2, isProtectedFrom: isNotProtected, helpedBy: falseFn, hurtBy: falseFn},
        {id: 3, isProtectedFrom: isNotProtected, helpedBy: falseFn, hurtBy: trueFn}
      ],
      stacks: [
        {stackId: 25, playerId: 1, isHackable: trueFn},
        {stackId: 26, playerId: 0, isHackable: trueFn},
        {stackId: 27, playerId: 1, isHackable: falseFn},
        {stackId: 28, playerId: 0, isHackable: falseFn},
        {stackId: 29, playerId: 1, isHackable: falseFn},
        {stackId: 30, playerId: 2, isHackable: falseFn},
        {stackId: 31, playerId: 3, isHackable: trueFn},
      ],
      hands: [{id: 300, playerId: 0}, {id: 301, playerId: 1}],
      aiHandlers: [],
    }

  // Set the starting player
  state.activePlayer = state.players[1]


  test('get the current players hand', () => {
    let hand = getters.getCurrentPlayerHand(state)
    expect(hand.id).toEqual(301)
    expect(hand.playerId).toEqual(1)
  })
  test('get the current players stacks', () => {
    let stacks = getters.getCurrentPlayerStacks(state)
    expect(stacks.length).toEqual(3)
    expect(stacks[0].stackId).toEqual(25)
    expect(stacks[0].playerId).toEqual(1)
    expect(stacks[1].stackId).toEqual(27)
    expect(stacks[1].playerId).toEqual(1)
    expect(stacks[2].stackId).toEqual(29)
    expect(stacks[2].playerId).toEqual(1)
  })
  test('get an ai handler when current player is not an AI', () => {
    let localState = Object.assign({}, state)
    localState.activePlayer = state.players[0]
    let handler = getters.getCurrentAiHandler(localState)
    expect(handler).toBeUndefined()
  })
  test('get a list of players that can be attacked with a card type', () => {
    let opp = getters.getAttackableOpponents(state)
    {'VIRUS'}
    expect(opp.length).toEqual(1)
    expect(opp[0].id).toEqual(2)
    expect(isProtected.mock.calls.length).toEqual(1)
    expect(isNotProtected.mock.calls.length).toEqual(2)
  })
  test('get a list of players that can be hacked', () => {
    let opp = getters.getHackableOpponents(state)
    expect(opp.length).toEqual(1)
    expect(opp[0].id).toEqual(3)
  })
})
