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
let defaultHand = {cards: [new Card(0, 0, 'V'), new Card(1, 0, 'R'), new Card(2, 0, 'R'), new Card(3, 0, 'I'), new Card(4, 0, 'H'), new Card(5, 0, 'VIRUS')]}
let hand = move.organizeHand({hand: defaultHand})

let player = new Player(0, 'aiTest', hand, 0, true)
let player2 = new Player(1, 'aiTest2', hand, 0, true)

let event = {cards: hand, hand: defaultHand, stack: [new Stack(0, true), new Stack(0, true), new Stack(1, true), new Stack(1, true)], opponents: [player2]}

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
let rSpy = sinon.spy(actionObject.rAction, 'execute')
let rxSpy = sinon.spy(actionObject.rxAction, 'execute')
let gSpy = sinon.spy(actionObject.gAction, 'execute')
let iSpy = sinon.spy(actionObject.iAction, 'execute')
let hSpy = sinon.spy(actionObject.hAction, 'execute')
let varSpy = sinon.spy(actionObject.varAction, 'execute')
let vSpy = sinon.spy(actionObject.vAction, 'execute')
let poSpy = sinon.spy(actionObject.poAction, 'execute')
let dSpy = sinon.spy(actionObject.dAction, 'execute')

let handler = new Handler(oPO, oV, actionObject.avAction, actionObject.fwAction, actionObject.genAction, actionObject.ocAction, actionObject.bbAction, actionObject.gAction,
  actionObject.vAction, actionObject.hAction, actionObject.poAction, actionObject.iAction, actionObject.rAction, actionObject.rxAction, actionObject.varAction, actionObject.dAction)

describe('Protector', () => {
  it('calls execute() correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
    store.state.players[0].hasPowerOutage = true
    expect(handler.getOpponentVirus().id).to.equal(oV.id)
    expect(handler.getOpponentPO().id).to.equal(oPO.id)
    expect(handler.getMove()).to.equal(undefined)
    expect(handler.getCard()).to.equal(undefined)
    expect(handler.getOpponent()).to.equal(undefined)
    expect(handler.getStack()).to.equal(undefined)
  })

  it('The ordering of cards is correct', () => {
    handler.setAi('protector')
    expect(gSpy.calledBefore(vSpy))
    expect(vSpy.calledBefore(poSpy))
    expect(poSpy.calledBefore(varSpy))
    expect(varSpy.calledBefore(rSpy))
    expect(rSpy.calledBefore(iSpy))
    expect(iSpy.calledBefore(rxSpy))
    expect(rxSpy.calledBefore(hSpy))
    expect(hSpy.calledBefore(dSpy))
    expect(dSpy.calledOnce)
    expect(handler.getCard().type).to.equal('VIRUS')
  })
})
