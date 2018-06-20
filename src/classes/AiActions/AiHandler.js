import AntiVirus from './AntiVirusStep'
import Firewall from './FirewallStep'
import Generator from './GeneratorStep'
import OverClock from './OverClockStep'
import BatteryBackup from './BatteryBackupStep'
import Repeat from './RepeatStep'
import RepeatX from './RepeatXStep'
import Group from './GroupStep'
import Instruction from './InstStep'
import Hack from './HackStep'
import Variable from './VarStep'
import Virus from './VirusStep'
import PowerOutage from './PowerOutageStep'
import Discard from './DiscardStep'

import AiMove from './AiMove'
import {store} from '../../store/store'

/**
 * This is the handler for the chain of responsibility pattern. It handles running through all of the steps (or chains
 * that the Ai will execute.
 */
export default class Handler {
  constructor (event) {
    this.move = new AiMove()
    this.opponentPO = this.move.getOpponentToAttack(event, 'POWEROUTAGE')
    this.opponentVirus = this.move.getOpponentToAttack(event, 'VIRUS')
    let hand = this.move.organizeHand(event)
    let boolSide = store.getters.getCoinMsg
    let canGroup = this.move.findGroup(event.stack, hand.bestGCard)
    this.antiVirus = new AntiVirus(hand, boolSide, this.move, event)
    this.firewall = new Firewall(hand, boolSide, this.move, event)
    this.generator = new Generator(hand, boolSide, this.move, event)
    this.overclock = new OverClock(hand, boolSide, this.move, event)
    this.batteryBackup = new BatteryBackup(hand, boolSide, this.move, event)
    this.group = new Group(hand, boolSide, this.move, event, canGroup)
    this.virus = new Virus(hand, boolSide, this.move, event, this.opponentVirus)
    this.hack = new Hack(hand, boolSide, this.move, event)
    this.powerOutage = new PowerOutage(hand, boolSide, this.move, event, this.opponentPO)
    this.instruction = new Instruction(hand, boolSide, this.move, event)
    this.repeat = new Repeat(hand, boolSide, this.move, event)
    this.repeatX = new RepeatX(hand, boolSide, this.move, event)
    this.variable = new Variable(hand, boolSide, this.move, event)
    this.discard = new Discard(hand, boolSide, this.move, event)
    this.stackToPlay = undefined
    this.cardToPlay = undefined
    this.opponentToAttack = undefined
    this.moveType = undefined
  }

  /**
   * This creates the order of operations for the ai steps and executes them until a step has been chosen.
   * @param type The type of Ai.
   */
  setAi (type) {
    let moveList = []
    if (type === 'gambler') {
      moveList = [this.hack, this.virus, this.powerOutage, this.firewall, this.generator, this.antiVirus, this.overclock,
        this.batteryBackup, this.variable, this.repeat, this.instruction, this.repeatX, this.group, this.discard]
    } else if (type === 'hacker') {
      moveList = [this.hack, this.virus, this.powerOutage, this.firewall, this.generator, this.antiVirus, this.overclock, this.batteryBackup, this.variable, this.repeat,
        this.instruction, this.repeatX, this.group, this.discard]
    } else if (type === 'sprinter') {
      moveList = [this.variable, this.overclock, this.repeatX, this.repeat, this.virus, this.firewall, this.generator, this.antiVirus, this.powerOutage, this.batteryBackup,
        this.instruction, this.hack, this.group, this.instruction, this.discard]
    } else if (type === 'protector') {
      moveList = [this.group, this.firewall, this.generator, this.antiVirus, this.overclock, this.virus, this.powerOutage, this.batteryBackup, this.variable,
        this.repeat, this.instruction, this.repeatX, this.hack, this.instruction, this.discard]
    }
    for (let turn in moveList) {
      if (moveList[turn].execute()) {
        this.stackToPlay = moveList[turn].getStack()
        this.cardToPlay = moveList[turn].getCard()
        this.opponentToAttack = moveList[turn].getOpponent()
        this.moveType = moveList[turn].getMove()
        break
      }
    }
  }
  getMove () {
    return this.moveType
  }
  getStack () {
    return this.stackToPlay
  }
  getCard () {
    return this.cardToPlay
  }
  getOpponent () {
    return this.opponentToAttack
  }
  getOpponentPO () {
    return this.opponentPO
  }
  getOpponentVirus () {
    return this.opponentVirus
  }
}
