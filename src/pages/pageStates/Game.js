import EffectFactory from '@/classes/statusEffect/EffectFactory'
import { bus } from '@/components/shared/Bus'

// Some internal constants for different delays during a players turn
const REDRAW_DELAY = 400
const TURN_DELAY = 1250
const AI_DELAY = 500

/**
 * Base game state for different game pages.
 *
 * Should be subclassed for each game mode to set score limits and add any
 * desired functionality.
 *
 * @prop {int} playerNum - The id of the player whose turn it is.
 * @prop {Object[]} turnHistory - A list of playInfo object (See {@link AIHandler}).
 * Index 0 is the first turn of the game, and new turns are added to the end.
 * @prop {int[]} scores - A list of base scores for each player (indexed by player ID).
 * @prop {int} scoreLimit - The goal score for the players to reach.
 * @prop {Card|null} currentCard - The currently selected card if there is one.
 * @prop {Deck|null} deck - The shared game deck, if there is one.
 * @prop {bool} isOver - True if the game will be over at the end of the current round.
 * @prop {bool} wait - True if user actions are suspended for taking turns, while
 * a turn finishes up.
 */
class Game {
  /**
   * Creates a new Game state.
   * @param {Player[]} players - A List of players in the game.
   */
  constructor (players) {
    this.players = players
    this.playerNum = 0
    this.turnHistory = []
    this.scores = Array(this.players.length).fill(0)
    this.scoreLimit = 0
    this.currentCard = null
    this.deck = null
    this.isOver = false
    this.wait = false
  }

  /**
   * Returns the current player.
   * @return {Player} The current player.
   */
  currentPlayer () {
    return this.players[this.playerNum]
  }

  /**
   * Returns the player for the given ID.
   * @param {int} id - The player ID.
   * @return {Player} The player with the given ID.
   */
  getPlayer (id) {
    return this.players[id]
  }

  /**
   * Advances to the next player, in a circular fashion (i.e. from p3 to p0).
   */
  nextPlayer () {
    this.playerNum++
    this.playerNum = this.playerNum % this.players.length
  }

  /**
   * Returns the score for the player with the given id.
   * @param {int} playerId - The id of the player to get a score for.
   * @return {int} The player's score.
   */
  getPlayerScore (playerId) {
    return this.scores[playerId]
  }

  /**
   * Sets the current card to the given card.
   * @param {Card} card - The card to set as current.
   */
  setCurrentCard (card) {
    this.currentCard = card
  }

  /**
   * Returns the shared deck.
   * @return {Deck} the deck.
   */
  getDeck () {
    return this.deck
  }

  /**
   * Discards all given cards.
   * @param {Card[]} cards - The cards to discard.
   */
  discardCards (cards) {
    cards.map(c => c.discard()) 
  }

  /**
   * Draw cards for the given player until they have a full hand.
   * @param {Player} player - The player to draw cards for.
   */
  drawCards (player) {
    for (let i = player.hand.numCards(); i < player.hand.maxCards; i++) {
      player.hand.addCard(this.drawCard(player))
    }
  }

  /**
   * Draw a card for the given player.
   * 
   * Should be overriden for game modes that use a personal deck, as this
   * just returns a card from the shared deck.
   *
   * @param {Player} player - The player to draw a card for.
   * @return {Card} The drawn card.
   */
  drawCard (player) { // eslint-disable-line no-unused-vars
    return this.deck.draw()
  }

  /**
   * Returns a list of all players that can be attacked by the given attack type.
   * @param {string} attackType - The type of attack, generally this is the card type
   * from the card that would be used for the attack.
   * @return {Player[]} The players who are no already attacked by, or protected from,
   * the given attackType.
   */
  getAttackablePlayers (attackType) {
    const attackable = this.players.filter((p) => {
      return !p.protectedFrom(attackType) && !p.hurtBy(attackType)
          && p !== this.currentPlayer()
    })
    return attackable
  }

  // Turn Logic //////////////////////////////////////////////////////////////

  /**
   * Executes a turn for the current player using the given play info.
   *
   * See {@link AIHandler} for more information on what might be in `playInfo`.
   * @param {Object} playInfo - The information needed to take the turn.
   */
  takeTurn (playInfo) {
    if (!this.wait) {
      if (this.didNotPlayCard(playInfo.type)) {
        this.cardNotPlayed(playInfo)
      } else {
        this.playCard(playInfo)
      }

      this.turnHistory.push(playInfo)
      this.update()

      this.endTurn()
    }
  }

  /**
   * Checks to see if the given play type was did not involve a card.
   * @param {string} type - The type of the play being made.
   * @return {bool} True if the type does not involve playing a card.
   */
  didNotPlayCard (type) {
    return type === 'pass' || type === 'discardHand' || type === 'discardCard'
  }

