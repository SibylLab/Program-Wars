import { debugDeck } from '@/data/decks'
import Deck from '@/classes/game/Deck'
import GameState from '@/classes/states/GameState'

// Side objective bonuses
const REPEAT_BONUS = 3
const VAR_BONUS = 2
const SAFETY_BONUS = 3
const DEFENSIVE_BONUS = 10
const CLEAN_BONUS = 10
const NESTED_BONUS = 5
const METHOD_BONUS = 10

export default class StandardGameState extends GameState {
  constructor (players) {
    super(players)
  }

  initGame () {
    this.scoreLimit = 150
    this.deck = new Deck(debugDeck) // standardDeck)
    this.givePlayerHands()
    this.currentCard = undefined
  }

  givePlayerHands () {
    for (const player of this.players) {
      this.drawCards(player)
    }
  }

  getPlayerBonuses (player) {
    const plays = this.turnHistory.filter((play) => {
      return play.player === player && play.type !== 'discardHand'
          && play.type !== 'discardCard'
    })

    const repeat = plays.filter(p => p.card.type === 'REPEAT').length * REPEAT_BONUS
    const variable = plays.filter(p => p.card.type === 'VARIABLE').length * VAR_BONUS
    const safety = plays.filter(p => p.card.isSafety()).length * SAFETY_BONUS
    const clean = player.effects.negative.length === 0 ? CLEAN_BONUS : 0
    const method = player.stacks.method.isComplete() ? METHOD_BONUS : 0
    const defensive = this.getDefensiveBonus(player)
    const nested = this.getNestedBonus(player)
    
    const total = repeat + variable + safety + defensive + clean + nested + method
    return {total, repeat, variable, safety, defensive, clean, nested, method}
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
}

