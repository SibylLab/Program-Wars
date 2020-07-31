import { standardDeck } from '@/data/decks'
import Deck from '@/classes/card/Deck'
import GameState from '@/classes/states/GameState'

// Side objective bonuses
const REPEAT_BONUS = 3
const VAR_BONUS = 2
const SAFETY_BONUS = 3
const DEFENSIVE_BONUS = 10
const CLEAN_BONUS = 10
const NESTED_BONUS = 5
const METHOD_BONUS = 10

// bonus types to use for tie breaking
const TIE_BREAK_TYPES = [
  "total", "method", "nested", "defensive", "clean", "safety", "variable", "repeat"
]

export default class StandardGameState extends GameState {
  constructor (players) {
    super(players)
  }

  initGame () {
    this.scoreLimit = 200
    this.deck = new Deck(standardDeck)
    this.givePlayerHands()
    this.currentCard = undefined
  }

  givePlayerHands () {
    for (const player of this.players) {
      this.drawCards(player)
    }
  }

  // Computing bonuses ///////////////////////////////////////////////////////

  getPlayerBonuses (player) {
    const plays = this.turnHistory.filter((play) => {
      return play.player === player && play.type !== 'discardHand'
          && play.type !== 'discardCard'
    })

    const repeat = this.getTypeCount(plays, 'REPEAT') * REPEAT_BONUS
    const variable = this.getTypeCount(plays, 'VARIABLE') * VAR_BONUS
    const safety = this.getSafetyCount(plays) * SAFETY_BONUS
    const method = player.stacks.method.isComplete() ? METHOD_BONUS : 0
    const clean = this.getCleanBonus(player)
    const defensive = this.getDefensiveBonus(player)
    const nested = this.getNestedBonus(player)
    
    const total = repeat + variable + safety + defensive + clean + nested + method
    return {total, repeat, variable, safety, defensive, clean, nested, method}
  }

  getTypeCount (plays, type) {
    return plays.filter(p => !p.type !== 'playMimic' && p.card.type === type).length
  }

  getSafetyCount (plays) {
    return plays.filter(p => !p.type !== 'playMimic' && p.card.isSafety()).length
  }

  getCleanBonus (player) {
    const noNegativeEffects = player.effects.negative.length === 0
    const noViruses = player.stacks.getStacksWithVirus().length === 0
    const noMimics = player.hand.getMimics().length === 0
    return noNegativeEffects && noViruses && noMimics ? CLEAN_BONUS : 0
  }

  getDefensiveBonus (player) {
    let defensive = 0
    if (player.helpedBy('ANTIVIRUS') && player.helpedBy('FIREWALL')) {
      defensive = DEFENSIVE_BONUS
    }
    return defensive
  }

  getNestedBonus (player) {
    return player.stacks.stacks.reduce((acc, stack) => {
      return acc + (stack.isComplete() ? NESTED_BONUS : 0)
    }, 0)
  }

  getBonuses () {
    return this.players.map(p => this.getPlayerBonuses(p))
  }

  // Finding winners /////////////////////////////////////////////////////////

  getWinners () {
    // get winners using bonus totals
    const bonuses = this.getBonuses()
    const highest = Math.max(...this.players.map(p => p.getScore() + bonuses[p.id].total))
    let winners = this.players.filter(p => p.getScore() + bonuses[p.id].total === highest)

    // To break ties filter out players who had the highest normal score first
    winners = this.highestScoreingPlayers(winners)

    // Otherwise filter out players with highest bonus score of each type
    for (const type of TIE_BREAK_TYPES) {
      winners = this.tieBreak(winners, bonuses, type)
    }
    return winners
  }

  tieBreak (players, bonuses, bonusType) {
    const highest = Math.max(...players.map(p => bonuses[p.id][bonusType]))
    return players.filter(p => bonuses[p.id][bonusType] === highest)
  }
}

