import AiMove from './AiMove'
import {store} from '../store/store'
export default class Gambler {

  constructor() {
    this.move = new AiMove();
    this.boolSide = this.move.getBoolSide();
    console.log("Gambler")
  }

  turnLogic(event) {
    let cardToPlay = undefined;
    let stackToPlay = undefined;
    let opponentToAttack = undefined;
    let moveType = undefined;

    let hand = this.move.organizeHand(event);

    this.boolSide = store.getters.getCoinMsg;
    // console.log("The coinMsg: " + store.getters.getCoinMsg)
    // console.log("AI is choosing: " + this.boolSide)

    // let tempGroupStack = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score !== 0)
    // console.log("stack: " + tempGroupStack);
    // console.log("Full Stack: " + event.stack)
    let canGroup = this.move.findGroup(event.stack, hand.bestGCard);
    //let canGroup = this.move.findGroup(tempGroupStack, hand.bestGCard);

    if(hand.bestVCard !== undefined && this.move.stackToAddVariable(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestVCard;
      stackToPlay = this.move.stackToAddVariable(event);
      moveType = 'play';

    } else if(hand.rXCard !== undefined && this.move.getStackToRepeat(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.rXCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.bestRCard !== undefined && this.move.getStackToRepeat(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.bestRCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0) !== undefined && hand.bestICard !== undefined) {
      cardToPlay = hand.bestICard;
      stackToPlay = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      moveType = 'play';

    } else if(hand.hackCard !== undefined && this.move.getHackOpponent(event) !== undefined && event.stack.find(stack => stack.boolSide === this.boolSide)) {
      cardToPlay = hand.hackCard;
      opponentToAttack = this.move.getHackOpponent(event);
      moveType = 'hack';

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
