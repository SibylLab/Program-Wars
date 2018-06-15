import AiMove from './AiMove'
import {store} from '../store/store'
export default class Gambler {

  /**
   * Constructor for this AI personality.
   */
  constructor() {
    this.move = new AiMove();
    this.boolSide = this.move.getBoolSide();
  }

  /**
   * This function will figure out what card the AI should play.
   * @param event
   * @returns {*} The card to play, the stack to play, the opponent to attack, and the move type.
   */
  turnLogic(event) {
    //This will be executed in either OpponentStacks or PlayerInfoPanel
    let cardToPlay = undefined;
    //This will be executed in AiMove.js
    let stackToPlay = undefined;
    //This will be executed in AiMove.js
    let opponentToAttack = undefined;
    //This is used in mutations under AiTakeTurn
    let moveType = undefined;

    let hand = this.move.organizeHand(event);
    this.boolSide = store.getters.getCoinMsg;
    let canGroup = this.move.findGroup(event.stack, hand.bestGCard);

    let opponentPO = this.move.getOpponentToAttack(event,'POWEROUTAGE');
    let opponentVirus = this.move.getOpponentToAttack(event, 'VIRUS');

    if(hand.bestGCard.length > 0 && canGroup  !== undefined) {
      cardToPlay = canGroup.cardToPlay;
      stackToPlay = canGroup.stackToPlay;
      moveType = 'group';
    }

    else if(hand.virusCard !== undefined && !store.getters.getFirstRound && opponentVirus !== undefined) {
      opponentToAttack = this.move.getOpponentToAttack(event, "VIRUS");
      cardToPlay = hand.virusCard;
      moveType = 'virus';
    }

    else if(hand.powerOutageCard !== undefined && opponentPO !== undefined){
      opponentToAttack = this.move.getOpponentToAttack(event, "POWEROUTAGE");
      cardToPlay = hand.powerOutageCard;
      moveType = 'po';
    }

    else if(hand.generatorCard !== undefined){
      cardToPlay = hand.generatorCard;
      moveType = 'protection'
    }

    else if(hand.overclockCard !== undefined && !store.getters.getCurrentPlayer.hasOverclock){
      cardToPlay = hand.overclockCard;
      moveType = 'enhance'
    }

    else if(hand.antiVirusCard !== undefined){
      cardToPlay = hand.antiVirusCard;
      moveType = 'protection'
    }
    else if(hand.firewallCard !== undefined){
      cardToPlay = hand.firewallCard;
      moveType = 'protection'
    }

    else if(hand.batteryBackupCard !== undefined && store.getters.getCurrentPlayer.hasPowerOutage){
      cardToPlay = hand.batteryBackupCard;
      moveType = 'enhance'
    }


    else if(hand.bestVCard !== undefined && this.move.stackToAddVariable(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestVCard;
      stackToPlay = this.move.stackToAddVariable(event);
      moveType = 'play';

    } else if(hand.bestRCard !== undefined && this.move.getStackToRepeat(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestRCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage) {
      cardToPlay = hand.bestICard;
      stackToPlay = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      moveType = 'play';

    } else if(hand.rXCard !== undefined && this.move.getStackToRepeat(event) !== undefined && hand.bestVCard !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.rXCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.hackCard !== undefined && this.move.getHackOpponent(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.hackCard;
      opponentToAttack = this.move.getHackOpponent(event);
      moveType = 'hack';

    }



    // This should not get called, used as a failsafe
    if(cardToPlay === undefined) {
      if(hand.bestICard !== undefined && !store.getters.getCurrentPlayer.hasPowerOutage){
        cardToPlay = hand.bestICard;
        moveType = 'play';
        stackToPlay = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      } else {
        cardToPlay = event.hand.cards[0];
        moveType = 'discard';
      }
    }

    return {cardToPlay, stackToPlay, opponentToAttack, moveType, opponentPO, opponentVirus};
  }
}
