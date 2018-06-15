import {store} from '../store/store.js'

/**
 * This is an encapsulation class for some common functions between all of the Ai Personalities
 */
export default class {
  constructor() {
  };

  getBoolSide() {
    return store.getters.getCoinMsg;
  };

  /**
   * This will organize an Ai's hand to pick out the best of each of their cards and then return to make their playing decision.
   * @param event
   * @returns {{bestICard: undefined, bestRCard: undefined, rXCard: undefined, hackCard: undefined, bestVCard: undefined, bestGCard: Array, virusCard: undefined, powerOutageCard: undefined, batteryBackupCard: undefined, overclockCard: undefined, firewallCard: undefined, generatorCard: undefined, antiVirusCard: undefined}}
   */
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

  /**
   * This will choose a stack to play a repetition card on.
   * @param e The event passed
   * @returns stackToRepeat the stack the Ai will choose to play a repeat card on.
   */
  getStackToRepeat(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 10; i++) {
        let tmpStack = e.stack.find(stack => stack.score === i && !stack.maxRepeats() && (stack.stackTopCard().type !== 'R' || stack.stackTopCard().value !== 1));
        if (tmpStack !== undefined && tmpStack.boolSide === store.getters.getCoinMsg) {
          stackToRepeat = tmpStack;
      }
    }
    return stackToRepeat;
  }

  /**
   * Finds the highest valued stack with a repetitionX card to play a variable card.
   * @param e The event with the stacks.
   * @returns {stackToRepeat} The stack to play the variable card.
   */
  stackToAddVariable(e) {
    let stackToRepeat = undefined;
    for(let i = 1; i <= 25; i++) {

      let tmpStack = e.stack.find(stack => stack.score === i && stack.stackTopCard().type === 'R' && stack.stackTopCard().value === 1);

      if (tmpStack !== undefined && tmpStack.cards[1].value === 1 && tmpStack.boolSide === store.getters.getCoinMsg) {
         stackToRepeat = tmpStack;
        }
      }

    return stackToRepeat;
  }

  /**
   * Chooses the opponent with the highest scoring stack with no grouping card and no firewall card active to play a hack against.
   * @param event
   * @returns {*}
   */
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

  /**
   * This finds the opponent with the highest score to play an attack card against.
   * @param event The event with the stacks
   * @param type The type of attack card (important to search for the safety card)
   * @returns {opponentToAttack} the opponent to attack
   */
  getOpponentToAttack(event, type) {
    let tmpOpponents = undefined;
    if(type === "POWEROUTAGE") {
      tmpOpponents = store.getters.getPlayers.filter(player => player.hasGenerator !== true && player.hasPowerOutage !== true &&
      store.getters.getCurrentPlayer.id !== player.id);
    } else if(type === "VIRUS"){
      tmpOpponents = store.getters.getPlayers.filter(player => player.hasAntiVirus !== true && player.hasVirus !== true &&
        store.getters.getCurrentPlayer.id !== player.id);
    }


      let tmpScore = 0;
      let opponentToAttack = undefined;
    if(tmpOpponents !== undefined) {
      for (let player of tmpOpponents) {
        if (player.trueScore >= tmpScore || player.falseScore >= tmpScore) {
          opponentToAttack = player;
          tmpScore = Math.max(player.trueScore, player.falseScore);
        }
      }
    }
    return opponentToAttack;
  }

  /**
   * Multi use function for finding the highest value card.
   * @param card The card to test.
   * @param cardToBeat The card to beat.
   * @returns {*} Returns either the card given or the card to beat.
   */
  findBestCard(card, cardToBeat) {
    if(cardToBeat !== undefined) {
      if(card.value > cardToBeat.value) {
        return card;
      } else {
        return cardToBeat;
      }
    } else {
      return card;
    }
  };

  /**
   * Compares the scores of two stacks.
   * @param a
   * @param b
   * @returns {number}
   */
  compare(a,b) {
    if (a.score < b.score || a.value < b.value)
      return 1;
    if (a.score > b.score || a.value > b.value)
      return -1;
    return 0;
  }

  /**
   * This checks for any possible groups that can be made.
   * @param stack The set of stacks
   * @param groupCard The set of grouping cards.
   * @returns {*}
   */
  findGroup(stack, groupCard) {
    stack = stack.sort(this.compare);
    let tmpStack = [];
    for(let i of stack) {
      if(i.score > 0 && i.score < 6 && i.boolSide === store.getters.getCoinMsg) {
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

  /**
   * Helper function to search for a match between a group card and the stack value.
   * @param groupValue
   * @param groupStacks
   * @returns {*}
   */
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


