/* eslint-disable no-trailing-spaces */
import {store} from '@/store/store'
import Card from '@/classes/Models/Card'

let card = new Card(55, 3, 'I', 'f')
let card2 = new Card(34, 2, 'R', 'v')
describe('test store.js getters', () => {
  it('test the store getCurrentPlayerId function', () => {
    store.state.activePlayer = 0
    expect(store.getters.getCurrentPlayerId).toEqual(0)
  })
  it('test the store maxPlayers function maxPlayers', () => {
    store.state.players = []
    expect(store.getters.maxplayers).toEqual(0)
  })
  it('test the store currentPlayerName function', () => {
    expect(store.getters.currentPlayerName).toEqual('')
  })
  it('test the store getCurrentPlayerHand function', () => {
    expect(JSON.stringify(store.getters.getCurrentPlayerHand) === JSON.stringify({})).toEqual(true)
  })
  it('test the store getCurrentPlayerStacks function', () => {
    expect(store.getters.getCurrentPlayerStacks).toEqual(undefined)
  })
  it('test the store getActivePlayer function', () => {
    expect(store.getters.getActivePlayer).toEqual(0)
  })
  it('test the store getActiveCard function', () => {
    expect(store.getters.getActiveCard).toEqual(undefined)
  })
  it('test the store getStacks function', () => {
    expect(Array.isArray(store.getters.getStacks)).toEqual(true)
  })
  it('test the store getPlayers function', () => {
    expect(Array.isArray(store.getters.getPlayers)).toEqual(true)
  })
  it('test the store getIsDiscard function', () => {
    expect(store.getters.getIsDiscard).toEqual(false)
  })
  it('test the store getIsHack function', () => {
    expect(store.getters.getIsHack).toEqual(false)
  })
  it('test the store getAiTurn function', () => {
    expect(store.getters.getAiTurn).toEqual(false)
  })
  it('test the store getHackedPlayer function', () => {
    expect(store.getters.getHackedPlayer).toEqual('')
  })
  it('test the store getCoinFlip function', () => {
    expect(store.getters.getCoinFlip).toEqual(0)
  })
  it('test the store getHasPlayed function', () => {
    expect(store.getters.getHasPlayed).toEqual(false)
  })
  it('test the store getgameState function', () => {
    expect(store.getters.getgameState).toEqual('newGame')
  })
  it('test the store getSelectedStacks function', () => {
    expect(Array.isArray(store.getters.getSelectedStacks)).toEqual(true)
  })
  it('test the store getSelectedStacksBoolean function', () => {
    expect(store.getters.getSelectedStacksBoolean).toEqual(undefined)
  })
  it('test the store getActiveSide function', () => {
    expect(store.getters.getActiveSide).toEqual(true)
  })
  it('test the store getScoreLimit function', () => {
    expect(store.getters.getScoreLimit).toEqual(10)
  })
  it('test the store groupStacks function', () => {
    expect(store.getters.groupStacks).toEqual(false)
  })
  it('test the store trueFalseAnim function', () => {
    expect(store.getters.trueFalseAnim).toEqual(false)
  })
  it('test the store getWinner function', () => {
    expect(store.getters.getWinner).toEqual(false)
  })
  it('test the store getWinnerName function', () => {
    expect(store.getters.getWinnerName).toEqual('')
  })
  it('test the store getWinnerScore function', () => {
    expect(store.getters.getWinnerScore).toEqual(0)
  })
  it('test the store getTips function', () => {
    expect(store.getters.getTips.tutorial).toEqual(true)
  })
  it('test the store getPlayerTurn function', () => {
    expect(store.getters.getPlayerTurn).toEqual(false)
  })
  it('test the store getCurrentPlayer function', () => {
    expect(store.getters.getCurrentPlayer).toEqual(undefined)
  })
  it('test the store getFirstRound function', () => {
    expect(store.getters.getFirstRound).toEqual(true)
  })
  it('test the store getCoinMsg function', () => {
    expect(store.getters.getCoinMsg).toEqual(false)
  })
  it('test the store getTutorialState function', () => {
    expect(store.getters.getTutorialState).toEqual(false)
  })
  it('test the store getFactIndex function', () => {
    expect(store.getters.getFactIndex).toEqual(0)
  })
  it('test the store getTutorialStep function', () => {
    expect(store.getters.getTutorialStep).toEqual(true)
  })
  it('test the store getDiscard function', () => {
    expect(Array.isArray(store.getters.getDiscard)).toEqual(true)
  })
  it('test the store getAiDependent function', () => {
    expect(store.getters.getAiDependent.scoreLimit).toEqual(10)
    let pay = {list: [{name: 'joe', isAi: false}, {name: 'lucy', isAi: true}]}
    store.commit('addPlayers', pay)
    store.state.hands.push({cards: [card], playerId: 0})
    store.state.hands.push({cards: [card2], playerId: 1})
    store.state.activePlayer = 0
    store.commit('addStackToPlayer', {playerId: 0, boolSide: true})
    store.commit('addStackToPlayer', {playerId: 0, boolSide: false})
    store.commit('addStackToPlayer', {playerId: 1, boolSide: true})
    store.commit('addStackToPlayer', {playerId: 1, boolSide: false})
    expect(store.getters.getAiDependent.hand.cards[0].type).toEqual('R')
  })
})
