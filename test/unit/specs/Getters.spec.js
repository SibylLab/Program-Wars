import {store} from '../../../src/store/store'

describe('test store.js getters', () => {
  it('test the store getCurrentPlayerId function', () => {
    expect(store.getters.getCurrentPlayerId).to.equal(0)
  })

  it('test the store maxPlayers function maxPlayers', () => {
    expect(store.getters.maxplayers).to.equal(undefined)
  })
  it('test the store currentPlayerNamefunction', () => {
    expect(store.getters.currentPlayerName).to.equal('')
  })
  it('test the store getCurrentPlayerHand function', () => {
    expect(store.getters.getCurrentPlayerHand).to.equal(undefined)
  })
  it('test the store getCurrentPlayerStacks function', () => {
    expect(store.getters.getCurrentPlayerStacks).to.equal(undefined)
  })
  it('test the store getActivePlayer function', () => {
    expect(store.getters.getActivePlayer).to.equal(0)
  })
  it('test the store getActiveCard function', () => {
    expect(store.getters.getActiveCard).to.equal(undefined)
  })
  it('test the store getStacks function', () => {
    expect(store.getters.getStacks).to.equal(undefined)
  })
  it('test the store getPlayers function', () => {
    expect(store.getters.getPlayers).to.equal(undefined)
  })
  it('test the store getIsDiscard function', () => {
    expect(store.getters.getIsDiscard).to.equal(false)
  })
  it('test the store getIsHack function', () => {
    expect(store.getters.getIsHack).to.equal(false)
  })
  it('test the store getAiTurn function', () => {
    expect(store.getters.getAiTurn).to.equal(false)
  })
  it('test the store getHackedPlayer function', () => {
    expect(store.getters.getHackedPlayer).to.equal('')
  })
  it('test the store getCoinFlip function', () => {
    expect(store.getters.getCoinFlip).to.equal(0)
  })
  it('test the store getHasPlayed function', () => {
    expect(store.getters.getHasPlayed).to.equal(false)
  })
  it('test the store getgameState function', () => {
    expect(store.getters.getgameState).to.equal('newGame')
  })
  it('test the store getSelectedStacks function', () => {
    expect(store.getters.getSelectedStacks).to.equal(undefined)
  })
  it('test the store getSelectedStacksBoolean function', () => {
    expect(store.getters.getSelectedStacksBoolean).to.equal(undefined)
  })
  it('test the store getActiveSide function', () => {
    expect(store.getters.getActiveSide).to.equal(true)
  })
  it('test the store getScoreLimit function', () => {
    expect(store.getters.getScoreLimit).to.equal(10)
  })
  it('test the store groupStacks function', () => {
    expect(store.getters.groupStacks).to.equal(false)
  })
  it('test the store trueFalseAnim function', () => {
    expect(store.getters.trueFalseAnim).to.equal(false)
  })
  it('test the store getWinner function', () => {
    expect(store.getters.getWinner).to.equal(false)
  })
  it('test the store getWinnerName function', () => {
    expect(store.getters.getWinnerName).to.equal('')
  })
  it('test the store getWinnerScore function', () => {
    expect(store.getters.getWinnerScore).to.equal(0)
  })
  it('test the store getTips function', () => {
    expect(store.getters.getTips).to.equal({fact: false, tutorial: true})
  })
  it('test the store getPlayerTurn function', () => {
    expect(store.getters.getPlayerTurn).to.equal(false)
  })
  it('test the store getCurrentPlayer function', () => {
    expect(store.getters.getCurrentPlayer).to.equal(undefined)
  })
  it('test the store getFirstRound function', () => {
    expect(store.getters.getFirstRound).to.equal(true)
  })
  it('test the store getAiDependent function', () => {
    expect(store.getters.getAiDependent).to.equal({hand: undefined, stack: undefined, opponents: undefined, player: undefined, scoreLimit: 10})
  })
  it('test the store getCoinMsg function', () => {
    expect(store.getters.getCoinMsg).to.equal(false)
  })
  it('test the store getTutorialState function', () => {
    expect(store.getters.getTutorialState).to.equal(false)
  })
  it('test the store getFactIndex function', () => {
    expect(store.getters.getFactIndex).to.equal(0)
  })
  it('test the store getTutorialStep function', () => {
    expect(store.getters.getTutorialStep).to.equal(true)
  })
})