  /**
   * Resolves a turn where a card was not played.
   *
   * @param {Object} playInfo - The information for the play being made.
   * @param {string} playInfo.type - The type of the play.
   * @param {Player} playInfo.player - The player making the play.
   * @param {Card} playInfo.card - A card to discard if `discardCard`.
   * @param {cardOwner} playInfo.cardOwner - The owner of the card, if there is one.
   */
  cardNotPlayed ({type, player, card, cardOwner}) {
    if (type === 'discardHand') {
      const cards = player.hand.takeAll()
      const fact = new EffectFactory(player)
      player.effects.addNegative(fact.newEffect('REDRAW_CD', 1, false))
      this.discardCards(cards)
    } else if (type === 'discardCard') {
      cardOwner.hand.removeCard(card)
      card.discard()
    } // else pass
  }

  /**
   * Resolves plays that involve a card.
   *
   * Since cards play themselves this just passes on the play info to the
   * card that was played and then removes that card from the cardOwners hand.
   * @param {Object} playInfo - The information for the play being made.
   */
  playCard (playInfo) {
    playInfo.card.play(playInfo)
    playInfo.cardOwner.hand.removeCard(playInfo.card)
    this.notifications(playInfo)
  }

  /**
   * Emits events for notifications if the given playInfo indicates it is required.
   *
   * #### **Events**
   * - `scan-used` - Indicates an effect was blocked by a `scan` card.
   * - `mimic-played` - Indicates that the card played was actually a `mimic`.
   * - `card-played` - Indicates that a card was played.
   *
   * @param {Object} playInfo - The information for the play being made.
   */
  notifications (playInfo) {
    if (playInfo.scanned) {
      bus.$emit('scan-used')
    } else if (playInfo.replaced) {
      bus.$emit('mimic-played')
    }
    bus.$emit('card-played', playInfo)
  }

  /**
   * Updates the game state after a card was played.
   *
   * This includes the scores and checking to see if a player has reached the
   * score limit. Should be overridden or extended if the game does not use
   * a score limit to decide when to end the game.
   */
  update () {
    this.currentCard = null
    this.currentPlayer().update()
    this.scores = this.getScores()

    this.isOver = this.scores.reduce((acc, score) => {
      return acc || score >= this.scoreLimit
    }, false)
  }

  /**
   * Wraps up the turn being taken and transitions to the next player's turn.
   *
   * Emits the `end-turn` event that indicates that a players turn has ended.
   * Also, contains a couple delays so that the game pages can "animate"
   * the adding cards to a player's hand. These delays also give players a
   * moment to see what has happend on their turn, or an AI turn.
   *
   * Sets `wait` for a portion of the turn to keep players from being able to
   * take more actions during delays.
   */
  endTurn () {
    this.wait = true
    bus.$emit('end-turn')

    // timeout is asynchronus so both start their countdown at the same time
    setTimeout(() => {
      this.refreshHands()
    }, REDRAW_DELAY)

    setTimeout(() => {
      if (!this.endGame()) {
        this.nextPlayer()
        this.wait = false

        if (this.currentPlayer().isAI) {
          this.takeAITurn()
        }
      }
    }, TURN_DELAY)
  }

  /**
   * Checks if the game is over and emits the `game-over` event if has.
   * @return {bool} True if the game should end, false otherwise.
   */
  endGame () {
    if (this.isOver && this.playerNum === this.players.length - 1) {
      bus.$emit('game-over')
      return true
    }
    return false
  }

  /**
   * Refills each players hand if they need, or can draw, cards.
   */
  refreshHands () {
    this.players.map(p => {
      if (!p.hurtBy('DDOS')) { this.drawCards(p) }
    })
  }

  /**
   * Takes an AI players turn.
   *
   * Contains a delay so that human players can see the AI player's turn
   * happen.
   */
  takeAITurn () {
    const player = this.currentPlayer()
    const playInfo = player.getPlay(this.players, this.scores, this.getDeck())

    setTimeout(() => {
      this.takeTurn(playInfo)
    }, AI_DELAY)
  }

  // Scoring /////////////////////////////////////////////////////////////////

  /**
   * Returns a list of player's base scores.
   * @return {int[]} A list of player scores.
   */
  getScores () {
    return this.players.map(p => {
      return p.getScore()
    })
  }

  /**
   * Returns a list of the player(s) that have the highest score in the game.
   * @return {Player[]} The list of winning players.
   */
  getWinners () {
    return this.highestScoringPlayers(this.players)
  }

  /**
   * Returns a list of the players with the highest base score.
   *
   * Should be overridden or extended for game modes where winners are picked
   * using more than base scores.
   * @return {Player[]} A list of the players with the highest score.
   */
  highestScoringPlayers (players) {
    const scores = this.getScores()
    const winningScore = Math.max(...scores)
    return players.filter(p => scores[p.id] === winningScore)
  }
}

export default Game;
