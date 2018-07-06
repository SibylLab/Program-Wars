
/**
 * This is the handler for the chain of responsibility pattern. It handles running through all of the steps (or chains)
 * that the Ai will execute.
 */
export default class Handler {
  constructor (oPO, oV, aV, fW, gen, oC, bB, group, virus, hack, pO, inst, rep, repX, variable, disc) {
    this.opponentPO = oPO
    this.opponentVirus = oV
    this.antiVirus = aV
    this.firewall = fW
    this.generator = gen
    this.overclock = oC
    this.batteryBackup = bB
    this.group = group
    this.virus = virus
    this.hack = hack
    this.powerOutage = pO
    this.instruction = inst
    this.repeat = rep
    this.repeatX = repX
    this.variable = variable
    this.discard = disc
    this.stackToPlay = undefined
    this.cardToPlay = undefined
    this.opponentToAttack = undefined
    this.moveType = undefined
  }

  /**
   * This creates the order of operations for the ai steps and executes them until a step has been chosen.
   * @param type The type of Ai.
   */
  setAi (type) {
    // Reversed order of importance to get correct behaviour from unshift
    let safetyAndProtectMoves = [this.overclock, this.antiVirus, this.batteryBackup, this.firewall, this.generator]

    let cardPlayed = false
    let moveList = []
    if (type === 'gambler') {
      moveList = [this.variable, this.repeatX, this.repeat, this.instruction, this.hack, this.virus, this.powerOutage, this.group]
    } else if (type === 'hacker') {
      moveList = [this.hack, this.virus, this.powerOutage, this.variable, this.repeatX, this.repeat, this.instruction, this.group]
    } else if (type === 'sprinter') {
      moveList = [this.variable, this.repeatX, this.repeat, this.instruction, this.hack, this.virus, this.powerOutage, this.group]
    } else if (type === 'protector') {
      moveList = [this.group, this.virus, this.powerOutage, this.variable, this.repeat, this.instruction, this.repeatX, this.hack]
    }

    // console.log('Movelist size: ' + moveList.length)
    // Add the saftey & protect moved to the start of the move list
    for (let move of safetyAndProtectMoves) {
      moveList.unshift(safetyAndProtectMoves[move])
    }
     // console.log('Movelist size: ' + moveList.length)

    for (let turn of moveList) {
      if (typeof moveList[turn] !== 'undefined' && moveList[turn].execute()) {
        this.stackToPlay = moveList[turn].getStack()
        this.cardToPlay = moveList[turn].getCard()
        this.opponentToAttack = moveList[turn].getOpponent()
        this.moveType = moveList[turn].getMove()
        cardPlayed = true
        break
      }
    }
    if (!cardPlayed && typeof this.discard !== 'undefined') {
      this.discard.execute()
      this.cardToPlay = this.discard.getCard()
      this.moveType = this.discard.getMove()
    }
  }

  getMove () {
    return this.moveType
  }

  getStack () {
    return this.stackToPlay
  }

  getCard () {
    return this.cardToPlay
  }

  getOpponent () {
    return this.opponentToAttack
  }

  getOpponentPO () {
    return this.opponentPO
  }

  getOpponentVirus () {
    return this.opponentVirus
  }
}
