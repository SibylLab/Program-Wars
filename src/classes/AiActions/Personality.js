import Handler from './AiHandler'
import Discard from './DiscardStep'
import Group from './GroupStep'
import RepeatX from './RepeatXStep'
import OverClock from './OverClockStep'
import Firewall from './FirewallStep'
import Variable from './VarStep'
import Generator from './GeneratorStep'
import Hack from './HackStep'
import AntiVirus from './AntiVirusStep'
import PowerOutage from './PowerOutageStep'
import Repeat from './RepeatStep'
import Virus from './VirusStep'
import BatteryBackup from './BatteryBackupStep'
import Instruction from './InstStep'
import {store} from '../../store/store'
import AiMove from './AiMove'

/**
 * This class picks at random one of the Ai personalities to use.
 */
export default class Personality {

  constructor () {
    this.num = Math.floor((Math.random() * 4) + 1)
  }

  turnLogic (event) {
    let move = new AiMove()
    let opponentPO = move.getOpponentToAttack(event, 'POWEROUTAGE')
    let opponentVirus = move.getOpponentToAttack(event, 'VIRUS')
    let hand = move.organizeHand(event)
    let boolSide = store.getters.getCoinMsg
    let canGroup = move.findGroup(event.stack, hand.bestGCard)
    let antiVirus = new AntiVirus(hand, boolSide, move, event)
    let firewall = new Firewall(hand, boolSide, move, event)
    let generator = new Generator(hand, boolSide, move, event)
    let overclock = new OverClock(hand, boolSide, move, event)
    let batteryBackup = new BatteryBackup(hand, boolSide, move, event)
    let group = new Group(hand, boolSide, move, event, canGroup)
    let virus = new Virus(hand, boolSide, move, event, opponentVirus)
    let hack = new Hack(hand, boolSide, move, event)
    let powerOutage = new PowerOutage(hand, boolSide, move, event, opponentPO)
    let instruction = new Instruction(hand, boolSide, move, event)
    let repeat = new Repeat(hand, boolSide, move, event)
    let repeatX = new RepeatX(hand, boolSide, move, event)
    let variable = new Variable(hand, boolSide, move, event)
    let discard = new Discard(hand, boolSide, move, event)
    let personality = new Handler(opponentPO, opponentVirus, antiVirus, firewall, generator, overclock, batteryBackup,
      group, virus, hack, powerOutage, instruction, repeat, repeatX, variable, discard)
    switch (this.num) {
      case 1: personality.setAi('sprinter'); break
      case 2: personality.setAi('hacker'); break
      case 3: personality.setAi('gambler'); break
      case 4: personality.setAi('protector'); break
    }
    return personality
  }
}
