export class Turn {
  constructor (hand, boolSide, move, event) {
    this.cardToPlay = undefined
    this.stackToPlay = undefined
    this.opponentToAttack = undefined
    this.moveType = undefined
    // this.opponentPO = opponentPO
    // this.opponentVirus = opponentVirus
    this.hand = hand
    this.boolSide = boolSide
    // this.canGroup = canGroup
    this.move = move
    this.event = event
  }
  execute () {
// eslint-disable-next-line no-console
    console.error('Execute not implemented')
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
}

// opponentPO, opponentVirus, canGroup,
// Turn.prototype = {
//   stepVar: () => {
//     if (this.hand.bestVCard !== undefined && this.move.stackToAddVariable(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
//       this.cardToPlay = this.hand.bestVCard
//       this.stackToPlay = this.move.stackToAddVariable(this.event)
//       this.moveType = 'play'
//     }
//     return this
//   },
//   stepFirewall: () => {
//     if (this.hand.firewallCard !== undefined) {
//       this.cardToPlay = this.hand.firewallCard
//       this.moveType = 'protection'
//     }
//   },
//   stepGenerator: () => {
//     if (this.hand.generatorCard !== undefined) {
//       this.cardToPlay = this.hand.generatorCard
//       this.moveType = 'protection'
//     }
//     return this
//   },
//   stepAntiVirus: () => {
//     if (this.hand.antiVirusCard !== undefined) {
//       this.cardToPlay = this.hand.antiVirusCard
//       this.moveType = 'protection'
//     }
//     return this
//   },
//   stepBatteryBackup: () => {
//     if (this.hand.batteryBackupCard !== undefined && store.getters.getCurrentPlayer.hasPowerOutage) {
//       this.cardToPlay = this.hand.batteryBackupCard
//       this.moveType = 'enhance'
//     }
//     return this
//   },
//   stepOverclock: () => {
//     if (this.hand.overclockCard !== undefined && !store.getters.getCurrentPlayer.hasOverclock) {
//       this.cardToPlay = this.hand.overclockCard
//       this.moveType = 'enhance'
//     }
//     return this
//   },
//   stepGroup: () => {
//     if (this.hand.bestGCard.length > 0 && this.canGroup !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
//       this.cardToPlay = this.canGroup.cardToPlay
//       this.stackToPlay = this.canGroup.stackToPlay
//       this.moveType = 'group'
//     }
//     return this
//   },
//   stepVirus: () => {
//     if (this.hand.virusCard !== undefined && !store.getters.getFirstRound && this.opponentVirus !== undefined) {
//       this.opponentToAttack = this.move.getOpponentToAttack(this.event, 'VIRUS')
//       this.cardToPlay = this.hand.virusCard
//       this.moveType = 'virus'
//     }
//     return this
//   },
//   stepHack: () => {
//     if (this.hand.hackCard !== undefined && this.move.getHackOpponent(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
//       this.cardToPlay = this.hand.hackCard
//       this.opponentToAttack = this.move.getHackOpponent(this.event)
//       this.moveType = 'hack'
//     }
//     return this
//   },
//   stepPowerOutage: () => {
//     if (this.hand.powerOutageCard !== undefined && this.opponentPO !== undefined) {
//       this.opponentToAttack = this.move.getOpponentToAttack(this.event)
//       this.cardToPlay = this.hand.powerOutageCard
//       this.moveType = 'po'
//     }
//     return this
//   },
//   stepInstruction: () => {
//     if (this.hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage) {
//       this.cardToPlay = this.hand.bestICard
//       this.stackToPlay = this.event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0)
//       this.moveType = 'play'
//     }
//     return this
//   },
//   stepRepeat: () => {
//     if (this.hand.bestRCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
//       this.cardToPlay = this.hand.bestRCard
//       this.stackToPlay = this.move.getStackToRepeat(this.event)
//       this.moveType = 'play'
//     }
//     return this
//   },
//   stepRepeatX: () => {
//     if (this.hand.rXCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
//       this.cardToPlay = this.hand.rXCard
//       this.stackToPlay = this.move.getStackToRepeat(this.event)
//       this.moveType = 'play'
//     }
//     return this
//   },
//   stepDiscard: () => {
//     this.cardToPlay = this.event.hand.cards[0]
//     this.moveType = 'discard'
//     return this
//   },

// }

// export {Turn}
