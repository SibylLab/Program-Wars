import mutations from '@/store/mutations'

function mockValue (value) { return jest.fn(() => {return value}) }


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

  describe('giveNewHand', () => {
    test('player has a hand already', () => {
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
    test('player has no hand', () => {
      let state = {}
      mutations.resetStateForGame(state)

      mutations.giveNewHand(state, {player: {id: 1}})
      expect(state.hands.length).toEqual(1)
      expect(state.hands[0].cards.length).toEqual(5)
      expect(mutations.commit.mock.calls.length).toEqual(0)
    })
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
  test('setActiveCard', () => {
    let state = {}
    let mockCard = {id: 1}
    mutations.setActiveCard(state, {newCard: mockCard})
    expect(state.activeCard).toBe(mockCard)
    // Not sure how to test proper bus.$emit
  })

  describe('nextPlayer', () => {
    test('player is not last player in list', () => {
      let m_players = [{id: 0}, {id: 1}]
      let state = {activePlayer: m_players[0], players: m_players}
      mutations.nextPlayer(state)
      expect(state.activePlayer.id).toEqual(1)
    })
    test('player is last player in list', () => {
      let m_players = [{id: 0}, {id: 1}]
      let state = {activePlayer: m_players[1], players: m_players}
      mutations.nextPlayer(state)
      expect(state.activePlayer.id).toEqual(0)
    })
  })

  test('update player effects one removed, one not', () => {
    let return0 = mockValue(0)
    let return2 = mockValue(2)
    let mockPlayer = {
      removeEffect: mockValue(),
      positiveEffects: [{takeTurn: return0}],
      negativeEffects: [{takeTurn: return2}]
    }
    mutations.updatePlayerEffects({}, {player: mockPlayer})
    expect(return0.mock.calls.length).toEqual(1)
    expect(return2.mock.calls.length).toEqual(1)
    expect(mockPlayer.removeEffect.mock.calls.length).toEqual(1)
    expect(mockPlayer.removeEffect.mock.calls[0]).toEqual([ {takeTurn: return0} ])
  })
  test('drawCard', () => {
    let state = {
      deck: {draw: mockValue('card')},
      hands: [{playerId: 1, cards: []}],
      activePlayer: {id: 1}
    }
    mutations.drawCard(state)
    expect(state.deck.draw.mock.calls.length).toEqual(1)
    expect(state.hands[0].cards.length).toEqual(1)
    expect(state.hands[0].cards[0]).toEqual('card')
  })

  describe('discardCard', () => {
    test('normal card', () => {
      let mockCard = {isMimic: false, isExtra: false}
      let mockPlayer = {id: 1}
      let state = {
        hands: [{playerId: 1, cards: [mockCard]}],
        deck: {discard: []},
        activeCard: mockCard,
      }
      mutations.discardCard(state, {player: mockPlayer, card: mockCard})
      expect(state.hands[0].cards.length).toEqual(0)
      expect(state.deck.discard.length).toEqual(1)
      expect(state.deck.discard[0]).toBe(mockCard)
      expect(state.activeCard).toBeUndefined()
    })
    test('mimic card', () => {
      let mockCard = {isMimic: true, isExtra: false, card: 'card'}
      let mockPlayer = {id: 1}
      let state = {
        hands: [{playerId: 1, cards: [mockCard]}],
        deck: {discard: []},
        activeCard: mockCard,
      }
      mutations.discardCard(state, {player: mockPlayer, card: mockCard})
      expect(state.hands[0].cards.length).toEqual(0)
      expect(state.deck.discard.length).toEqual(1)
      expect(state.deck.discard[0]).toBe(mockCard.card)
    })
    test('extra card', () => {
      let mockCard = {isMimic: false, isExtra: true}
      let mockPlayer = {id: 1}
      let state = {
        hands: [{playerId: 1, cards: [mockCard]}],
        deck: {discard: []},
        activeCard: mockCard,
      }
      mutations.discardCard(state, {player: mockPlayer, card: mockCard})
      expect(state.hands[0].cards.length).toEqual(0)
      expect(state.deck.discard.length).toEqual(0)
    })
  })

  describe('addCardEffect', () => {
    test('card is SCAN', () => {
      let payload = {card: {type: 'SCAN'}}
      mutations.addCardEffect({}, payload)
      expect(mutations.commit.mock.calls.length).toEqual(1)
      expect(mutations.commit.mock.calls[0]).toEqual([ 'playScan', payload ])
    })
    test('card is safety', () => {
      let payload = {
        card: {type: 'ANTIVIRUS', isSafety: mockValue(true)},
        target: {addPositive: mockValue()}
      }
      mutations.addCardEffect({}, payload)
      expect(payload.card.isSafety.mock.calls.length).toEqual(1)
      expect(mutations.commit.mock.calls.length).toEqual(1)
      expect(mutations.commit.mock.calls[0]).toEqual([ 'cleanMalware', payload ])
      expect(payload.target.addPositive.mock.calls.length).toEqual(1)
      expect(payload.target.addPositive.mock.calls[0]).toEqual([ payload.card.type ])
    })
    test('card is TROJAN', () => {
      let state = {
        hands: [{playerId: 1, cards: [{type: 'REPEAT', value: 3}]}],
      }
      let payload = {
        card: {type: 'TROJAN', isSafety: mockValue(false)},
        player: {id: 2},
        target: {id: 1, addPositive: mockValue()}
      }
      mutations.addCardEffect(state, payload)
      expect(state.hands[0].cards.length).toEqual(1)
      expect(state.hands[0].cards[0].type).toEqual('REPEAT')
      expect(state.hands[0].cards[0].isMimic).toBeTruthy()
    })
    test('card is attack', () => {
      let payload = {
        card: {type: 'RANSOM', isSafety: mockValue(false), isAttack: mockValue(true)},
        player: {id: 2},
        target: {id: 1, addNegative: mockValue()}
      }
      mutations.addCardEffect({}, payload)
      expect(payload.card.isAttack.mock.calls.length).toEqual(1)
      expect(payload.target.addNegative.mock.calls.length).toEqual(1)
      expect(payload.target.addNegative.mock.calls[0]).toEqual(
        [ payload.card.type, payload.player.id ]
      )
    })
    test('card is not an effect card', () => {
      let payload = {
        card: {type: 'GROUP', isSafety: mockValue(false), isAttack: mockValue(false)},
      }
      mutations.addCardEffect({}, payload)
      expect(mutations.commit.mock.calls.length).toEqual(0)
    })
  })

  describe('cleanMalware', () => {
    test('use antivirus and clean trojans and virus', () => {
      let payload = {card: {type: 'ANTIVIRUS'}, player: {id: 1}}
      let m_cards = [{isMimic: true, card: 'card'}, {isMimic: false}]
      let m_stacks = [{playerId: 1, getTop: mockValue({type: 'VIRUS'}), cards: ['virus']},
                      {playerId: 1, getTop: mockValue({type: 'REPEAT'})}]
      let state = {
        hands: [{playerId: 1, cards: m_cards}],
        stacks: m_stacks, 
        deck: {discard: []}
      }
      mutations.cleanMalware(state, payload)
      expect(m_cards.length).toEqual(2)
      expect(m_cards[0]).toEqual('card')
      expect(m_stacks[0].cards.length).toEqual(0)
      expect(state.deck.discard.length).toEqual(1)
      expect(state.deck.discard[0]).toEqual('virus')
    })
    test('use firewall and clean trojans', () => {
      let m_cards = [{isMimic: true, card: 'card'}, {isMimic: false}]
      let state = {hands: [{playerId: 1, cards: m_cards}]}
      let payload = {card: {type: 'FIREWALL'}, player: {id: 1}}

      mutations.cleanMalware(state, payload)
      expect(m_cards.length).toEqual(2)
      expect(m_cards[0]).toEqual('card')
    })
  })

  describe('playScan', () => {

  })

  test('removeFromHand', () => {
    let m_cards = [{id: 300}, {id: 301}]
    let state = {hands: [{playerId: 1, cards: m_cards}]}
    let payload = {card: {id: 300}, player: {id: 1}}
    mutations.removeFromHand(state, payload)
    expect(state.hands[0].cards.length).toEqual(1)
    expect(state.hands[0].cards[0].id).toEqual(301)
  })

  describe('addToStack', () => {

  })

  test('removeStacks', () => {
    let state = {
      stacks: [{id: 200}, {id: 201, cards: ['card']}, {id: 202}],
      deck: {discard: []}
    }
    let payload = {stacks: new Set([state.stacks[1]])}

    mutations.removeStacks(state, payload)
    expect(state.stacks.length).toEqual(2)
    expect(state.stacks[0].id).toEqual(200)
    expect(state.stacks[1].id).toEqual(202)
    expect(state.deck.discard.length).toEqual(1)
    expect(state.deck.discard[0]).toEqual('card')
  })

  describe('addPlayedCard', () => {
    test('actual card is given', () => {
      let payload = {
        card: 'card',
        player: {objectives: {cardsPlayed: []}}
      }
      mutations.addPlayedCard({}, payload)
      expect(payload.player.objectives.cardsPlayed.length).toEqual(1)
      expect(payload.player.objectives.cardsPlayed[0]).toEqual('card')
    })
    test('payload.card is undefined', () => {
      let payload = {
        player: {objectives: {cardsPlayed: []}}
      }
      mutations.addPlayedCard({}, payload)
      expect(payload.player.objectives.cardsPlayed.length).toEqual(0)
    })
  })
})
