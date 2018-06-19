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

Handler.prototype = {
  gambler: () => {
    this.turn.stepInstruction()
    this.turn.stepGroup()
    this.turn.stepHack()
    this.turn.stepRepeatX()
    this.turn.stepRepeat()
    this.turn.stepBatteryBackup()
    this.turn.stepPowerOutage()
    this.turn.stepOverclock()
    this.turn.stepAntiVirus()
    this.turn.stepGenerator()
    this.turn.stepFirewall()
    this.turn.stepVirus()
    this.turn.stepVar()
    this.stackToPlay = this.turn.getStack()
    this.cardToPlay = this.turn.getCard()
    this.opponentToAttack = this.turn.getOpponent()
    this.moveType = this.turn.getMove()
    // console.log('handler movetype ' + this.turn.getMoveType())
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
