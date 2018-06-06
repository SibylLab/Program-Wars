import AiMove from './AiMove'
import {store} from '../store/store'

export default class Hacker {
  /**
   * Constructor for this AI personality.
   */
  constructor() {
    this.move = new AiMove();
    this.boolSide = this.move.getBoolSide();
    console.log("Ai type: Hacker")
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

    let opponentPO = this.move.getOpponentToAttack(event,'POWEROUTAGE');
    let opponentVirus = this.move.getOpponentToAttack(event, 'VIRUS');

    let hand = this.move.organizeHand(event);
    this.boolSide = store.getters.getCoinMsg;
    let canGroup = this.move.findGroup(event.stack, hand.bestGCard);

    if(hand.hackCard !== undefined && this.move.getHackOpponent(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.hackCard;
      opponentToAttack = this.move.getHackOpponent(event);
      moveType = 'hack';
      return {cardToPlay, stackToPlay, opponentToAttack, moveType};

    }
    else if(hand.powerOutageCard !== undefined && opponentPO !== undefined){
      opponentToAttack = this.move.getOpponentToAttack(event);
      cardToPlay = hand.powerOutageCard;
      moveType = 'attack'
    }

    else if(hand.generatorCard !== undefined){
      cardToPlay = hand.generatorCard;
      moveType = 'protection'
    }

    else if(hand.antiVirusCard !== undefined){
      cardToPlay = hand.antiVirusCard;
      moveType = 'protection';
    }
    else if(hand.firewallCard !== undefined){
      cardToPlay = hand.firewallCard;
      moveType = 'protection'
    }

    else if(hand.batteryBackupCard !== undefined && store.getters.getCurrentPlayer.hasPowerOutage){
      cardToPlay = hand.batteryBackupCard;
      moveType = 'enhance'
    }



    else if(hand.overclockCard !== undefined && store.getters.getCurrentPlayer.trueScore !== 0 ||  store.getters.getCurrentPlayer.falseScore !== 0
      && !store.getters.getCurrentPlayer.hasOverclock){
      cardToPlay = hand.overclockCard;
      moveType = 'enhance'
    }

    else if(hand.virusCard !== undefined && !store.getters.getFirstRound && opponentVirus !== undefined) {
      opponentToAttack = this.move.getOpponentToAttack(event, "VIRUS");
      cardToPlay = hand.virusCard;
      moveType = 'attack';
    }

    else if(hand.bestVCard !== undefined && this.move.stackToAddVariable(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestVCard;
      stackToPlay = this.move.stackToAddVariable(event);
      moveType = 'play';

    } else if(hand.bestRCard !== undefined && this.move.getStackToRepeat(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestRCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.bestICard !== undefined) {
      console.log("in instruction")
      cardToPlay = hand.bestICard;
      stackToPlay = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      moveType = 'play';

    } else if(hand.rXCard !== undefined && this.move.getStackToRepeat(event) !== undefined && hand.bestVCard !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.rXCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.bestGCard.length > 0 && canGroup  !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = canGroup.cardToPlay;
      stackToPlay = canGroup.stackToPlay;
      moveType = 'group';

    } else if(hand.bestGCard !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestGCard[0];
      for(let card in hand.bestGCard) {
        if(cardToPlay.value > card.value) {
          cardToPlay = card;
        }
      }
      moveType = 'discard';

    }



    // This should not get called, used as a failsafe
    if(cardToPlay === undefined) {
      cardToPlay = event.hand.cards[0];
      moveType = 'discard';
    }

    return {cardToPlay, stackToPlay, opponentToAttack, moveType};
  }
}
