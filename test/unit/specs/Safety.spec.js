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
let hand = [new Card(0, 0, 'FIREWALL'), new Card(1, 0, 'GENERATOR'), new Card(2, 0, 'ANTIVIRUS'), new Card(3, 0, 'OVERCLOCK'), new Card(4, 0, 'BATTERYBACKUP')]
hand.generatorCard = true
hand.firewallCard = true
hand.antiVirusCard = true
hand.overclockCard = true
hand.batteryBackupCard = true

let event = {cards: hand, stack: [new Stack(0, true), new Stack(0, true), new Stack(1, true), new Stack(1, true)]}

let player = new Player(0, 'aiTest', hand, 0, 0, true)
let player2 = new Player(1, 'aiTest2', hand, 0, 0, true)

let oPO = player2
let oV = player2

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

let avSpy = sinon.spy(avAction, 'execute')
let fwSpy = sinon.spy(fwAction, 'execute')
let genSpy = sinon.spy(genAction, 'execute')
let ocSpy = sinon.spy(ocAction, 'execute')
let bbSpy = sinon.spy(bbAction, 'execute')
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

describe('Safety cards', () => {
  it('calls execute() correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
    expect(handler.getOpponentVirus().id).to.equal(oV.id)
    expect(handler.getOpponentPO().id).to.equal(oPO.id)
    expect(handler.getMove()).to.equal(undefined)
    expect(handler.getCard()).to.equal(undefined)
    expect(handler.getOpponent()).to.equal(undefined)
    expect(handler.getStack()).to.equal(undefined)
  })
  it('Generator played first', () => {
    handler.setAi('')
    expect(genSpy.calledOnce)
    expect(fwSpy.notCalled)
    expect(bbSpy.notCalled)
    expect(avSpy.notCalled)
    expect(ocSpy.notCalled)
    nonSafetyCards()
  })
  it('Firewall played second', () => {
    hand[1] = new Card(0, 3, 'I')
    hand.generatorCard = false
    handler.setAi('')
    expect(genSpy.calledBefore(fwSpy))
    expect(fwSpy.calledOnce)
    expect(bbSpy.notCalled)
    expect(avSpy.notCalled)
    expect(ocSpy.notCalled)
    nonSafetyCards()
  })
  it('Battery Backup played third', () => {
    hand[0] = new Card(0, 3, 'I')
    hand.firewallCard = false
    handler.setAi('')
    expect(genSpy.calledBefore(fwSpy))
    expect(fwSpy.calledBefore(bbSpy))
    expect(bbSpy.calledOnce)
    expect(avSpy.notCalled)
    nonSafetyCards()
  })
  it('Antivirus played fourth', () => {
    hand[4] = new Card(0, 3, 'I')
    hand.batteryBackupCard = false
    handler.setAi('')
    expect(genSpy.calledBefore(fwSpy))
    expect(fwSpy.calledBefore(bbSpy))
    expect(bbSpy.calledBefore(avSpy))
    expect(avSpy.calledOnce)
    expect(ocSpy.notCalled)
    expect(ocSpy.notCalled)
    nonSafetyCards()
  })
  it('Overclock played fifth', () => {
    hand[2] = new Card(0, 3, 'I')
    hand.antiVirusCard = false
    handler.setAi('')
    expect(genSpy.calledBefore(fwSpy))
    expect(fwSpy.calledBefore(bbSpy))
    expect(bbSpy.calledBefore(avSpy))
    expect(avSpy.calledBefore(ocSpy))
    expect(ocSpy.calledOnce)
    nonSafetyCards()
  })

  function nonSafetyCards () {
    expect(rSpy.notCalled)
    expect(rxSpy.notCalled)
    expect(gSpy.notCalled)
    expect(iSpy.notCalled)
    expect(hSpy.notCalled)
    expect(varSpy.notCalled)
    expect(vSpy.notCalled)
    expect(poSpy.notCalled)
    expect(dSpy.notCalled)
  }
})
