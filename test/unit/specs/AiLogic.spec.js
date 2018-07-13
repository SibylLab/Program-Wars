/* eslint-disable no-trailing-spaces */
var sinon = require('sinon')
import {store} from '../../../src/store/store'
import Card from '../../../src/classes/Models/Card'
import Player from '../../../src/classes/Models/Player'
import Stack from '../../../src/classes/Models/Stack'
import Handler from '../../../src/classes/AiActions/AiHandler'
import AiMove from '../../../src/classes/AiActions/AiMove'
import AntiVirus from '../../../src/classes/AiActions/AntiVirusStep'
import Firewall from '../../../src/classes/AiActions/FirewallStep'
import Generator from '../../../src/classes/AiActions/GeneratorStep'
import OverClock from '../../../src/classes/AiActions/OverClockStep'
import BatteryBackup from '../../../src/classes/AiActions/BatteryBackupStep'
import Repeat from '../../../src/classes/AiActions/RepeatStep'
import RepeatX from '../../../src/classes/AiActions/RepeatXStep'
import Group from '../../../src/classes/AiActions/GroupStep'
import Instruction from '../../../src/classes/AiActions/InstStep'
import Hack from '../../../src/classes/AiActions/HackStep'
import Variable from '../../../src/classes/AiActions/VarStep'
import Virus from '../../../src/classes/AiActions/VirusStep'
import PowerOutage from '../../../src/classes/AiActions/PowerOutageStep'
import Discard from '../../../src/classes/AiActions/DiscardStep'

let canGroup = false
let move = new AiMove()
let boolSide = true

// INFO: Tests depend on this order
let defaultHand = {cards: [new Card(0, 0, 'V')]}
let hand = move.organizeHand({hand: defaultHand})

let player = new Player(0, 'aiTest', hand, 0, 0, true)
let player2 = new Player(1, 'aiTest2', hand, 0, 0, true)

let event = {cards: hand, hand: defaultHand, stack: [new Stack(0, true), new Stack(0, true), new Stack(1, true), new Stack(1, true)], opponents: [player2]}
event.stack[0].cards = [new Card(9, 3, 'I'), new Card(8, 1, 'R')]
event.stack[0].score = 3
event.stack[1].cards = [new Card(9, 3, 'I')]
event.stack[1].score = 3
event.stack[2].cards = [new Card(9, 3, 'I')]
event.stack[2].score = 3
event.stack[3].cards = [new Card(9, 3, 'I')]
event.stack[3].score = 3
let oPO = player2
let oV = player2

let actionObject = {
  avAction: new AntiVirus(hand, boolSide, move, event),
  fwAction: new Firewall(hand, boolSide, move, event),
  genAction: new Generator(hand, boolSide, move, event),
  ocAction: new OverClock(hand, boolSide, move, event),
  bbAction: new BatteryBackup(hand, boolSide, move, event),
  rAction: new Repeat(hand, boolSide, move, event),
  rxAction: new RepeatX(hand, boolSide, move, event),
  gAction: new Group(hand, boolSide, move, event, canGroup),
  iAction: new Instruction(hand, boolSide, move, event),
  hAction: new Hack(hand, boolSide, move, event),
  varAction: new Variable(hand, boolSide, move, event),
  vAction: new Virus(hand, boolSide, move, event, oV),
  poAction: new PowerOutage(hand, boolSide, move, event, oPO),
  dAction: new Discard(hand, boolSide, move, event)
}
// let avSpy = sinon.spy(avAction, 'execute')
// let fwSpy = sinon.spy(fwAction, 'execute')
// let genSpy = sinon.spy(genAction, 'execute')
// let ocSpy = sinon.spy(ocAction, 'execute')
// let bbSpy = sinon.spy(bbAction, 'execute')
// let rSpy = sinon.spy(actionObject.rAction, 'execute')
let rxSpy = sinon.spy(actionObject.rxAction, 'execute')
// let gSpy = sinon.spy(actionObject.gAction, 'execute')
// let iSpy = sinon.spy(actionObject.iAction, 'execute')
// let hSpy = sinon.spy(actionObject.hAction, 'execute')
let varSpy = sinon.spy(actionObject.varAction, 'execute')
// let vSpy = sinon.spy(actionObject.vAction, 'execute')
// let poSpy = sinon.spy(actionObject.poAction, 'execute')
// let dSpy = sinon.spy(actionObject.dAction, 'execute')

