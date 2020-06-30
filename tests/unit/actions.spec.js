import actions from '@/store/actions.js'

jest.mock('loglevel')

function mockValue (value) { return jest.fn(() => {return value}) }


describe('vuex actions', () => {
  let context, player
  beforeEach(() => {
    jest.useFakeTimers()
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

  describe('executeTurn', () => {
    test('game state is wait', () => {
      context.state = {gameState: 'wait', turnPlays: []}
      actions.executeTurn(context, 'payload')
      expect(context.state.turnPlays.length).toEqual(0)
    })
    test('play type is DISCARD', () => {
      let payload = {
        playType: 'DISCARD',
        player: {name: 'jeff'},
        card: {type: 'GROUP', value: 4}
      }
      context.state = {gameState: 'game', turnPlays: []}

      actions.executeTurn(context, payload)
      jest.runAllTimers()

      expect(context.state.turnPlays.length).toEqual(1)
      expect(context.state.turnPlays[0]).toEqual(payload)
      expect(context.commit.mock.calls.length).toEqual(6)
      expect(context.commit.mock.calls[0]).toEqual([ 'discardCard', payload ])
      expect(context.commit.mock.calls[1]).toEqual([ 'updatePlayerEffects', payload ])
      expect(context.commit.mock.calls[2]).toEqual([ 'addPlayedCard', payload ])
      expect(context.commit.mock.calls[3]).toEqual(
        [ 'changeGameState', {newState: 'wait'} ]
      )
      expect(context.commit.mock.calls[4]).toEqual([ 'drawCard' ])

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
      expect(context.commit.mock.calls[5]).toEqual(
        [ 'changeGameState', {newState: 'game'} ]
      )
      expect(context.dispatch.mock.calls.length).toEqual(1)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'endTurn' ])
    })
    test('play type is REDRAW', () => {
      // will not test all the intermediate steps already tested above
      let payload = {
        playType: 'REDRAW',
        player: {name: 'jeff'},
        card: {type: 'GROUP', value: 4}
      }
      context.state = {gameState: 'game', turnPlays: []}

      actions.executeTurn(context, payload)
      expect(context.state.turnPlays.length).toEqual(1)
      expect(context.state.turnPlays[0]).toEqual(payload)
      expect(context.commit.mock.calls[0]).toEqual([ 'giveNewHand', payload ])
      expect(context.commit.mock.calls[3]).toEqual(
        [ 'changeGameState', {newState: 'wait'} ]
      )
    })
    test('card is a mimic card', () => {
      // will not test all the intermediate steps already tested above
      let payload = {
        playType: 'playCardOnStack',
        card: {isMimic: true}
      }
      context.state = {gameState: 'game', turnPlays: []}

      actions.executeTurn(context, payload)
      expect(context.state.turnPlays.length).toEqual(1)
      expect(context.state.turnPlays[0]).toEqual(payload)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'playMimic', payload ])
    })
    test('all other turn types', () => {
      // will not test all the intermediate steps already tested above
      let payload = {
        playType: 'playCardOnStack',
        player: {name: 'jeff'},
        card: {type: 'GROUP', value: 4, isMimic: false}
      }
      context.state = {gameState: 'game', turnPlays: []}

      actions.executeTurn(context, payload)
      expect(context.state.turnPlays.length).toEqual(1)
      expect(context.state.turnPlays[0]).toEqual(payload)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'playCardOnStack', payload ])
    })
  })

  describe('endTurn', () => {
    test('game not over and next player not AI', () => {
      context.getters = {
        getPlayerScores: mockValue([ {score: 10}, {score: 20} ])
      }
      context.state = {
        scoreLimit: 75, 
        activeCard: 'card',
        activePlayer: {isAi: false}
      }
      actions.endTurn(context)
      expect(context.getters.getPlayerScores.mock.calls.length).toEqual(1)
      expect(context.state.activeCard).toBeUndefined()
      expect(context.commit.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls[0]).toEqual([ 'nextPlayer' ])
    })
    test('game not over and next player is AI', () => {
      context.getters = {
        getPlayerScores: mockValue([ {score: 10}, {score: 20} ])
      }
      context.state = {
        scoreLimit: 75, 
        activeCard: 'card',
        activePlayer: {isAi: true}
      }
      actions.endTurn(context)
      expect(context.getters.getPlayerScores.mock.calls.length).toEqual(1)
      expect(context.state.activeCard).toBeUndefined()
      expect(context.commit.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls[0]).toEqual([ 'nextPlayer' ])
      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500)

      jest.runAllTimers()
      expect(context.dispatch.mock.calls.length).toEqual(1)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'takeAiTurn' ])
    })
    test('game is over', () => {
      context.getters = {
        getPlayerScores: mockValue([ {playerId: 0, score: 60}, {playerId: 1, score: 80} ])
      }
      context.state = {
        scoreLimit: 75, 
        activeCard: 'card',
        activePlayer: {isAi: true},
        players: [{id: 0}, {id: 1, name: 'jeff'}]
      }
      actions.endTurn(context)
      expect(context.getters.getPlayerScores.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls[0]).toEqual(
        [ 'changeGameState', {newState: 'winner'} ]
      )
      expect(context.state.activeCard).toEqual('card')
    })

  })

  test('takeAiTurn', () => {
    let handler = {chooseAction: mockValue('move')}
    context.getters = {
      getCurrentAiHandler: handler,
      getCurrentPlayerHand: 'hand',
      getPlayerScores: mockValue('scores')
    }
    context.state = {players: 'players', stacks: 'stacks'}
    actions.takeAiTurn(context)
    expect(handler.chooseAction.mock.calls.length).toEqual(1)
    expect(handler.chooseAction.mock.calls[0]).toEqual(
      ['hand', 'players', 'stacks', 'scores']
    )
    expect(context.dispatch.mock.calls.length).toEqual(1)
    expect(context.dispatch.mock.calls[0]).toEqual([ 'executeTurn', 'move' ])
    // does not check bus.$emit
  })
  test('playCardOnStack', () => {
    let payload = {
      player: {name: 'jeff'},
      card: {type: 'REPEAT', value: 3},
      target: {getScore: mockValue(10)}
    }
    actions.playCardOnStack(context, payload)
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeFromHand', payload ])
    expect(context.commit.mock.calls[1]).toEqual([ 'addToStack', payload ])
  })
  test('startNewStack', () => {
    actions.startNewStack(context, 'payload')
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeFromHand', 'payload' ])
    expect(context.commit.mock.calls[1]).toEqual([ 'newStack', 'payload' ])
  })
  test('playSpecialCard', () => {
    let payload = {
      player: {name: 'jeff'},
      card: {type: 'RANSOM'},
      target: {name: 'phil'}
    }
    actions.playSpecialCard(context, payload)
    expect(context.commit.mock.calls.length).toEqual(2)
    expect(context.commit.mock.calls[0]).toEqual([ 'addCardEffect', payload ])
    expect(context.commit.mock.calls[1]).toEqual([ 'discardCard', payload ])
  })
  test('groupStacks', () => {
    let payload = {
      target: new Set([
        {getScore: mockValue(2)}, {getScore: mockValue(2)}
      ]),
      card: {type: 'GROUP', value: 4},
      player: {name: 'jeff'},
    }
    actions.groupStacks(context, payload)
    expect(context.commit.mock.calls.length).toEqual(3)
    expect(context.commit.mock.calls[0]).toEqual([ 'removeStacks', {stacks: payload.target} ])
    expect(context.commit.mock.calls[1]).toEqual([ 'newStack', payload ])
    expect(context.commit.mock.calls[2]).toEqual([ 'removeFromHand', payload ])
  })

  describe('playMimic', () => {
    test('mimicked card is a virus', () => {
      let payload = {
        card: {replace: mockValue({type: 'VIRUS'}), card: {type: 'test'}, player: 'p1'},
        player: 'test',
      }
      actions.playMimic(context, payload)
      expect(context.commit.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls[0]).toEqual([ 'discardCard', payload ])
      expect(context.dispatch.mock.calls.length).toEqual(1)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'playCardOnStack', payload ])
      expect(payload.card.type).toEqual('VIRUS')
      expect(payload.player).toEqual('test')
    })
    test('mimicked card is any other card', () => {
      let payload = {
        card: {replace: mockValue({type: 'GROUP'}), card: {type: 'test'}, player: 'p1'},
        player: 'test'
      }
      actions.playMimic(context, payload)
      expect(context.commit.mock.calls.length).toEqual(1)
      expect(context.commit.mock.calls[0]).toEqual([ 'discardCard', payload ])
      expect(payload.card.type).toEqual('GROUP')
      expect(payload.target).toEqual('test')
      expect(payload.player).toEqual('p1')
      expect(context.dispatch.mock.calls.length).toEqual(1)
      expect(context.dispatch.mock.calls[0]).toEqual([ 'playSpecialCard', payload ])
    })
  })

})
