import DeckFactory from '@/classes/deck/DeckFactory'
import Game from '@/pages/pageStates/Game'

const REQUIRED_COMPONENT_COUNTS = {
  MODEL: 4,
  VIEW: 2,
  CONTROLLER: 5
}

const REQUIRED_DEFENSIVE_COUNTS = 2
const REQUIRED_DEFENSIVE_TYPES = ['INTERFACE', 'GIT', 'ERROR_HANDLING', 'LOGGER']

/**
 * Page state to go with the {@link BeginnerGame.vue}
 * @extends Game.vue
 */
class BeginnerGame extends Game {
  /**
   * Creates a new Beginner game state.
   * @param {Player[]} players - Players that are in the game.
   * @param {Object} level - Info on the cards to add for this game mode.
   * @param {string} level.id - The identifier for the level to use. See
   * {@link deckData} for a list of beginner levels.
   */
  constructor (players, level) {
    super(players)
    this.deck = new DeckFactory().beginnerDeck(level.id)
    this.scoreLimit = 25
    this.refreshHands()
  }

  update () {
    this.currentCard = null
    this.currentPlayer().update()
    this.scores = this.getScores()

    this.isOver = this.players.some(player => {
      return this.meetsVictoryRequirements(this.getRequirementProgress(player.id))
    })
  }

  getRequirementProgress (playerId) {
    const player = this.getPlayer(playerId)
    const progress = {
      player,
      score: this.getPlayerScore(playerId),
      model: 0,
      view: 0,
      controller: 0,
      defensive: 0,
      cardsComplete: false,
      ready: false
    }

    // Count component and defensive cards that are currently on the player's playfield stacks.
    // This reflects cards that remain collected — cards that left (e.g., removed by encounters)
    // won't be counted here.
    if (player && player.playField && typeof player.playField.getAllStacks === 'function') {
      const stacks = player.playField.getAllStacks() || []
      for (const stack of stacks) {
        if (!stack.cards) continue
        for (const card of stack.cards) {
          if (!card || !card.type) continue
          if (card.type === 'MODEL') progress.model++
          else if (card.type === 'VIEW') progress.view++
          else if (card.type === 'CONTROLLER') progress.controller++
          else if (REQUIRED_DEFENSIVE_TYPES.includes(card.type)) progress.defensive++
        }
      }
    }

    // Fallback: if no stacks found, count plays from turnHistory (legacy support).
    if (progress.model + progress.view + progress.controller + progress.defensive === 0 && this.turnHistory && this.turnHistory.length) {
      this.turnHistory.forEach(playInfo => {
        if (!playInfo.card || !playInfo.player || playInfo.player.id !== playerId) return
        const cardType = playInfo.card.type
        if (cardType === 'MODEL') progress.model++
        else if (cardType === 'VIEW') progress.view++
        else if (cardType === 'CONTROLLER') progress.controller++
        else if (REQUIRED_DEFENSIVE_TYPES.includes(cardType)) progress.defensive++
      })
    }

    progress.cardsComplete = this.meetsCardRequirements(progress)
    progress.ready = this.meetsVictoryRequirements(progress)
    return progress
  }

  /**
   * Checks if a player has collected all the required component and defensive
   * cards, ignoring score.
   * @param {Object} progress - A requirement progress object.
   * @return {bool} True if all card minimums are met.
   */
  meetsCardRequirements (progress) {
    return progress.model >= REQUIRED_COMPONENT_COUNTS.MODEL
      && progress.view >= REQUIRED_COMPONENT_COUNTS.VIEW
      && progress.controller >= REQUIRED_COMPONENT_COUNTS.CONTROLLER
      && progress.defensive >= REQUIRED_DEFENSIVE_COUNTS
  }

  meetsVictoryRequirements (progress) {
    return progress.score >= this.scoreLimit
      && this.meetsCardRequirements(progress)
  }

  getWinners () {
    const qualifiedPlayers = this.players.filter(player => {
      return this.meetsVictoryRequirements(this.getRequirementProgress(player.id))
    })

    if (qualifiedPlayers.length > 0) {
      return this.highestScoringPlayers(qualifiedPlayers)
    }

    return this.highestScoringPlayers(this.players)
  }
}

export default BeginnerGame;
