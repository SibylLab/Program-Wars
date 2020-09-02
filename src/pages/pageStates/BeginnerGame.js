import DeckFactory from '@/classes/deck/DeckFactory'
import Game from '@/pages/pageStates/Game'

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
    this.scoreLimit = 1000
    this.refreshHands()
  }
}

export default BeginnerGame;
