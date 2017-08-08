import AiMove from './AiMove'

export default class Gambler {

  constructor() {
    this.move = new AiMove();
    this.boolSide = this.move.getBoolSide();
  }

  turnLogic(event) {
    let cardToPlay = undefined;
    let stackToPlay = undefined;
    let opponentToAttack = undefined;
    let moveType = undefined;

    let hand = this.move.organizeHand(event);

    if(hand.bestVCard !== undefined && this.move.stackToAddVariable(event) !== undefined) {
      cardToPlay = hand.bestVCard;
      stackToPlay = this.move.stackToAddVariable(event);
      moveType = 'play';

    } else if(hand.rXCard !== undefined && this.move.getStackToRepeat(event) !== undefined) {
      cardToPlay = hand.rXCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(hand.bestRCard !== undefined && this.move.getStackToRepeat(event) !== undefined) {
      cardToPlay = hand.bestRCard;
      stackToPlay = this.move.getStackToRepeat(event);
      moveType = 'play';

    } else if(event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0) !== undefined && hand.bestICard !== undefined) {
      cardToPlay = hand.bestICard;
      stackToPlay = event.stack.find(stack => stack.boolSide === this.boolSide && stack.score === 0);
      moveType = 'play';

    } else if(hand.hackCard !== undefined && this.move.getHackOpponent(event) !== undefined) {
      cardToPlay = hand.hackCard;
      opponentToAttack = this.move.getHackOpponent(event);
      moveType = 'hack';

    } else if(hand.bestGCard !== undefined) {
      cardToPlay = hand.bestGCard[0];
      for(let card in hand.bestGCard) {
        if(cardToPlay.value > card.value) {
          cardToPlay = card;
        }
      }
      moveType = 'discard';

    } else {
      // This should not get called, used as a failsafe
      cardToPlay = event.hand.cards[0];
      moveType = 'discard';
    }

    return {cardToPlay, stackToPlay, opponentToAttack, moveType};
  }
}
