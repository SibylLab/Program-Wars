import getters from '@/store/getters.js'


describe('vuex getters', () => {
  // Mock functions
  function mockValue (v) { return jest.fn(() => { return v }) }

  // Mock players
  const m_players = [
    {id: 0, isProtectedFrom: mockValue(false), hurtBy: mockValue(false)},
    {id: 1, isProtectedFrom: mockValue(true), hurtBy: mockValue(false)},
    {id: 2, isProtectedFrom: mockValue(false), hurtBy: mockValue(true)},
    {id: 3, isProtectedFrom: mockValue(false), hurtBy: mockValue(false)}
  ]

  // Mock Stacks
  const m_stacks = [
    {stackId: 25, playerId: 1},
    {stackId: 26, playerId: 0},
    {stackId: 27, playerId: 1},
    {stackId: 28, playerId: 0},
    {stackId: 29, playerId: 1},
  ]

  test('get the current players hand', () => {
    const state = { activePlayer: m_players[1], hands: [{playerId: m_players[1].id}] }
    let hand = getters.getCurrentPlayerHand(state)
    expect(hand.playerId).toEqual(1)
  })
  test('get the current players stacks', () => {
    const state = { activePlayer: m_players[1], stacks: m_stacks }
    let stacks = getters.getCurrentPlayerStacks(state)
    expect(stacks.length).toEqual(3)
    expect(stacks[0].stackId).toEqual(25)
    expect(stacks[1].stackId).toEqual(27)
    expect(stacks[2].stackId).toEqual(29)
  })
  test('get an ai handler when current player is AI', () => {
    const state = { activePlayer: m_players[1], aiHandlers: [{player: m_players[1]}] }
    let handler = getters.getCurrentAiHandler(state)
    expect(handler.player).toBe(m_players[1])
  })
  test('get an ai handler when current player is not an AI', () => {
    const state = { activePlayer: m_players[0], aiHandlers: [{player: m_players[1]}] }
    let handler = getters.getCurrentAiHandler(state)
    expect(handler).toBeUndefined()
  })
  test('list of attackable players', () => {
    const state = {
      activeCard: {type: 'RANSOM'},
      activePlayer: m_players[0],
      players: m_players,
    }
    let opps = getters.getAttackableOpponents(state)
    expect(opps.length).toEqual(1)
    expect(opps[0]).toBe(m_players[3])
    expect(opps[0].isProtectedFrom.mock.calls).toEqual([ ["RANSOM"] ])
    expect(opps[0].hurtBy.mock.calls).toEqual([ ["RANSOM"] ])
  })

  describe('getPlayerScores', () => {
    test('no special effects', () => {
      let mockStacks = [
        {playerId: 1, getScore: mockValue(6)},
        {playerId: 0, getScore: mockValue(15)},
        {playerId: 1, getScore: mockValue(3)},
      ]
      let state = {
        players: [{id: 0, hurtBy: mockValue(false)}, {id: 1, hurtBy: mockValue(false)}],
        stacks: mockStacks,
      }
      let scoreFunction = getters.getPlayerScores(state)  // returns a function
      let scores = scoreFunction()
      expect(scores.length).toEqual(2)
      expect(scores[0].playerId).toEqual(0)
      expect(scores[0].base).toEqual(15)
      expect(scores[0].score).toEqual(15)
      expect(scores[1].playerId).toEqual(1)
      expect(scores[1].base).toEqual(9)
      expect(scores[1].score).toEqual(9)
    })
    test('ransomware on 1 player', () => {
      let mockStacks = [
        {playerId: 1, getScore: mockValue(6)},
        {playerId: 0, getScore: mockValue(15)},
        {playerId: 1, getScore: mockValue(3)},
      ]
      let state = {
        players: [
          {id: 0, hurtBy: mockValue(true), negativeEffects: [{type: 'RANSOM', attackerId: 1}]},
          {id: 1, hurtBy: mockValue(false)}],
        stacks: mockStacks,
      }
      let scoreFunction = getters.getPlayerScores(state)  // returns a function
      let scores = scoreFunction()
      expect(scores.length).toEqual(2)
      expect(scores[0].playerId).toEqual(0)
      expect(scores[0].base).toEqual(15)
      expect(scores[0].score).toEqual(5)
      expect(scores[1].playerId).toEqual(1)
      expect(scores[1].base).toEqual(9)
      expect(scores[1].score).toEqual(19)
    })
  })
})

