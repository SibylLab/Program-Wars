import actions from '@/store/actions.js'

function mockValue (value) { return jest.fn(() => {return value}) }


describe('vuex actions', () => {
  let context
  beforeEach(() => {
    context = {commit: mockValue(), dispatch: mockValue()}
  })
  
  test('newGame', () => {
    context.state = {players: ['player1', 'player2']}
    actions.newGame(context, 'payload')
    expect(context.commit.mock.calls.length).toEqual(6)
    expect(context.commit.mock.calls[0]).toEqual([ 'resetStateForGame' ])
    expect(context.commit.mock.calls[1]).toEqual([ 'addPlayers', 'payload' ])
    expect(context.commit.mock.calls[2]).toEqual([ 'setStartingPlayer' ])
    expect(context.commit.mock.calls[3]).toEqual([ 'createNewDeck' ])
    expect(context.commit.mock.calls[4]).toEqual(
      [ 'giveNewHand', {player: context.state.players[0]} ])
    expect(context.commit.mock.calls[5]).toEqual(
      [ 'giveNewHand', {player: context.state.players[1]} ])
    // does not check router push
  })
  test('leaveGame', () => {
    actions.leaveGame(context)
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'changeGameState', {newState: 'home'} ])
    expect(context.commit.mock.calls[1]).toEqual([ 'seenBackstory' ])
    // does not check router push
  })



  test('playCardOnStack', () => {
    actions.playCardOnStack(context, 'payload')
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeFromHand', 'payload' ])
    expect(context.commit.mock.calls[1]).toEqual([ 'addToStack', 'payload' ])
  })
  test('startNewStack', () => {
    actions.startNewStack(context, 'payload')
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeFromHand', 'payload' ])
    expect(context.commit.mock.calls[1]).toEqual([ 'newStack', 'payload' ])
  })
  test('playSpecialCard', () => {
    actions.playSpecialCard(context, 'payload')
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'addCardEffect', 'payload' ])
    expect(context.commit.mock.calls[1]).toEqual([ 'discardCard', 'payload' ])
  })
  test('groupStacks', () => {
    let payload = {target: 'stacks'}
    actions.groupStacks(context, payload)
    expect(context.commit.mock.calls.length).toEqual(3)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeStacks', {stacks: payload.target} ])
    expect(context.commit.mock.calls[1]).toEqual([ 'newStack', payload ])
    expect(context.commit.mock.calls[2]).toEqual([ 'removeFromHand', payload ])
  })

})
