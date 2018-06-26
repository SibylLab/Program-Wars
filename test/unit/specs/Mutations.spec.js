import {store} from '../../../src/store/store'
import Card from '../../../src/classes/Models/Card'

describe('test store.js getters', () => {
  it('test the store resetState function', () => {
    store.commit('resetState')
    expect(store.getters.getWinner).to.equal(false)
  })
  it('test the store addPlayers function', () => {
    let pay = {list: [{name: 'joe', isAi: false}, {name: 'lucy', isAi: true}]}
    store.commit('addPlayers', pay)
    expect(store.getters.getPlayers[0].name).to.equal('joe')
  })
  it('test the store changeBonusScore function', () => {
    store.commit('changeBonusScore', {id: 0, trueScore: 1, falseScore: 0})
    expect(store.getters.getPlayers[0].bonusTrue).to.equal(1)
    expect(store.getters.getPlayers[0].bonusFalse).to.equal(0)
  })
  it('test the store endTurn function', () => {
    store.commit('endTurn', 1)
    expect(store.getters.getPlayers[0].name).to.equal('joe')
  })
  it('test the store giveFirewall function', () => {
    store.state.activeCard = new Card(55, 3, 'I', 'f')
    store.commit('giveFirewall', 0)
    expect(store.getters.getPlayers[0].hasFirewall).to.equal(true)
  })
  it('test the store giveGenerator function', () => {
    store.commit('giveGenerator', 0)
    expect(store.getters.getPlayers[0].hasGenerator).to.equal(true)
  })
  it('test the store giveAntiVirus function', () => {
    store.commit('giveAntiVirus', 0)
    store.commit('giveFirewall', 0)
    store.commit('giveGenerator', 0)
    expect(store.getters.getPlayers[0].hasAntiVirus).to.equal(true)
  })
  it('test the store giveOverclock and giveVirus functions', () => {
    store.commit('giveOverclock', 0)
    store.commit('giveVirus', 0)
    store.commit('giveVirus', 1)
    store.commit('giveOverclock', 1)
    expect(store.getters.getPlayers[0].hasVirus).to.equal(false)
    expect(store.getters.getPlayers[0].hasOverclock).to.equal(false)
    expect(store.getters.getPlayers[1].hasVirus).to.equal(false)
    expect(store.getters.getPlayers[1].hasOverclock).to.equal(false)
  })
  it('test the store givePowerOutage and giveBatteryBackup functions', () => {
    store.commit('givePowerOutage', 0)
    expect(store.getters.getPlayers[0].hasPowerOutage).to.equal(true)
    store.commit('giveBatteryBackup', 0)
    expect(store.getters.getPlayers[0].hasPowerOutage).to.equal(false)
  })
  it('test the store flipTutorialStep function', () => {
    store.commit('flipTutorialStep')
    expect(store.state.tutorialStep).to.equal(false)
    store.commit('giveBatteryBackup', 0)
    expect(store.getters.getPlayers[0].hasPowerOutage).to.equal(false)
  })
  it('test the store setFirstRound function', () => {
    store.commit('setFirstRound', false)
    expect(store.state.firstRound).to.equal(false)
  })
  it('test the store setFirstRound function', () => {
    store.commit('setFirstRound', false)
    expect(store.state.firstRound).to.equal(false)
  })
  it('test the setAiTurn function', () => {
    store.commit('setAiTurn', true)
    expect(store.state.aiTurn).to.equal(true)
    store.commit('setAiTurn', false)
    expect(store.state.aiTurn).to.equal(false)
  })
  it('test the increaseFactIndex function', () => {
    expect(store.state.factIndex).to.equal(0)
    store.commit('increaseFactIndex')
    expect(store.state.factIndex).to.equal(1)
  })
  it('test the setPlayfieldColour function', () => {
    store.commit('setPlayfieldColour', false)
    // expect(store.state.trueSideColour).to.equal('background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)')
    // expect(store.state.falseSideColour).to.equal('background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)')
    store.commit('setActiveSide', true)
    store.commit('setPlayfieldColour', true)
    expect(store.state.falseSideColour).to.equal('background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen')
    expect(store.state.trueSideColour).to.equal('rgba(242, 0, 0, 0.36)')
    store.commit('setActiveSide', false)
    store.commit('setPlayfieldColour', true)
    expect(store.state.falseSideColour).to.equal('background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen')
    expect(store.state.trueSideColour).to.equal('rgba(242, 0, 0, 0.36)')
  })
  it('test the setCoinFlip function', () => {
    expect(store.state.coinFlip).to.equal(0)
    store.commit('setCoinFlip', 1)
    expect(store.state.coinFlip).to.equal(0)
  })
  it('test the playerModalTrigger function', () => {
    expect(store.state.playerTurn).to.equal(false)
    store.commit('playerModalTrigger')
    expect(store.state.playerTurn).to.equal(true)
  })
  it('test the playerModalHide function', () => {
    expect(store.state.playerTurn).to.equal(true)
    store.commit('playerModalHide')
    expect(store.state.playerTurn).to.equal(false)
  })
  it('test the checkWin function', () => {
    expect(store.state.winner).to.equal(false)
    store.state.players[1].falseScore = 100
    store.state.players[1].isDefensive = true
    store.state.players[1].hasHadOverclock = false
    store.state.players[1].hasPlayedInstruction = false
    store.state.players[1].hasOverclock = true
    store.state.players[0].hasVirus = true
    expect(store.state.winner).to.equal(false)
  })

})
