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

let move = new AiMove()
let boolSide = true

// INFO: Tests depend on this order
let defaultHand = {cards: [new Card(0, 0, 'V')]}
let hand = move.organizeHand({hand: defaultHand})
let canGroup = {
  cardToPlay: new Card('14', 3, 'G'),
  stackToPlay: new Stack(1, true)
}
let player = new Player(0, 'aiTest', hand, 0, true)
let player2 = new Player(1, 'aiTest2', hand, 0, true)
player2.score = 1
player2.cards = defaultHand.cards
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
let avSpy = sinon.spy(actionObject.avAction, 'execute')
let fwSpy = sinon.spy(actionObject.fwAction, 'execute')
let genSpy = sinon.spy(actionObject.genAction, 'execute')
let ocSpy = sinon.spy(actionObject.ocAction, 'execute')
let bbSpy = sinon.spy(actionObject.bbAction, 'execute')
let rSpy = sinon.spy(actionObject.rAction, 'execute')
let rxSpy = sinon.spy(actionObject.rxAction, 'execute')
let gSpy = sinon.spy(actionObject.gAction, 'execute')
let iSpy = sinon.spy(actionObject.iAction, 'execute')
let hSpy = sinon.spy(actionObject.hAction, 'execute')
let varSpy = sinon.spy(actionObject.varAction, 'execute')
let vSpy = sinon.spy(actionObject.vAction, 'execute')
let poSpy = sinon.spy(actionObject.poAction, 'execute')

let handler = new Handler(oPO, oV, actionObject.avAction, actionObject.fwAction, actionObject.genAction, actionObject.ocAction, actionObject.bbAction, actionObject.gAction,
  actionObject.vAction, actionObject.hAction, actionObject.poAction, actionObject.iAction, actionObject.rAction, actionObject.rxAction, actionObject.varAction, actionObject.dAction)

describe('AILogic', () => {
  it('calls execute() correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
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
    expect(rSpy.calledOnce)
    expect(handler.getMove()).to.equal('play')
    expect(handler.cardToPlay.type).to.equal('R')
    expect(handler.cardToPlay.value).to.equal(2)
  })
  it('instruction played fourth', () => {
    event.stack.push(new Stack(0, true))
    event.stack[event.stack.length - 1].score = 0
    changeHand([new Card(1, 2, 'I')])
    handler.setAi('gambler')
    expect(iSpy.calledOnce)
    expect(handler.getMove()).to.equal('play')
    expect(handler.cardToPlay.type).to.equal('I')
    expect(handler.cardToPlay.value).to.equal(2)
  })
  it('Hack played fifth', () => {
    changeHand([new Card(1, 1, 'H')])
    handler.setAi('gambler')
    expect(hSpy.calledOnce)
    expect(handler.getMove()).to.equal('hack')
    expect(handler.cardToPlay.type).to.equal('H')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('Overclock played sixth', () => {
    changeHand([new Card(10, 1, 'OVERCLOCK')])
    handler.setAi('gambler')
    expect(ocSpy.calledOnce)
    expect(handler.getMove()).to.equal('enhance')
    expect(handler.cardToPlay.type).to.equal('OVERCLOCK')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('Power Outage played seventh', () => {
    changeHand([new Card(11, 1, 'POWEROUTAGE')])
    handler.setAi('gambler')
    expect(poSpy.calledOnce)
    expect(handler.getMove()).to.equal('po')
    expect(handler.cardToPlay.type).to.equal('POWEROUTAGE')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('virus played eighth', () => {
    store.state.firstRound = false
    changeHand([new Card(12, 1, 'VIRUS')])
    handler.setAi('gambler')
    expect(vSpy.calledOnce)
    expect(handler.getMove()).to.equal('virus')
    expect(handler.cardToPlay.type).to.equal('VIRUS')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('group played ninth', () => {
    changeHand([new Card(14, 3, 'G')])
    handler.setAi('gambler')
    expect(gSpy.calledOnce)
    expect(handler.getMove()).to.equal('group')
    expect(handler.cardToPlay.type).to.equal('G')
    expect(handler.cardToPlay.value).to.equal(3)
  })
  it('Battery Backup played', () => {
    changeHand([new Card(15, 1, 'BATTERYBACKUP')])
    store.state.players[store.state.activePlayer].hasPowerOutage = true
    handler.setAi('gambler')
    expect(bbSpy.calledOnce)
    expect(handler.getMove()).to.equal('enhance')
    expect(handler.cardToPlay.type).to.equal('BATTERYBACKUP')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('Firewall played', () => {
    changeHand([new Card(16, 1, 'FIREWALL')])
    handler.setAi('gambler')
    expect(fwSpy.calledOnce)
    expect(handler.getMove()).to.equal('protection')
    expect(handler.cardToPlay.type).to.equal('FIREWALL')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('Generator played', () => {
    changeHand([new Card(15, 1, 'GENERATOR')])
    handler.setAi('gambler')
    expect(genSpy.calledOnce)
    expect(handler.getMove()).to.equal('protection')
    expect(handler.cardToPlay.type).to.equal('GENERATOR')
    expect(handler.cardToPlay.value).to.equal(1)
  })
  it('AntiVirus played', () => {
    changeHand([new Card(15, 1, 'ANTIVIRUS')])
    handler.setAi('gambler')
    expect(avSpy.calledOnce)
    expect(handler.getMove()).to.equal('protection')
    expect(handler.cardToPlay.type).to.equal('ANTIVIRUS')
    expect(handler.cardToPlay.value).to.equal(1)
    store.state.coinMsg = false
    store.state.firstRound = true
  })

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
