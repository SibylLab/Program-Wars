import DeckFactory from '@/classes/deck/DeckFactory'
import { isSafety, isNegativeEffect } from '@/classes/card/cardData'
import Game from '@/pages/pageStates/Game'

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

export default class StandardGameState extends Game {
  constructor (players, level) {
    super(players)
    this.deck = new DeckFactory().standardDeck(level.id)
    this.scoreLimit = 200
    this.refreshHands()
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
    const method = player.playField.method.isComplete() ? METHOD_BONUS : 0
    const clean = this.getCleanBonus(player)
    const defensive = this.getDefensiveBonus(player)
    const nested = this.getNestedBonus(player)
    
    const total = repeat + variable + safety + defensive + clean + nested + method
    return {total, repeat, variable, safety, defensive, clean, nested, method}
  }

  getTypeCount (plays, type) {
    return plays.filter(p => !p.replaced && p.card.type === type).length
  }

  getSafetyCount (plays) {
    return plays.filter(p => !p.replaced && isSafety(p.card.type)).length
  }

  getCleanBonus (player) {
    const negatives = player.effects.negative.filter(e => isNegativeEffect(e.type))

    const noNegativeEffects = negatives.length === 0
    const noViruses = player.playField.getStacksWithVirus().length === 0
    const noMimics = player.hand.getMimics().length === 0

    return noNegativeEffects && noViruses && noMimics ? CLEAN_BONUS : 0
  }

  getDefensiveBonus (player) {
    let defensive = 0
    if (player.helpedBy('ANTIVIRUS') || player.helpedBy('FIREWALL')) {
      defensive = DEFENSIVE_BONUS
    }
    return defensive
  }

  getNestedBonus (player) {
    return player.playField.stacks.reduce((acc, stack) => {
      return acc + (stack.isComplete() ? NESTED_BONUS : 0)
    }, 0)
  }

  getBonuses () {
    return this.players.map(p => this.getPlayerBonuses(p))
  }

  // Finding winners /////////////////////////////////////////////////////////

  getWinners () {
    const bonuses = this.getBonuses()
    const totals = this.players.map(p => p.getScore() + bonuses[p.id].total)
    const highest = Math.max(...totals)
    let winners = this.players.filter(p => totals[p.id] === highest)

    // Break ties with highes normal score and then by comparing bonuse types
    winners = this.highestScoringPlayers(winners)
    for (const type of TIE_BREAK_TYPES) {
      winners = this.tieBreak(winners, bonuses, type)
    }
    return winners
  }

  tieBreak (players, bonuses, bonusType) {
    const scores = players.reduce((acc, p) => {
      acc[p.id] = bonuses[p.id][bonusType]
      acc.max = Math.max(acc.max, acc[p.id])
      return acc
    }, {max: -100000})

    return players.filter(p => bonuses[p.id][bonusType] === scores.max)
  }
}

