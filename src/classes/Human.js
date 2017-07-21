
export default class Human{

  constructor() {
  };

  turnLogic(e) {
    let cardToPlay;
    let stackToPlay;
    let foundACard = false;
    let moveType; // play, discard, or group
    let opponentToAttack = null;

    for(let hand of e.hand.cards) {
      if(hand.type === 'I') {
        cardToPlay = hand;
        moveType = 'play';
        foundACard = true;
      }
    } if(!foundACard) {
      cardToPlay = e.hand.cards[0];
      moveType = 'discard';
    }
    stackToPlay = e.stack.find(stack => stack.boolSide === true && stack.score === 0);
    return {cardToPlay: cardToPlay, stackToPlay: stackToPlay, opponentToAttack: opponentToAttack, moveType: moveType};
  }
}
