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
let defaultHand = {cards: [new Card(0, 0, 'V'), new Card(1, 0, 'R'), new Card(2, 0, 'R'), new Card(3, 0, 'I'), new Card(4, 0, 'H'), new Card(5, 0, 'VIRUS'), new Card(6, 0, 'POWEROUTAGE'), new Card(7, 0, 'G')]}
let hand = move.organizeHand({hand: defaultHand})

let player = new Player(0, 'aiTest', hand, 0, 0, true)
let player2 = new Player(1, 'aiTest2', hand, 0, 0, true)

let event = {cards: hand, stack: [new Stack(0, true), new Stack(0, true), new Stack(1, true), new Stack(1, true)], opponents: [player2]}

let oPO
let oV

let avAction = new AntiVirus(hand, boolSide, move, event)
let fwAction = new Firewall(hand, boolSide, move, event)
let genAction = new Generator(hand, boolSide, move, event)
let ocAction = new OverClock(hand, boolSide, move, event)
let bbAction = new BatteryBackup(hand, boolSide, move, event)
let rAction = new Repeat(hand, boolSide, move, event)
let rxAction = new RepeatX(hand, boolSide, move, event)
let gAction = new Group(hand, boolSide, move, event, canGroup)
let iAction = new Instruction(hand, boolSide, move, event)
let hAction = new Hack(hand, boolSide, move, event)
let varAction = new Variable(hand, boolSide, move, event)
let vAction = new Virus(hand, boolSide, move, event, oV)
let poAction = new PowerOutage(hand, boolSide, move, event, oPO)
let dAction = new Discard(hand, boolSide, move, event)

// let avSpy = sinon.spy(avAction, 'execute')
// let fwSpy = sinon.spy(fwAction, 'execute')
// let genSpy = sinon.spy(genAction, 'execute')
// let ocSpy = sinon.spy(ocAction, 'execute')
// let bbSpy = sinon.spy(bbAction, 'execute')
let rSpy = sinon.spy(rAction, 'execute')
let rxSpy = sinon.spy(rxAction, 'execute')
let gSpy = sinon.spy(gAction, 'execute')
let iSpy = sinon.spy(iAction, 'execute')
let hSpy = sinon.spy(hAction, 'execute')
let varSpy = sinon.spy(varAction, 'execute')
let vSpy = sinon.spy(vAction, 'execute')
let poSpy = sinon.spy(poAction, 'execute')
let dSpy = sinon.spy(dAction, 'execute')

let handler = new Handler(oPO, oV, avAction, fwAction, genAction, ocAction, bbAction, gAction, vAction, hAction, poAction, iAction, rAction, rxAction, varAction, dAction)

describe('Gambler', () => {
  it('calls execute() correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
    store.state.players[0].hasPowerOutage = true
    // expect(handler.getOpponentVirus().id).to.equal(oV.id)
    // expect(handler.getOpponentPO().id).to.equal(oPO.id)
    expect(handler.getMove()).to.equal(undefined)
    expect(handler.getCard()).to.equal(undefined)
    expect(handler.getOpponent()).to.equal(undefined)
    expect(handler.getStack()).to.equal(undefined)
  })

  // it('Variable played first', () => {
  //   handler.setAi('gambler')
  //   expect(varSpy.calledOnce)
  //   expect(rxSpy.notCalled)
  //   expect(rSpy.notCalled)
  //   expect(iSpy.notCalled)
  //   expect(hSpy.notCalled)
  //   expect(poSpy.notCalled)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
  // it('RepeatX played second', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledOnce)
  //   expect(rSpy.notCalled)
  //   expect(iSpy.notCalled)
  //   expect(hSpy.notCalled)
  //   expect(poSpy.notCalled)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
  // it('Repeat played third', () => {
  //   changeHand()
  //   handler.setAi('gambler')
  //   expect(varSpy.calledBefore(rxSpy))
  //   expect(rxSpy.calledBefore(rSpy))
  //   expect(rSpy.calledOnce)
  //   expect(iSpy.notCalled)
  //   expect(hSpy.notCalled)
  //   expect(poSpy.notCalled)
  //   expect(vSpy.notCalled)
  //   expect(gSpy.notCalled)
  // })
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

  it('The ordering of cards is correct', () => {
    changeHand()
    handler.setAi('gambler')
    expect(varSpy.calledBefore(rxSpy))
    expect(rxSpy.calledBefore(rSpy))
    expect(rSpy.calledBefore(iSpy))
    expect(iSpy.calledBefore(hSpy))
    expect(hSpy.calledBefore(vSpy))
    expect(vSpy.calledBefore(poSpy))
    expect(poSpy.calledBefore(gSpy))
    expect(gSpy.calledBefore(dSpy))
    expect(dSpy.calledOnce)
  })

  function changeHand () {
    defaultHand.cards.shift()
    hand = move.organizeHand({hand: defaultHand})
  }
})
