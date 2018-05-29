import {store} from '../store/store.js'

export default class {
  constructor() {
  };

  getBoolSide() {
    return store.getters.getCoinMsg;
  };

  organizeHand(event) {
    let bestICard = undefined;
    let bestRCard = undefined;
    let rXCard = undefined;
    let hackCard = undefined;
    let bestVCard = undefined;
    let bestGCard = [];
    let virusCard = undefined;
    let powerOutageCard = undefined;
    let batteryBackupCard = undefined;
    let overclockCard = undefined;
    let generatorCard = undefined;
    let antiVirusCard = undefined;
    let firewallCard = undefined;


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
      if(hand.type === 'VIRUS') {
        virusCard = hand;
      }
      if(hand.type === 'POWEROUTAGE') {
        powerOutageCard = hand;
      }
      if(hand.type === 'BATTERYBACKUP') {
        batteryBackupCard = hand;
      }
      if(hand.type === 'OVERCLOCK') {
        overclockCard = hand;
      }
      if(hand.type === 'FIREWALL') {
        firewallCard = hand;
      }
      if(hand.type === 'GENERATOR') {
        generatorCard = hand;
      }
      if(hand.type === 'ANTIVIRUS') {
        antiVirusCard = hand;
      }
    }
    return {bestICard, bestRCard, rXCard, hackCard, bestVCard, bestGCard, virusCard, powerOutageCard, batteryBackupCard, overclockCard, firewallCard, generatorCard, antiVirusCard}
  };

  getStackToRepeat(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 6; i++) {

        let tmpStack = e.stack.find(stack => stack.score === i && stack.cards.length === 1);
        if (tmpStack !== undefined && tmpStack.boolSide === store.getters.getCoinMsg) {
          stackToRepeat = tmpStack;

      }
    }
    return stackToRepeat;
  }

  stackToAddVariable(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 6; i++) {

      let tmpStack = e.stack.find(stack => stack.score === i && stack.cards.length === 2);

      if (tmpStack !== undefined && tmpStack.cards[1].value === 1 && tmpStack.boolSide === store.getters.getCoinMsg) {
         stackToRepeat = tmpStack;
        }
      }

    return stackToRepeat;
  }

  getHackOpponent(event) {
    let tmpOpponents = event.opponents.filter(opponents => opponents.score > 0 && opponents.cards[0].type !== 'G' && opponents.hasFirewall !== true);
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

  getOpponentToAttack(event, type) {
    let tmpOpponents = undefined;
    if(type === "POWEROUTAGE") {
      console.log("In POWEROUTAGE")
      tmpOpponents = event.opponents.filter(opponents => opponents.hasGenerator !== true && opponents.hasPowerOutage!== true);
    } else if(type === "VIRUS"){
      tmpOpponents = event.opponents.filter(opponents => opponents.hasAntiVirus !== true && (opponents.trueScore !== 0 || opponents.falseScore !== 0));
    }

      let tmpScore = 0;
      let opponentToAttack = undefined;
    if(tmpOpponents !== undefined) {
      for (let player of tmpOpponents) {
        if (player.score >= tmpScore) {
          opponentToAttack = player;
          console.log("Attack: " + JSON.stringify(opponentToAttack));
          tmpScore = player.score;
        }
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
      if(i.score > 0 && i.score < 6 && i.boolSide === store.getters.getCoinMsg) {
        console.log("Pushing: " + i.boolSide)
        console.log("Is value: " + i.score)
        tmpStack.push(i);
      }
    }
    groupCard = groupCard.sort(this.compare);
    for(let card of groupCard) {
      let lookingForStacks = this.findMatch(card.value, tmpStack);
      if(lookingForStacks !== undefined) {
        return {cardToPlay: card, stackToPlay: lookingForStacks};
      }
    }
    return undefined;
  }

  findMatch(groupValue, groupStacks) {
    let num = groupStacks.length;
    for (let j = 0; j < num; j++) {
      let newValue = 0;
      let tmpStack = [];
      for (let i = 0; i < num; i++) {
        if (newValue + groupStacks[i].score <= groupValue) {
          newValue = newValue + groupStacks[i].score;
          tmpStack.push(groupStacks[i]);
          if (newValue === groupValue) {
            if(tmpStack.length === 1 && tmpStack[0].cards[0].type === 'G') {
              return undefined;
            } else {
              return tmpStack;
            }
          }
        }
      }
      num--;
    }
    return undefined;
  }
}


