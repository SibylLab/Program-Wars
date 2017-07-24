
export default class Human{

  constructor() {
  };

  turnLogic(e) {
    let cardToPlay;
    let stackToPlay;
    let foundACard = false;
    let moveType; // play, discard, hack, or group
    let opponentToAttack = null;
    let bestICard = null;
    let bestRCard = null;
    let tmpI = 0;
    let tmpR = 0;

    for(let hand of e.hand.cards) {
      if(hand.type === 'I') {
        if (hand.value > tmpI) {
          bestICard = hand;
          tmpI = hand.value;
          foundACard = true;
        }
      }
        if(hand.type === 'R') {
          if(hand.value > tmpR) {
            bestRCard = hand;
            tmpR = hand.value;
          }
        }
    }
    let stackToRepeat = e.stack.find(stack => stack.boolSide === true && stack.score === 3);
    if(stackToRepeat !== undefined && bestRCard !== null) {
      stackToPlay = stackToRepeat;
      cardToPlay = bestRCard;
      moveType = 'play';
      foundACard = true;
    } else {
      stackToPlay = e.stack.find(stack => stack.boolSide === true && stack.score === 0);
      cardToPlay = bestICard;
      moveType = 'play';
    }

    if(!foundACard) {
      cardToPlay = e.hand.cards[0];
      moveType = 'discard';
    }
    return {cardToPlay: cardToPlay, stackToPlay: stackToPlay, opponentToAttack: opponentToAttack, moveType: moveType};
  }
}
