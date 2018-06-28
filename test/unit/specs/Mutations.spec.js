import {store} from '../../../src/store/store'
import Card from '../../../src/classes/Models/Card'

let card = new Card(55, 3, 'I', 'f')
let card2 = new Card(34, 2, 'R', 'v')
describe('test store.js getters', () => {
  it('test the store resetState function', () => {
    store.commit('resetState')
    expect(store.getters.getWinner).to.equal(false)
  })
  it('test the store addPlayers function', () => {
    let pay = {list: [{name: 'joe', isAi: false}, {name: 'lucy', isAi: true}]}
    store.commit('addPlayers', pay)
    expect(store.getters.getPlayers[0].name).to.equal('joe')
    store.state.activePlayer = 0
    expect(store.getters.currentPlayerName).to.equal('joe')
  })
  it('test the initTutorialDeck function', () => {
    store.commit('initTutorialDeck')
    expect(store.state.tutorialDeck.cards.length).to.equal(66)
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
    store.getters.getPlayers[0].attackedCards = [new Card(22, 0, 'FIREWALL', 't')]
    store.commit('giveGenerator', 0)
    expect(store.getters.getPlayers[0].hasGenerator).to.equal(true)
  })
  it('test the store giveAntiVirus function', () => {
    store.commit('giveAntiVirus', 0)
    store.commit('giveFirewall', 0)
    store.commit('giveGenerator', 0)
    expect(store.getters.getPlayers[0].hasAntiVirus).to.equal(true)
    store.getters.getPlayers[0].hasFirewall = false
    store.getters.getPlayers[0].hasAntiVirus = false
    store.getters.getPlayers[0].attackedCards = [new Card(22, 0, 'VIRUS', 't')]
    store.commit('giveAntiVirus', 0)
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
    store.state.activeSide = true
    store.commit('setPlayfieldColour', true)
    expect(store.state.trueSideColour).to.equal('background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen')
    expect(store.state.falseSideColour).to.equal('rgba(242, 0, 0, 0.36)')
    store.commit('setActiveSide', false)
    store.commit('setPlayfieldColour', true)
    expect(store.state.falseSideColour).to.equal('background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen')
    expect(store.state.trueSideColour).to.equal('rgba(242, 0, 0, 0.36)')
  })
  it('test the setCoinFlipAnim function', () => {
    expect(store.state.coinFlip).to.equal(0)
    store.commit('setCoinFlipAnim', 1)
    expect(store.state.coinFlip).to.equal(1)
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
    store.commit('checkWin')
    expect(store.state.winner).to.equal(true)
    store.state.players[1].hasOverclock = false
    store.state.players[1].hasPlayedInstruction = true
    store.state.players[1].isDefensive = false
    store.state.players[1].falseScore = 0
    store.state.players[1].trueScore = 0
  })
  it('test the setTips function', () => {
    store.commit('setTips', {tutorial: 'isTutorial', fact: 'isFact'})
    expect(store.state.playerTurn).to.equal(false)
  })
  it('test the setTrueFalseAnim function', () => {
    store.commit('setTrueFalseAnim', {startAnim: true})
    expect(store.state.playerTurn).to.equal(false)
  })
  it('test the setScoreLimit function', () => {
    store.commit('setScoreLimit', {scoreLimit: 10})
    expect(store.state.playerTurn).to.equal(false)
  })
  it('test the setStackSelectedBoolean function', () => {
    store.commit('setStackSelectedBoolean', {boolean: false})
    expect(store.state.selectedStackBoolean).to.equal(false)
  })
  it('test the removeAllSelectedStacks function', () => {
    store.commit('removeAllSelectedStacks')
    expect(Array.isArray(store.state.selectedStacks)).to.equal(true)
  })
  it('test the discardSelectedCard function', () => {
    store.state.activeCard = card
    store.commit('discardSelectedCard')
    store.state.isTutorial = true
    store.commit('discardSelectedCard')
    expect(store.state.deck.discard_cards[0].id).to.equal(55)
    expect(store.state.tutorialDeck.discard_cards[0].id).to.equal(55)
  })
  it('test the removeActiveCardFromHand function', () => {
    store.state.activePlayer = 0
    store.state.hands.push({cards: [card], playerId: 0})
    store.state.activeCard = card
    store.commit('removeActiveCardFromHand')
    expect(store.state.activeCard).to.equal(undefined)
  })
  it('test the setActiveCardUndefined function', () => {
    store.state.activeCard = card
    store.commit('setActiveCardUndefined')
    expect(store.state.activeCard).to.equal(undefined)
  })
  it('test the setActiveCard function', () => {
    store.commit('setActiveCard')
    expect(store.state.activeCard).to.equal(undefined)
    store.commit('setActiveCard', {cardId: 55})
    expect(store.state.activeCard).to.equal(55)
  })
  it('test the addCardToHand function', () => {
    store.state.hands = []
    store.state.hands.push({cards: [], playerId: 0})
    store.state.isTutorial = false
    store.commit('addCardToHand')
    expect(store.state.hands[0].cards.length).to.equal(6)
    store.commit('initDeck')
    store.commit('addCardToHand')
    expect(store.state.hands[0].cards.length).to.equal(6)
    store.state.hands.push({cards: [], playerId: 1})
    store.state.isTutorial = true
    store.commit('addCardToHand')
    expect(store.state.hands[1].cards.length).to.equal(0)
    store.state.tutorialDeck = []
    store.state.activePlayer = 1
    store.commit('addCardToHand')
    expect(store.state.hands[1].cards.length).to.equal(6)
  })
  it('test the addHandToPlayer function', () => {
    store.state.hands = []
    store.state.isTutorial = false
    store.commit('addHandToPlayer', 0)
    expect(store.state.players[0].hand.length).to.equal(36)
    store.state.isTutorial = true
    store.commit('addHandToPlayer', 1)
    expect(store.state.players[1].hand.length).to.equal(36)
  })
  it('test the selectCard function', () => {
    store.state.activePlayer = 0
    store.state.isTutorial = false
    store.state.hands[0].cards = [card]
    store.state.hands[0].cards[0].selected = true
    store.state.hands[0].cards.push(card2)
    store.commit('selectCard', card2)
    expect(store.state.activeCard.id).to.equal(card2.id)
    store.commit('selectCard', card)
  })
  it('test the groupStacks function', () => {
    store.commit('groupStacks', {yesOrNo: true})
    expect(store.state.groupStacks).to.equal(true)
  })
  it('test the doGroupStacks function', () => {
    store.commit('doGroupStacks', {yesOrNo: false})
    expect(store.state.groupStacks).to.equal(false)
  })
  it('test the setTutorial function', () => {
    store.commit('setTutorial', {gameType: true})
    expect(store.state.isTutorial).to.equal(true)
  })
  it('test the initDeck function', () => {
    store.commit('initDeck')
    expect(store.state.deck.cards.length).to.equal(147)
  })
  it('test the setHasPlayed function', () => {
    store.commit('setHasPlayed', {hasPlayed: true})
    expect(store.state.activeHasPlayed).to.equal(true)
  })
  it('test the setGameState function', () => {
    store.commit('setGameState', {gameState: 'test'})
    expect(store.state.currentGameState).to.equal('test')
  })
  it('test the addStackToPlayer function', () => {
    store.commit('addStackToPlayer', {playerId: 0, boolSide: true})
    store.commit('addStackToPlayer', {playerId: 0, boolSide: false})
    store.commit('addStackToPlayer', {playerId: 1, boolSide: true})
    store.commit('addStackToPlayer', {playerId: 1, boolSide: false})
    expect(store.state.stacks.length).to.equal(4)
    store.state.activePlayer = 0
    expect(store.getters.getCurrentPlayerStacks.length).to.equal(2)
  })
  it('test the setPlayerScores function', () => {
    store.commit('setPlayerScores')
    expect(store.state.players[0].trueScore).to.equal(0)
  })
  it('test the addCardToStack function', () => {
    store.commit('addCardToStack', {stackId: store.state.stacks[0].stackId, card: card})
    expect(store.state.stacks[0].cards.length).to.equal(1)
  })
  it('test the popCardFromStack function', () => {
    store.commit('popCardFromStack', {stackId: store.state.stacks[0].stackId, card: card})
    expect(store.state.stacks[0].cards.length).to.equal(0)
  })
  it('test the removeStack function', () => {
    store.commit('removeStack', {stackId: store.state.stacks[3].stackId})
    expect(store.state.stacks.length).to.equal(3)
  })
  it('test the addStackToSelected function', () => {
    store.commit('addStackToSelected', {stackId: store.state.stacks[2].stackId})
    expect(store.getters.getSelectedStacks[0].stackId).to.equal(store.state.stacks[2].stackId)
    store.commit('addStackToSelected', {stackId: store.state.stacks[2].stackId})
    expect(Array.isArray(store.state.selectedStacks)).to.equal(true)
  })
  it('test the stackDiscard function', () => {
    store.state.isTutorial = false
    store.commit('stackDiscard', {stackId: store.state.stacks[0].stackId})
    expect(store.state.deck.discard_cards.length).to.equal(1)
    store.state.isTutorial = true
    store.commit('stackDiscard', {stackId: store.state.stacks[0].stackId})
    expect(store.state.tutorialDeck.discard_cards.length).to.equal(2)
  })
  it('test the getIsLast function', () => {
    store.state.activePlayer = 1
    store.commit('getIsLast')
    expect(store.state.isLast).to.equal(true)
    store.state.activePlayer = 0
    store.commit('getIsLast')
    expect(store.state.isLast).to.equal(false)
  })
  it('test the setActiveStack function', () => {
    store.commit('setActiveStack', store.state.stacks[0])
    expect(store.state.activeStack.stackId).to.equal(store.state.stacks[0].stackId)
  })
})
