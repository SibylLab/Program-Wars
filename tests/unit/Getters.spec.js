import getters from '@/store/getters.js'

describe('vuex getters', () => {
  const state = {
      activePlayerId: 1,
      players: [{id: 0}, {id: 1}],
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
})