let handler = new Handler(oPO, oV, actionObject.avAction, actionObject.fwAction, actionObject.genAction, actionObject.ocAction, actionObject.bbAction, actionObject.gAction,
  actionObject.vAction, actionObject.hAction, actionObject.poAction, actionObject.iAction, actionObject.rAction, actionObject.rxAction, actionObject.varAction, actionObject.dAction)

describe('Gambler', () => {
  it('calls execute() correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
    store.state.players[0].hasPowerOutage = true
    store.state.coinMsg = true
    expect(handler.getOpponentVirus().id).to.equal(oV.id)
    expect(handler.getOpponentPO().id).to.equal(oPO.id)
    expect(handler.getMove()).to.equal(undefined)
    expect(handler.getCard()).to.equal(undefined)
    expect(handler.getOpponent()).to.equal(undefined)
    expect(handler.getStack()).to.equal(undefined)
  })

  it('Variable logic', () => {
    handler.setAi('gambler')
    expect(varSpy.calledOnce)
    expect(handler.getMove()).to.equal('play')
    expect(handler.cardToPlay.type).to.equal('V')
  })
  it('RepeatX played', () => {
    changeHand([new Card(1, 1, 'R')])
    handler.setAi('gambler')
    expect(rxSpy.calledOnce)
    expect(handler.getMove()).to.equal('play')
    expect(handler.cardToPlay.type).to.equal('R')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('Repeat played third', () => {
    changeHand([new Card(1, 2, 'R')])
    handler.setAi('gambler')
    expect(rxSpy.calledOnce)
    expect(handler.getMove()).to.equal('play')
    expect(handler.cardToPlay.type).to.equal('R')
    expect(handler.cardToPlay.value).to.equal(2)
    store.state.coinMsg = false
  })
  // it('instruction played fourth', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledBefore(iSpy))
  //   expect(iSpy.calledOnce)
  //   expect(hSpy.notCalled)
  //   expect(poSpy.notCalled)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
  // it('Overclock played fifth', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledBefore(iSpy))
  //   expect(iSpy.calledBefore(hSpy))
  //   expect(hSpy.calledOnce)
  //   expect(poSpy.notCalled)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
  //
  // it('Power Outage played sixth', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledBefore(iSpy))
  //   expect(iSpy.calledBefore(hSpy))
  //   expect(hSpy.calledBefore(poSpy))
  //   expect(poSpy.calledOnce)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
  // it('virus played seventh', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledBefore(iSpy))
  //   expect(iSpy.calledBefore(hSpy))
  //   expect(hSpy.calledBefore(poSpy))
  //   expect(poSpy.calledBefore(vSpy))
  //   expect(vSpy.calledOnce)
  //   expect(gSpy.notCalled)
  // })
  // it('group played eighth', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledBefore(iSpy))
  //   expect(iSpy.calledBefore(hSpy))
  //   expect(hSpy.calledBefore(poSpy))
  //   expect(poSpy.calledBefore(vSpy))
  //   expect(vSpy.calledBefore(gSpy))
  //   expect(gSpy.calledOnce)
  // })

  function changeHand (h) {
    defaultHand = {cards: h}
    hand = move.organizeHand({hand: defaultHand})
    event.hand = defaultHand
    event.cards = hand
    for (let action in actionObject) {
      actionObject[action].setHand(hand)
      actionObject[action].setEvent(event)
    }
  }
})
