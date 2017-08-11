export default class {
  constructor() {

  };

  getBoolSide() {
    let num = Math.floor((Math.random() * 2) + 1);
    if(num === 1) {
      return true;
    } else {
      return false;
    }
  };

  organizeHand(event) {
    let bestICard = undefined;
    let bestRCard = undefined;
    let rXCard = undefined;
    let hackCard = undefined;
    let bestVCard = undefined;
    let bestGCard = [];

    for(let hand of event.hand.cards) {
      if(hand.type === 'I') {
        bestICard = this.findBestCard(hand, bestICard);
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
      if(hand.type === 'G') {
        bestGCard.push(hand);
      }
      if(hand.type === 'H') {
        hackCard = hand;
      }
    }
    return {bestICard, bestRCard, rXCard, hackCard, bestVCard, bestGCard}
  };

  getStackToRepeat(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 6; i++) {
      let tmpStack = e.stack.find(stack => stack.score === i && stack.cards.length === 1);
      if(tmpStack !== undefined) {
        stackToRepeat = tmpStack;
      }
    }
    return stackToRepeat;
  }

  stackToAddVariable(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 6; i++) {
      let tmpStack = e.stack.find(stack => stack.score === i && stack.cards.length === 2);
      if(tmpStack !== undefined && tmpStack.cards[1].value === 1) {
        stackToRepeat = tmpStack;
      }
    }
    return stackToRepeat;
  }

  getHackOpponent(event) {
    let tmpOpponents = event.opponents.filter(opponents => opponents.score > 0 && opponents.cards[0].type !== 'G');
      let tmpScore = 0;
      let opponentToAttack;
      for(let player of tmpOpponents) {
        if(player.score > tmpScore && player.cards[0].type !== 'G') {
          opponentToAttack = player;
          tmpScore = player.score;
        }
      }
      return opponentToAttack;
  }

  findBestCard(card, cardToBeat) {
    if(cardToBeat !== undefined && cardToBeat !== undefined) {
      if(card.value > cardToBeat.value) {
        return card;
      } else {
        return cardToBeat;
      }
    } else {
      return card;
    }
  };

  compare(a,b) {
    if (a.score < b.score || a.value < b.value)
      return 1;
    if (a.score > b.score || a.value > b.value)
      return -1;
    return 0;
  }

  findGroup(stack, groupCard) {
    stack = stack.sort(this.compare);
    let tmpStack = [];
    for(let i of stack) {
      if(i.score > 0 && i.score < 6) {
        tmpStack.push(i);
      }
    }
    console.log(tmpStack[0])
    groupCard = groupCard.sort(this.compare);
    for(let card of groupCard) {
      let lookingForStacks = this.findMatch(card.value, tmpStack);
      if(lookingForStacks !== undefined) {
        return {cardToPlay: card, stackToPlay: lookingForStacks};
        break;
      }
    }
    return undefined;
  }

  findMatch(groupValue, groupStacks) {
    console.log('recursion!')
    let num = groupStacks.length;
    for (let j = 0; j < num; j++) {
      let newValue = 0;
      let tmpStack = [];
      for (let i = 0; i < num; i++) {
        if (newValue + groupStacks[i].score <= groupValue) {
          newValue = newValue + groupStacks[i].score;
          tmpStack.push(groupStacks[i]);
          if (newValue === groupValue) {
            return tmpStack;
          }
        }
      }
      num--;
    }
    return undefined;
  }
  //   for(let i = 0; i < num; i++) {
  //     if(newValue + groupStacks[i].score <= groupValue) {
  //       newValue = newValue + groupStacks[i].score;
  //       tmpStack.push(groupStacks[i]);
  //       if(newValue === groupValue) {
  //         return tmpStack;
  //       }
  //     }
  //   }
  //   groupStacks.shift();
  //   if(groupStacks.length > 0) {
  //     return this.findMatch(groupValue, groupStacks)
  //   } else {
  //     return undefined
  //   }
  // }
}


