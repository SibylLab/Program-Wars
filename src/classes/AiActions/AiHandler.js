
/**
 * This is the handler for the chain of responsibility pattern. It handles running through all of the steps (or chains
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
    this.safetyAndProtectMoves = [this.firewall, this.generator, this.antiVirus, this.overclock, this.batteryBackup, this.group]
    this.sprinterMoves = [this.variable, this.repeatX, this.repeat, this.virus, this.powerOutage, this.instruction, this.hack]
    this.gamblerMoves = [this.variable, this.virus, this.powerOutage, this.repeat, this.instruction, this.repeatX, this.hack]
    this.protectorMoves = [this.virus, this.powerOutage, this.variable, this.repeat, this.instruction, this.repeatX, this.hack]
    this.hackerMoves = [this.hack, this.virus, this.powerOutage, this.variable, this.repeat, this.instruction, this.repeatX]
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
    let instructionRan = false
    let moveList = []
    if (type === 'gambler') {
      moveList = this.gamblerMoves
    } else if (type === 'hacker') {
      moveList = this.hackerMoves
    } else if (type === 'sprinter') {
      moveList = this.sprinterMoves
    } else if (type === 'protector') {
      moveList = this.protectorMoves
    }
    for (let element in this.safetyAndProtectMoves) {
      moveList.unshift(this.safetyAndProtectMoves[element])
    }
    for (let turn in moveList) {
      if (moveList[turn].execute()) {
        this.stackToPlay = moveList[turn].getStack()
        this.cardToPlay = moveList[turn].getCard()
        this.opponentToAttack = moveList[turn].getOpponent()
        this.moveType = moveList[turn].getMove()
        instructionRan = true
        break
      }
    }
    if (!instructionRan) {
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
