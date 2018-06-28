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
let player2 = new Player(1, 'aiMock', hand, 0, 0, true)

let oPO = player2
let oV = player2
let aVMock = sinon.mock(AntiVirus(hand, boolSide, move, event))
let fWMock = sinon.mock(Firewall(hand, boolSide, move, event))
let genMock = sinon.mock(Generator(hand, boolSide, move, event))
let oCMock = sinon.mock(OverClock(hand, boolSide, move, event))
let bBMock = sinon.mock(BatteryBackup(hand, boolSide, move, event))
let rMock = sinon.mock(Repeat(hand, boolSide, move, event))
let rXMock = sinon.mock(RepeatX(hand, boolSide, move, event))
let groupMock = sinon.mock(Group(hand, boolSide, move, event, canGroup))
let instMock = sinon.mock(Instruction(hand, boolSide, move, event))
let hackMock = sinon.mock(Hack(hand, boolSide, move, event))
let variableMock = sinon.mock(Variable(hand, boolSide, move, event))
let virusMock = sinon.mock(Virus(hand, boolSide, move, event))
let pOMock = sinon.mock(PowerOutage(hand, boolSide, move, event))
let discMock = sinon.mock(Discard(hand, boolSide, move, event))
let handlerMock = sinon.mock(Handler(oPO, oV, aVMock, fWMock, genMock, oCMock, bBMock, groupMock, virusMock, hackMock, pOMock, instMock, rMock, rXMock, variableMock, discMock))
describe('Gambler Ai Mock', () => {
  it('calls the object execute correctly', () => {
    store.state.coinMsg = true
    store.state.activePlayer = player
    store.state.players = [player, player2]
    handlerMock.expects('setAi').once.withArgs('gambler')
    handlerMock.verify()
  })
  // it('calls the object execute correctly', () => {
    // mock.expects('setAi').once.withArgs('gambler')
    // mock.verify()
  // })
})
