
export default class Human{

  constructor() {
  };

  turnLogic(e) {
    let cardToPlay;
    let stackToPlay;
    let boolSideToPlay = true;
    let minStackScore = 2;
    let foundACard = false;
    let moveType; // play, discard, hack, or group
    let opponentToAttack = null;
    let bestICard = null;
    let bestRCard = null;
    let rXCard = null;
    let bestVCard = null;
    let handHas = this.handHasA(e);
    let stackToRepeat = undefined;

    for(let hand of e.hand.cards) {
      if(hand.type === 'I') {
        bestICard = this.findBestCard(hand, bestICard);
          foundACard = true;
      }
      if(hand.type === 'R') {
        if(hand.value === 1) {
          rXCard = hand;
        } else {
          bestRCard = this.findBestCard(hand, bestRCard);
        }
      }
      if(hand.type === 'V') {
        bestVCard = this.findBestCard(hand, bestVCard)
      }
    }

    if(!handHas.I) {
      minStackScore = 1;
    }
    if(handHas.R) {
      for(let i = 1; i <= 6; i++) {
        let tmpStack = e.stack.find(stack => stack.boolSide === boolSideToPlay && stack.score === i && stack.cards.length === 1);
        if(tmpStack !== undefined) {
          stackToRepeat = tmpStack;
        }
      }
    }

    // let stackToRepeat = e.stack.find(stack => stack.boolSide === boolSideToPlay && stack.score >= minStackScore && stack.cards.length === 1);
    if(stackToRepeat !== undefined && bestRCard !== null && bestRCard.value > 1) {
      stackToPlay = stackToRepeat;
      cardToPlay = bestRCard;
      moveType = 'play';
      foundACard = true;
    } else {
      stackToPlay = e.stack.find(stack => stack.boolSide === boolSideToPlay && stack.score === 0);
      cardToPlay = bestICard;
      moveType = 'play';
    }

    if(!foundACard) {
        for(let card of e.hand.cards) {
          if(handHas.G) {
            if(card.type === 'G') {
              cardToPlay = this.findSmallestCard(card, cardToPlay)
            }
          } else if(handHas.V) {
            if(card.tyoe === 'V') {
              cardToPlay = this.findSmallestCard(card, cardToPlay)
            }
          }
        }
        if(cardToPlay === undefined) {
          cardToPlay = e.hand.cards[0];
        }
      moveType = 'discard';
    }
    return {cardToPlay: cardToPlay, stackToPlay: stackToPlay, opponentToAttack: opponentToAttack, moveType: moveType};
  };

  findBestCard(card, CardToBeat) {
    if(CardToBeat !== null) {
      if(card.value > CardToBeat.value) {
        return card;
      } else {
        return CardToBeat;
      }
    } else {
      return card;
    }
  };

  findSmallestCard(card, cardToBeat) {
    if(cardToBeat !== null) {
      if(card.value < cardToBeat.value) {
        return card;
      } else {
        return cardToBeat
      }
    } else {
      return card;
    }
  };

  handHasA(event) {
    let I = false;
    let R = false;
    let Rx = false;
    let V = false;
    let G = false;
    let H = false;

    for(let card of event.hand.cards) {
      if(card.type === 'I') {
        I = true;
      }
      if(card.type === 'R') {
        if(card.value === 1) {
          Rx = true;
        } else {
          R = true;
        }
      }
      if(card.type === 'V') {
        V = true;
      }
      if(card.type === 'G') {
        G = true;
      }
      if(card.type === 'H') {
        H = true;
      }
    }
    return {I, R, V, G, H}
  };

}

