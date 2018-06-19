import {Turn} from './AiChain'
import AiMove from './AiMove'
import {store} from '../store/store'

var Handler = (event) => {
  this.move = new AiMove()
  console.log(this.move)
  this.opponentPO = this.move.getOpponentToAttack(event, 'POWEROUTAGE')
  this.opponentVirus = this.move.getOpponentToAttack(event, 'VIRUS')
  let hand = this.move.organizeHand(event)
  let boolSide = store.getters.getCoinMsg
  let canGroup = this.move.findGroup(event.stack, hand.bestGCard)
  this.turn = new Turn(this.opponentPO, this.opponentVirus, hand, boolSide, canGroup, this.move, event)
  this.stackToPlay = undefined
  this.cardToPlay = undefined
  this.opponentToAttack = undefined
  this.moveType = undefined
}

Handler.prototype.setVariables = () => {
  this.stackToPlay = this.turn.getStack()
  this.cardToPlay = this.turn.getCard()
  this.opponentToAttack = this.turn.getOpponent()
  this.moveType = this.turn.getMove()
}

Handler.prototype = {
  gambler: () => {
    let turn = this.turn
    turn.stepDiscard()
    turn.stepInstruction()
    turn.stepGroup()
    turn.stepHack()
    turn.stepRepeatX()
    turn.stepRepeat()
    turn.stepBatteryBackup()
    turn.stepPowerOutage()
    turn.stepOverclock()
    turn.stepAntiVirus()
    turn.stepGenerator()
    turn.stepFirewall()
    turn.stepVirus()
    turn.stepVar()
    this.stackToPlay = this.turn.getStack()
    this.cardToPlay = this.turn.getCard()
    this.opponentToAttack = this.turn.getOpponent()
    this.moveType = this.turn.getMove()
  },
  hacker: () => {
    let turn = this.turn
    turn.stepDiscard()
    turn.stepGroup()
    turn.stepRepeatX()
    turn.stepInstruction()
    turn.stepRepeat()
    turn.stepVar()
    turn.stepBatteryBackup()
    turn.stepOverclock()
    turn.stepAntiVirus()
    turn.stepGenerator()
    turn.stepFirewall()
    turn.stepPowerOutage()
    turn.stepVirus()
    turn.stepHack()
    this.stackToPlay = this.turn.getStack()
    this.cardToPlay = this.turn.getCard()
    this.opponentToAttack = this.turn.getOpponent()
    this.moveType = this.turn.getMove()
  },
  sprinter: () => {
    let turn = this.turn
    turn.stepDiscard()
    turn.stepInstruction()
    turn.stepGroup()
    turn.stepHack()
    turn.stepInstruction()
    turn.stepBatteryBackup()
    turn.stepPowerOutage()
    turn.stepAntiVirus()
    turn.stepGenerator()
    turn.stepFirewall()
    turn.stepVirus()
    turn.stepRepeat()
    turn.stepRepeatX()
    turn.stepOverclock()
    turn.stepVar()
    this.stackToPlay = this.turn.getStack()
    this.cardToPlay = this.turn.getCard()
    this.opponentToAttack = this.turn.getOpponent()
    this.moveType = this.turn.getMove()
  },
  protector: () => {
    let turn = this.turn
    turn.stepDiscard()
    turn.stepInstruction()
    turn.stepHack()
    turn.stepRepeatX()
    turn.stepInstruction()
    turn.stepRepeat()
    turn.stepVar()
    turn.stepBatteryBackup()
    turn.stepPowerOutage()
    turn.stepVirus()
    turn.stepOverclock()
    turn.stepAntiVirus()
    turn.stepGenerator()
    turn.stepFirewall()
    turn.stepGroup()
    this.stackToPlay = this.turn.getStack()
    this.cardToPlay = this.turn.getCard()
    this.opponentToAttack = this.turn.getOpponent()
    this.moveType = this.turn.getMove()
  },
  getMove: () => {
    return this.moveType
  },
  getStack: () => {
    return this.stackToPlay
  },
  getCard: () => {
    return this.cardToPlay
  },
  getOpponent: () => {
    return this.opponentToAttack
  },
  getOpponentPO: () => {
    return this.opponentPO
  },
  getOpponentVirus: () => {
    return this.opponentVirus
  }

}

export {Handler}
