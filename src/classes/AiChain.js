import {store} from '../store/store'

var Turn = (opponentPO, opponentVirus, hand, boolSide, canGroup, move, event) => {
  this.cardToPlay = undefined
  this.stackToPlay = undefined
  this.opponentToAttack = undefined
  this.moveType = undefined
  this.opponentPO = opponentPO
  this.opponentVirus = opponentVirus
  this.hand = hand
  this.boolSide = boolSide
  this.canGroup = canGroup
  this.move = move
  this.event = event
}

Turn.prototype = {
  stepVar: () => {
    if (this.hand.bestVCard !== undefined && this.move.stackToAddVariable(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.bestVCard
      this.stackToPlay = this.move.stackToAddVariable(this.event)
      this.moveType = 'play'
      console.log('in stepVar')
    }
  },
  stepFirewall: () => {
    if (this.hand.firewallCard !== undefined) {
      this.cardToPlay = this.hand.firewallCard
      this.moveType = 'protection'
    }
  },
  stepGenerator: () => {
    if (this.hand.generatorCard !== undefined) {
      this.cardToPlay = this.hand.generatorCard
      this.moveType = 'protection'
    }
  },
  stepAntiVirus: () => {
    if (this.hand.antiVirusCard !== undefined) {
      this.cardToPlay = this.hand.antiVirusCard
      this.moveType = 'protection'
    }
  },
  stepBatteryBackup: () => {
    if (this.hand.batteryBackupCard !== undefined && store.getters.getCurrentPlayer.hasPowerOutage) {
      this.cardToPlay = this.hand.batteryBackupCard
      this.moveType = 'enhance'
    }
  },
  stepOverclock: () => {
    if (this.hand.overclockCard !== undefined && !store.getters.getCurrentPlayer.hasOverclock) {
      this.cardToPlay = this.hand.overclockCard
      this.moveType = 'enhance'
    }
  },
  stepGroup: () => {
    if (this.hand.bestGCard.length > 0 && this.canGroup !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.canGroup.cardToPlay
      this.stackToPlay = this.canGroup.stackToPlay
      this.moveType = 'group'
    }
  },
  stepVirus: () => {
    if (this.hand.virusCard !== undefined && !store.getters.getFirstRound && this.opponentVirus !== undefined) {
      this.opponentToAttack = this.move.getOpponentToAttack(this.event, 'VIRUS')
      this.cardToPlay = this.hand.virusCard
      this.moveType = 'virus'
    }
  },
  stepHack: () => {
    if (this.hand.hackCard !== undefined && this.move.getHackOpponent(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.hackCard
      this.opponentToAttack = this.move.getHackOpponent(this.event)
      this.moveType = 'hack'
    }
  },
  stepPowerOutage: () => {
    if (this.hand.powerOutageCard !== undefined && this.opponentPO !== undefined) {
      this.opponentToAttack = this.move.getOpponentToAttack(this.event)
      this.cardToPlay = this.hand.powerOutageCard
      this.moveType = 'po'
    }
  },
  stepInstruction: () => {
    if (this.hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage) {
      this.cardToPlay = this.hand.bestICard
      this.stackToPlay = this.event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0)
      this.moveType = 'play'
      console.log('in instruction')
      console.log('inst type: ' + this.moveType)
    }
  },
  stepRepeat: () => {
    if (this.hand.bestRCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.bestRCard
      this.stackToPlay = this.move.getStackToRepeat(this.event)
      this.moveType = 'play'
    }
  },
  stepRepeatX: () => {
    if (this.hand.rXCard !== undefined && this.move.getStackToRepeat(this.event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.rXCard
      this.stackToPlay = this.move.getStackToRepeat(this.event)
      this.moveType = 'play'
    }
  },

  setNextStack: (nextStep) => {
    this.next = nextStep
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
  }
}

export {Turn}

