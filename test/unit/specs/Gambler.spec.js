// var chai = require('chai');
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
let hand = [new Card(0, 0, 'FIREWALL'), new Card(1, 0, 'GENERATOR'), new Card(2, 0, 'ANTIVIRUS'), new Card(3, 0, 'VIRUS'), new Card(4, 0, 'POWEROUTAGE'), new Card(0, 3, 'I')]
let event = {cards: hand, stack: [new Stack(0, true), new Stack(0, true), new Stack(1, true), new Stack(1, true)]}

let player = new Player(0, 'aiMock', hand, 0, 0, true)
let player2 = new Player(1, 'aiMock2', hand, 0, 0, true)

let oPO = player2
let oV = player2
let aVMock = new AntiVirus(hand, boolSide, move, event)
// let aVSpy = sinon.spy(aVMock, 'execute')
let fWMock = new Firewall(hand, boolSide, move, event)
// let fWSpy = sinon.spy(Mock, 'execute')
let genMock = new Generator(hand, boolSide, move, event)
// let genSpy = sinon.spy(Mock, 'execute')
let oCMock = new OverClock(hand, boolSide, move, event)
// let oCSpy = sinon.spy(aVMock, 'execute')
let bBMock = new BatteryBackup(hand, boolSide, move, event)
// let bBSpy = sinon.spy(aVMock, 'execute')
let rMock = new Repeat(hand, boolSide, move, event)
// let rSpy = sinon.spy(aVMock, 'execute')
let rXMock = new RepeatX(hand, boolSide, move, event)
// let rXSpy = sinon.spy(aVMock, 'execute')
let groupMock = new Group(hand, boolSide, move, event, canGroup)
// let groupSpy = sinon.spy(aVMock, 'execute')
let instMock = new Instruction(hand, boolSide, move, event)
// let instSpy = sinon.spy(aVMock, 'execute')
let hackMock = new Hack(hand, boolSide, move, event)
// let hackSpy = sinon.spy(aVMock, 'execute')
let variableMock = new Variable(hand, boolSide, move, event)
// let variableSpy = sinon.spy(aVMock, 'execute')
let virusMock = new Virus(hand, boolSide, move, event, oV)
// let virusSpy = sinon.spy(aVMock, 'execute')
let pOMock = new PowerOutage(hand, boolSide, move, event, oPO)
// let pOSpy = sinon.spy(aVMock, 'execute')
let discMock = new Discard(hand, boolSide, move, event)
// let discSpy = sinon.spy(aVMock, 'execute')
let handler = new Handler(oPO, oV, aVMock, fWMock, genMock, oCMock, bBMock, groupMock, virusMock, hackMock, pOMock, instMock, rMock, rXMock, variableMock, discMock)
let handlerMock = sinon.mock(handler)
describe('Gambler Ai Mock', () => {
  it('calls the object execute correctly', () => {
    store.state.activePlayer = 0
    store.state.players = [player, player2]
    expect(handler.getOpponentVirus().id).to.equal(oV.id)
    expect(handler.getOpponentPO().id).to.equal(oPO.id)
    expect(handler.getMove()).to.equal(undefined)
    expect(handler.getCard()).to.equal(undefined)
    expect(handler.getOpponent()).to.equal(undefined)
    expect(handler.getStack()).to.equal(undefined)
  })
  it('calls the objects are executed correctly', () => {
    handlerMock.expects('setAi').once().withArgs('gambler')
    // expect(aVSpy).to.have.been.calledWith()
    handler.setAi('gambler')
    handlerMock.verify()
  })
})
