import {store} from "../store/store";

var Turn = (cardToPlay, stackToPlay, opponentToAttack, moveType, opponentPO, opponentVirus, hand, boolSide, canGroup, move, event) => {
  this.type = type;
  this.cardToPlay = cardToPlay;
  this.stackToPlay = stackToPlay;
  this.opponentToAttack = opponentToAttack;
  this.moveType = moveType;
  this.opponentPO = opponentPO;
  this.opponentVirus = opponentVirus;
  this.hand = hand;
  this.boolSide = boolSide;
  this.canGroup = canGroup;
  this.next = undefined;
  this.chosenStep = undefined;
  this.move = move;
  this.event = event
};

Turn.prototype = {
  stepVar: () => {
    if(this.hand.bestVCard !== undefined && this.move.stackToAddVariable(event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = hand.bestVCard;
      this.stackToPlay = this.move.stackToAddVariable(event);
      this.moveType = 'play';
    }
  },
  stepFirewall: () => {
    if(this.hand.firewallCard !== undefined){
      this.cardToPlay = hand.firewallCard;
      this.moveType = 'protection'
    }
  },
  stepGenerator: () => {
    if(this.hand.generatorCard !== undefined){
      this.cardToPlay = hand.generatorCard;
      this.moveType = 'protection'
    }
  },
  stepAntiVirus: () => {
    if(this.hand.antiVirusCard !== undefined){
      this.cardToPlay = hand.antiVirusCard;
      this.moveType = 'protection'
    }
  },
  stepBatteryBackup: () => {
    if(hand.batteryBackupCard !== undefined && store.getters.getCurrentPlayer.hasPowerOutage){
      cardToPlay = hand.batteryBackupCard;
      moveType = 'enhance'
    }
  },
  stepOverclock: () => {
    if(this.hand.overclockCard !== undefined && !store.getters.getCurrentPlayer.hasOverclock){
      this.cardToPlay = hand.overclockCard;
      this.moveType = 'enhance'
    }
  },
  stepGroup: () => {
    if(this.hand.bestGCard.length > 0 && this.canGroup  !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.canGroup.cardToPlay;
      this.stackToPlay = this.canGroup.stackToPlay;
      this.moveType = 'group';
    }
  },
  stepVirus: () => {
    if(this.hand.virusCard !== undefined && !store.getters.getFirstRound && this.opponentVirus !== undefined) {
      this.opponentToAttack = this.move.getOpponentToAttack(event, "VIRUS");
      this.cardToPlay = hand.virusCard;
      this.moveType = 'virus';
    }
  },
  stepHack: () => {
    if(this.hand.hackCard !== undefined && this.move.getHackOpponent(event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.hackCard;
      this.opponentToAttack = this.move.getHackOpponent(event);
      this.moveType = 'hack';

    }
  },
  stepPowerOutage: () => {
    if(this.hand.powerOutageCard !== undefined && this.opponentPO !== undefined){
      this.opponentToAttack = this.move.getOpponentToAttack(event);
      this.cardToPlay = hand.powerOutageCard;
      this.moveType = 'po'
    }
  },
  stepInstruction: () => {
    if(this.hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage) {
      this.cardToPlay = hand.bestICard;
      this.stackToPlay = this.event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      this.moveType = 'play';
    }
  },
  stepRepeat: () => {
    if(this.hand.bestRCard !== undefined && this.move.getStackToRepeat(event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = this.hand.bestRCard;
      this.stackToPlay = this.move.getStackToRepeat(event);
      this.moveType = 'play';
    }
  },
  stepRepeatX: () => {
    if(this.hand.rXCard !== undefined && this.move.getStackToRepeat(event) !== undefined && this.event.stack.find(stack => stack.boolSide === this.boolSide)) {
      this.cardToPlay = hand.rXCard;
      this.stackToPlay = this.move.getStackToRepeat(event);
      this.moveType = 'play';
    }
  },

  setNextStack: (nextStep) => {
    this.next = nextStep
  }
};
