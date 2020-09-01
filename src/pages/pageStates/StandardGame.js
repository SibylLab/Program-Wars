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

/**
 * Game state for Standard games.
 *
 * Standard games most notibly add various player bonuses to the game and a higher
 * score limit than Beginner games.
 *
 * @extends Game
 */
class StandardGame extends Game {
  /**
   * Creates a new standard game.
   * @param {Player[]} players - The players in the game.
   * @param {Object} level - Info for the level being played. See {@link deckData}
   * for a list of standard levels.
   */
  constructor (players, level) {
    super(players)
    this.deck = new DeckFactory().standardDeck(level.id)
    this.scoreLimit = 200
    this.refreshHands()
  }

  // Computing bonuses ///////////////////////////////////////////////////////

  /**
   * Returns an object with player bonus values.
   * @return {Object} An object with bonus scores for different bonus categories.
   * ```
   * {
   *   total     // The total of all the bonuses
   *   repeat    // The bonus for playing repeat cards
   *   variable  // The bonus for playing variable cards
   *   safety    // The bonus for playing different safety cards
   *   method    // The bonus for having a method stack with the max allowed score
   *   clean     // The bonus for having no hack or malware at the end of the game
   *   defensive // The bonus for having a firewall or antivirus active
   *   nested    // The bonus for each complete stack
   * }
   * ```
   */
  getPlayerBonuses (player) {
    const plays = this.turnHistory.filter((play) => {
      return play.player === player && this.isValidPlay(play)
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

  /**
   * Check if a play is valid for one of the bonuses that add points for playing
   * a card type a number of times.
   */
  isValidPlay(play) {
    return play.card && !play.replaced && play.type !== 'discardHand'
        && play.type !== 'discardCard'
  }

  /**
   * Gets a count of all of the turns that played a card of the given type.
   *
   * Should only be called with plays that `isValidPlay` is true for.
   *
   * @param {Object[]} plays - A list of playInfo objects.
   * @param {string} type - The card type to check for.
   * @return {int} The number of valid plays where the given card type was played.
   */
  getTypeCount (plays, type) {
    return plays.filter(p => p.card.type === type).length
  }

  /**
   * Gets the number of times a safety card was played in a list of plays.
   *
   * Should only be called with plays that `isValidPlay` is true for.
   *
   * @param {Object[]} plays - A list of playInfo objects.
   * @return {int} The number of plays where a safety card was played.
   */
  getSafetyCount (plays) {
    return plays.filter(p => isSafety(p.card.type)).length
  }

  /**
   * Returns the bonus a player should get for the `clean` bonus
   * @param {Player} player - The player to check.
   * @return {int} The number of points to give the player for the `clean` bonus.
   */
  getCleanBonus (player) {
    const negatives = player.effects.negative.filter(e => isNegativeEffect(e.type))

    const noNegativeEffects = negatives.length === 0
    const noViruses = player.playField.getStacksWithVirus().length === 0
    const noMimics = player.hand.getMimics().length === 0

    return noNegativeEffects && noViruses && noMimics ? CLEAN_BONUS : 0
  }

  /**
   * Returns the bonus a player should get for the `defensive` bonus
   * @param {Player} player - The player to check.
   * @return {int} The number of points to give the player for the `defensive` bonus.
   */
  getDefensiveBonus (player) {
    let defensive = 0
    if (player.helpedBy('ANTIVIRUS') || player.helpedBy('FIREWALL')) {
      defensive = DEFENSIVE_BONUS
    }
    return defensive
  }

  /**
   * Returns the total bonus for the number of complete stacks a player has.
   * @param {Player} player - The player to check.
   * @return {int} The total nested bonus for the player.
   */
  getNestedBonus (player) {
    return player.playField.stacks.reduce((acc, stack) => {
      return acc + (stack.isComplete() ? NESTED_BONUS : 0)
    }, 0)
  }

  /**
   * Return a list of bonus objects for each player.
   * 
   * See {@link StandardGame#getPlayerBonuses} for more info on what is in
   * a bonus object.
   *
   * @return {Object[]} A list of bonus objects for each player.
   */
  getBonuses () {
    return this.players.map(p => this.getPlayerBonuses(p))
  }

  // Finding winners /////////////////////////////////////////////////////////

  /**
   * Gets a list of winners for the game, taking their bonuses into effect to
   * try and break ties.
   * @return {Player[]} A list of players that have won, or tied, the game.
   */
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

  /**
   * Attempts to use the given bonus type to eliminate players from contention for
   * winning.
   *
   * Compares all player's value for the given bonus type and returns only those
   * that have the highest value. If all players are tied for the bonus they will
   * all be returned. If only one player has the highest score then that player
   * will be the only player in the list returned.
   *
   * @param {Player[]} players - The players that are tied up to this point.
   * @param {Object[]} bonuses - The list of bonuses for each player.
   * @param {string} bonusType - The name of the bonus to check for.
   * See {@link StandardGame#getPlayerBonus} for the names of the bonuses in a bonus
   * object.
   * @return {Player[]} A list of players with the highest value for the given
   * bonusType.
   */
  tieBreak (players, bonuses, bonusType) {
    const scores = players.reduce((acc, p) => {
      acc[p.id] = bonuses[p.id][bonusType]
      acc.max = Math.max(acc.max, acc[p.id])
      return acc
    }, {max: -100000})

    return players.filter(p => bonuses[p.id][bonusType] === scores.max)
  }
}

export default StandardGame;
