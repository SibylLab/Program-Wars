import getters from '@/store/getters.js'


describe('vuex getters', () => {
  // Mock functions for players
  const isProtected = jest.fn(e => true)
  const isNotProtected = jest.fn(e => false)

  // Mock state
  const state = {
      activePlayerId: 1,
      players: [
        {id: 0, isProtectedFrom: isProtected},
        {id: 1},
        {id: 2, isProtectedFrom: isNotProtected}
      ],
      stacks: [
        {stackId: 25, playerId: 1},
        {stackId: 26, playerId: 0},
        {stackId: 27, playerId: 1},
        {stackId: 28, playerId: 0},
        {stackId: 29, playerId: 1}
      ],
      hands: [{id: 300, playerId: 0}, {id: 301, playerId: 1}],
      aiHandlers: [{id: 1000, playerId: 1}]
    }


  test('get the current players hand', () => {
    let hand = getters.getCurrentPlayerHand(state)
    expect(hand.id).toEqual(301)
    expect(hand.playerId).toEqual(1)
  })
  test('get the current player', () => {
    let player = getters.getCurrentPlayer(state)
    expect(player.id).toEqual(1)
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
  test('get an ai handler associated with the current player', () => {
    let handler = getters.getCurrentAiHandler(state)
    expect(handler.id).toEqual(1000)
    expect(handler.playerId).toEqual(1)
  })
  test('get an ai handler when current player is not an AI', () => {
    let localState = Object.assign({}, state)
    localState.activePlayerId = 0
    let handler = getters.getCurrentAiHandler(localState)
    expect(handler).toBeUndefined()
  })
  test('get a list of players not that can be attacked with a card type', () => {
    let opp = getters.getAttackableOpponents(state, {effect: "VIRUS"})
    expect(opp.length).toEqual(1)
    expect(opp[0].id).toEqual(2)
    expect(isProtected.mock.calls.length).toEqual(1)
    expect(isNotProtected.mock.calls.length).toEqual(1)
    expect(isProtected.mock.calls[0][0]).toEqual('VIRUS')
    expect(isNotProtected.mock.calls[0][0]).toEqual('VIRUS')
  })
})
