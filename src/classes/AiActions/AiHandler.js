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

import AiMove from '../AiMove'
import {store} from '../../store/store'

export default class Handler {
  constructor (event) {
    this.move = new AiMove()
    let opponentPO = this.move.getOpponentToAttack(event, 'POWEROUTAGE')
    let opponentVirus = this.move.getOpponentToAttack(event, 'VIRUS')
    let hand = this.move.organizeHand(event)
    console.log(hand)
    let boolSide = store.getters.getCoinMsg
    let canGroup = this.move.findGroup(event.stack, hand.bestGCard)
    this.antiVirus = new AntiVirus(hand, boolSide, this.move, event)
    this.firewall = new Firewall(hand, boolSide, this.move, event)
    this.generator = new Generator(hand, boolSide, this.move, event)
    this.overclock = new OverClock(hand, boolSide, this.move, event)
    this.batteryBackup = new BatteryBackup(hand, boolSide, this.move, event)
    this.group = new Group(hand, boolSide, this.move, event, canGroup)
    this.virus = new Virus(hand, boolSide, this.move, event, opponentVirus)
    this.hack = new Hack(hand, boolSide, this.move, event)
    this.powerOutage = new PowerOutage(hand, boolSide, this.move, event, opponentPO)
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

// Handler.prototype.setVariables = () => {
//   this.stackToPlay = this.turn.getStack()
//   this.cardToPlay = this.turn.getCard()
//   this.opponentToAttack = this.turn.getOpponent()
//   this.moveType = this.turn.getMove()
// }

  gambler () {
    // this.instruction.execute()
    let gamblerList = [this.hack, this.virus, this.powerOutage, this.firewall, this.generator, this.antiVirus, this.overclock,
      this.batteryBackup, this.variable, this.repeat, this.instruction, this.repeatX, this.group, this.discard]
    for (let turn in gamblerList) {
      if (gamblerList[turn].execute()) {
        this.stackToPlay = gamblerList[turn].getStack()
        this.cardToPlay = gamblerList[turn].getCard()
        this.opponentToAttack = gamblerList[turn].getOpponent()
        this.moveType = gamblerList[turn].getMove()
        break
      }
    }
  }
  // hacker: () => {
  //   let turn = this.turn
  //   turn.stepDiscard()
  //   turn.stepGroup()
  //   turn.stepRepeatX()
  //   turn.stepInstruction()
  //   turn.stepRepeat()
  //   turn.stepVar()
  //   turn.stepBatteryBackup()
  //   turn.stepOverclock()
  //   turn.stepAntiVirus()
  //   turn.stepGenerator()
  //   turn.stepFirewall()
  //   turn.stepPowerOutage()
  //   turn.stepVirus()
  //   turn.stepHack()
  //   this.stackToPlay = this.turn.getStack()
  //   this.cardToPlay = this.turn.getCard()
  //   this.opponentToAttack = this.turn.getOpponent()
  //   this.moveType = this.turn.getMove()
  // },
  // sprinter: () => {
  //   let turn = this.turn
  //   turn.stepDiscard()
  //   turn.stepInstruction()
  //   turn.stepGroup()
  //   turn.stepHack()
  //   turn.stepInstruction()
  //   turn.stepBatteryBackup()
  //   turn.stepPowerOutage()
  //   turn.stepAntiVirus()
  //   turn.stepGenerator()
  //   turn.stepFirewall()
  //   turn.stepVirus()
  //   turn.stepRepeat()
  //   turn.stepRepeatX()
  //   turn.stepOverclock()
  //   turn.stepVar()
  //   this.stackToPlay = this.turn.getStack()
  //   this.cardToPlay = this.turn.getCard()
  //   this.opponentToAttack = this.turn.getOpponent()
  //   this.moveType = this.turn.getMove()
  // },
  // protector: () => {
  //   let turn = this.turn
  //   turn.stepDiscard()
  //   turn.stepInstruction()
  //   turn.stepHack()
  //   turn.stepRepeatX()
  //   turn.stepInstruction()
  //   turn.stepRepeat()
  //   turn.stepVar()
  //   turn.stepBatteryBackup()
  //   turn.stepPowerOutage()
  //   turn.stepVirus()
  //   turn.stepOverclock()
  //   turn.stepAntiVirus()
  //   turn.stepGenerator()
  //   turn.stepFirewall()
  //   turn.stepGroup()
  //   this.stackToPlay = this.turn.getStack()
  //   this.cardToPlay = this.turn.getCard()
  //   this.opponentToAttack = this.turn.getOpponent()
  //   this.moveType = this.turn.getMove()
  // },
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
  getHand () {
    return this.hand
  }

}
