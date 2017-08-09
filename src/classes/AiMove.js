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

  sortStacks(stack) {
    if(stack !== undefined) {
      function compare(a,b) {
        if (a.score < b.score)
          return 1;
        if (a.score > b.score)
          return -1;
        return 0;
      }
      return stack.sort(compare);
    } else {
      return;
    }
  }

  getGroupStacks(value, stacks){
    let tmpStacks = undefined;
    for(let stack of stacks){
      if(stack.value > 0 && stack.value <= value){
        tmpStacks.push(stack);
      }
    }
    return tmpStack;
  }

  findGroup(stack, groupCards) {
    let card = undefined;
    let stacks = undefined;

    function compare(a,b) {
      if (a.value < b.value)
        return 1;
      if (a.value > b.value)
        return -1;
      return 0;
    }
    groupCards.sort(compare);
    let tmpStacks = this.sortStacks(stack.stack);
    for(let i = groupCards.length; i > 0; i--) {

    }
    return {card, stacks}
  }

}
