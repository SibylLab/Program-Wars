import {store} from '../../store/store.js'

export default class {

  getBoolSide () {
    return store.getters.getCoinMsg
  };

  organizeHand (event) {
    let bestICard
    let bestRCard
    let rXCard
    let hackCard
    let bestVCard
    let bestGCard = []
    let virusCard
    let powerOutageCard
    let batteryBackupCard
    let overclockCard
    let generatorCard
    let antiVirusCard
    let firewallCard

    for (let card of event.hand.cards) {
      if (card.type === 'I') {
        bestICard = this.findBestCard(card, bestICard)
      }
      if (card.type === 'R') {
        if (card.value === 1) {
          rXCard = card
        } else {
          bestRCard = this.findBestCard(card, bestRCard)
        }
      }
      if (card.type === 'V') {
        bestVCard = this.findBestCard(card, bestVCard)
      }
      if (card.type === 'G') {
        bestGCard.push(card)
      }
      if (card.type === 'H') {
        hackCard = card
      }
      if (card.type === 'VIRUS') {
        virusCard = card
      }
      if (card.type === 'POWEROUTAGE') {
        powerOutageCard = card
      }
      if (card.type === 'BATTERYBACKUP') {
        batteryBackupCard = card
      }
      if (card.type === 'OVERCLOCK') {
        overclockCard = card
      }
      if (card.type === 'FIREWALL') {
        firewallCard = card
      }
      if (card.type === 'GENERATOR') {
        generatorCard = card
      }
      if (card.type === 'ANTIVIRUS') {
        antiVirusCard = card
      }
    }
    return {bestICard, bestRCard, rXCard, hackCard, bestVCard, bestGCard, virusCard, powerOutageCard, batteryBackupCard, overclockCard, firewallCard, generatorCard, antiVirusCard}
  };

  /**
   * This allows us to find a stack to repeat. It checks if the top of each stack is a ReapeatX and if it is it won't try to repeat it,
   * otherwise it will find a stack to repeat under the specified stack value.
   * @param e
   * @returns {*}
   */
  getStackToRepeat (e) {
    let stackToRepeat
    let aRepeatCard = 'R'
    let aRepeatX = 1
    let maxStackValue = 10
    if (e.stack !== undefined) {
      for (let curStackValue = 1; curStackValue <= maxStackValue; curStackValue++) {
        let tmpStack = e.stack.find(stack => stack.score === curStackValue && !stack.maxRepeats() && (stack.stackTopCard().type !== aRepeatCard || stack.stackTopCard().value !== aRepeatX))
        if (tmpStack !== undefined && tmpStack.boolSide === store.getters.getCoinMsg) {
          stackToRepeat = tmpStack
        }
      }
    }
    return stackToRepeat
  }

  stackToAddVariable (e) {
    let stackToRepeat
    for (let i = 1; i <= 25; i++) {
      let tmpStack = e.stack.find(stack => stack.score === i && stack.stackTopCard().type === 'R' && stack.stackTopCard().value === 1)

      if (tmpStack !== undefined && tmpStack.cards[1].value === 1 && tmpStack.boolSide === store.getters.getCoinMsg) {
        stackToRepeat = tmpStack
      }
    }

    return stackToRepeat
  }

  getHackOpponent (event) {
    let tmpOpponents = event.opponents.filter(opponents => opponents.score > 0 && opponents.cards[0].type !== 'G' && opponents.hasFirewall !== true)
    let tmpScore = 0
    let opponentToAttack
    for (let player of tmpOpponents) {
      if (player.score > tmpScore && player.cards[0].type !== 'G') {
        opponentToAttack = player
        tmpScore = player.score
      }
    }
    return opponentToAttack
  }

  getOpponentToAttack (event, type) {
    let tmpOpponents
    if (type === 'POWEROUTAGE') {
      tmpOpponents = store.getters.getPlayers.filter(player => player.hasGenerator !== true && player.hasPowerOutage !== true &&
      store.getters.getCurrentPlayer.id !== player.id)
    } else if (type === 'VIRUS') {
      tmpOpponents = store.getters.getPlayers.filter(player => player.hasAntiVirus !== true && player.hasVirus !== true &&
        store.getters.getCurrentPlayer.id !== player.id)
    }

    let tmpScore = 0
    let opponentToAttack
    if (tmpOpponents !== undefined) {
      for (let player of tmpOpponents) {
        if (player.score >= tmpScore) {
          opponentToAttack = player
          tmpScore = player.score
        }
      }
    }
    return opponentToAttack
  }

  findBestCard (card, cardToBeat) {
    if (cardToBeat !== undefined) {
      if (card.value > cardToBeat.value) {
        return card
      } else {
        return cardToBeat
      }
    } else {
      return card
    }
  };

  compare (a, b) {
    if (a.score < b.score || a.value < b.value) { return 1 }
    if (a.score > b.score || a.value > b.value) { return -1 }
    return 0
  }

  findGroup (stack, groupCard) {
    stack = stack.sort(this.compare)
    let tmpStack = []
    for (let i of stack) {
      if (i.score > 0 && i.score < 6 && i.boolSide === store.getters.getCoinMsg) {
        tmpStack.push(i)
      }
    }
    groupCard = groupCard.sort(this.compare)
    for (let card of groupCard) {
      let lookingForStacks = this.findMatch(card.value, tmpStack)
      if (lookingForStacks !== undefined) {
        return {cardToPlay: card, stackToPlay: lookingForStacks}
      }
    }
    return undefined
  }

  findMatch (groupValue, groupStacks) {
    let num = groupStacks.length
    for (let j = 0; j < num; j++) {
      let newValue = 0
      let tmpStack = []
      for (let i = 0; i < num; i++) {
        if (newValue + groupStacks[i].score <= groupValue) {
          newValue = newValue + groupStacks[i].score
          tmpStack.push(groupStacks[i])
          if (newValue === groupValue) {
            if (tmpStack.length === 1 && tmpStack[0].cards[0].type === 'G') {
              return undefined
            } else {
              return tmpStack
            }
          }
        }
      }
      num--
    }
    return undefined
  }
}
