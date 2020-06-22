import mutations from '@/store/mutations'

describe('mutations', () => {
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
  test('changeGameState', () => {
    let mockDeck = {cards: []}
    let state = {deck: mockDeck}
    mutations.createNewDeck(state, {newState: 'newState'})
    expect(state.deck).not.toEqual(mockDeck)
    expect(state.deck.cards.length).toEqual(78)
  })
})
