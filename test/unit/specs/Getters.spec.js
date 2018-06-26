import {store} from '../../../src/store/store'

describe('test store.js getters', () => {
  it('test the store ', () => {
    expect(store.getters.getCurrentPlayerId).to.equal(0)
  })

  it('test the store function maxPlayers', () => {
    expect(store.getters.maxplayers).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.currentPlayerName).to.equal('')
  })
  it('test the store function', () => {
    expect(store.getters.getCurrentPlayerHand).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getCurrentPlayerStacks).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getActivePlayer).to.equal(0)
  })
  it('test the store function', () => {
    expect(store.getters.getActiveCard).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getStacks).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getPlayers).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getIsDiscard).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getIsHack).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getAiTurn).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getHackedPlayer).to.equal('')
  })
  it('test the store function', () => {
    expect(store.getters.getCoinFlip).to.equal(0)
  })
  it('test the store function', () => {
    expect(store.getters.getHasPlayed).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getgameState).to.equal('newGame')
  })
  it('test the store function', () => {
    expect(store.getters.getSelectedStacks).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getSelectedStacksBoolean).to.equal(undefined)
  })
  it('test the store function', () => {
    expect(store.getters.getActiveSide).to.equal(true)
  })
  it('test the store function', () => {
    expect(store.getters.getScoreLimit).to.equal(10)
  })
  it('test the store function', () => {
    expect(store.getters.groupStacks).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.trueFalseAnim).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getWinner).to.equal(false)
  })
  it('test the store function', () => {
    expect(store.getters.getWinnerName).to.equal('')
  })
  it('test the store function', () => {
    expect(store.getters.getWinnerScore).to.equal(0)
  })
})
