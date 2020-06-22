import mutations from '@/store/mutations'



describe('mutations', () => {
  beforeEach(() => {
    const commit = jest.fn(() => { return true })
    mutations.commit = commit
  })

  test('resetStateForGame', () => {
    let state = {}
    mutations.resetStateForGame(state)
    expect(state.players.length).toEqual(0)
    expect(state.hands.length).toEqual(0)
    expect(state.stacks.length).toEqual(0)
    expect(state.aiHandlers.length).toEqual(0)
    expect(state.deck.cards.length).toEqual(78)
    expect(state.gameState).toEqual('game')
    expect(state.activePlayer).toBeUndefined()
    expect(state.activeCard).toBeUndefined()
    expect(state.scoreLimit).toEqual(75)
    expect(state.turnNumber).toEqual(0)
  })
  test('seenBackstory', () => {
    let state = {showBackstory: true}
    mutations.seenBackstory(state)
    expect(state.showBackstory).toBeFalsy()
  })
  test('setStartingPlayer', () => {
    let state = {players: [{id: 0}, {id: 1}]}
    mutations.setStartingPlayer(state)
    expect(state.activePlayer.id).toEqual(0)
  })
  test('changeGameState', () => {
    let state = {gameState: 'game'}
    mutations.changeGameState(state, {newState: 'newState'})
    expect(state.gameState).toEqual('newState')
  })
  test('createNewDeck', () => {
    let mockDeck = {cards: []}
    let state = {deck: mockDeck}
    mutations.createNewDeck(state, {newState: 'newState'})
    expect(state.deck).not.toEqual(mockDeck)
    expect(state.deck.cards.length).toEqual(78)
  })
  test('add human and AI player', () => {
    let playerInfo = [{name:'steve', ai: false}, {name:'n00b_b0t', ai: true}]
    let state = {players: [], aiHandlers: []}
    mutations.addPlayers(state, {players: playerInfo})
    expect(state.players.length).toEqual(2)
    expect(state.players[0].name).toEqual('steve')
    expect(state.players[1].name).toEqual('n00b_b0t')
    expect(state.aiHandlers.length).toEqual(1)
    expect(state.aiHandlers[0].player.name).toEqual('n00b_b0t')
  })
  test('give player a new hand they already have one', () => {
    let state = {}
    mutations.resetStateForGame(state)
    let mockHand = {playerId: 1}
    state.hands.push(mockHand)

    mutations.giveNewHand(state, {player: {id: 1}})
    expect(state.hands.length).toEqual(1)
    expect(state.hands[0].cards.length).toEqual(5)
    expect(mutations.commit.mock.calls.length).toEqual(1)
    expect(mutations.commit.mock.calls[0]).toEqual(['discardHand', {hand: mockHand}])
    expect(state.activeCard).toBeUndefined()
  })
  test('give player a new hand they dont have one yet', () => {
    let state = {}
    mutations.resetStateForGame(state)

    mutations.giveNewHand(state, {player: {id: 1}})
    expect(state.hands.length).toEqual(1)
    expect(state.hands[0].cards.length).toEqual(5)
    expect(mutations.commit.mock.calls.length).toEqual(0)
  })
  test('discard a hand of cards', () => {
    let state = {deck: {discard: []}}
    let mockHand = {
      cards: [
        {isMimic: true, card: "mockCard"},
        {isMimic: false, isExtra: false},
        {isMimic: false, isExtra: true}
      ]
    }

    mutations.discardHand(state, {hand: mockHand})
    expect(state.deck.discard.length).toEqual(2)
    expect(state.deck.discard[0]).toEqual('mockCard')
    expect(state.deck.discard[1]).toEqual(mockHand.cards[1])
  })
})
