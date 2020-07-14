import { bus } from '@/components/shared/Bus'
import Player from '@/classes/game/Player'
import Deck from '@/classes/game/Deck'
import Stack from '@/classes/game/Stack'
import MethodStack from '@/classes/game/MethodStack'
import Trojan from '@/classes/game/Trojan'
import AiHandlerFactory from '@/classes/ai/AiHandlerFactory'


/**
 * Exports functions to change the programs state.
 * All operations that will change something in the vuex store should be kept
 * in here and not in components. Do not change the state directly anywhere
 * except in store/actions, and then only if the change is a trivial variable update.
 */
export default {
  /**
   * Resets all game related items in the state for a fresh game.
   * Creates an empty Deck so createDeck Will need to be called with
   * the number of players in the game.
   * Sets gameState to 'game'.
   * Should not affect non-game related settings.
   */
  resetStateForGame (state) {
    state.players = []
    state.stacks = []
    state.hands = []
    state.methods = []
    state.aiHandlers = []
    state.objectives = []
    state.deck = new Deck()
    state.gameState = 'game'
    state.activePlayer = undefined
    state.activeCard = undefined
    state.scoreLimit = 150
    state.turnPlays = []
  },

  /**
   * Sets the backstory marker to be true so the program will not show it
   * again on new game under normal circumstances.
   */
  seenBackstory (state) {
    state.showBackstory = false
  },

  /**
   * Set the starting player for the game.
   */
  setStartingPlayer (state) {
    state.activePlayer = state.players[0]
  },

  /**
   * Change the game state to a given payload.newState.
   */
  changeGameState (state, payload) {
    state.gameState = payload.newState
  },

  /**
   * Create a new deck for a game with a given payload.numPlayers.
   */
  createNewDeck (state) {
    state.deck = new Deck()
  },

  /**
   * Uses a list of player information to create and add new players.
   *
   * Payload = {
   *   players: list of player info {name, ai, personality}
   * }
   */
  addPlayers(state, payload) {
    let factory = new AiHandlerFactory()
    let playerInfo = payload.players

    for (let i = 0; i < playerInfo.length; i++) {
      let player = new Player(i, playerInfo[i].name, playerInfo[i].ai)
      state.players.push(player)
      state.methods.push(new MethodStack(player.id))

      if (player.isAi) {
        let handler = factory.newHandler(playerInfo[i].personality, player)
        state.aiHandlers.push(handler)
      }
    }
  },

  /**
   * Give a player a new hand.
   * Can be used when they have no hand or to redraw a full hand.

   * Payload = {
   *   player: the player being given a new hand.
   * }
   */
  giveNewHand (state, payload) {
    // discard old hand if applicable
    let oldHand = state.hands.find(h => h.playerId === payload.player.id)
    if (oldHand) {
      this.commit('discardHand', {hand: oldHand})
    }

    // create and fill new hand
    let hand = {playerId: payload.player.id, cards: []}
    while (hand.cards.length < 5) {
      let card = state.deck.draw()
      hand.cards.push(card)
    }

    state.hands = state.hands.filter(h => h.playerId !== payload.player.id)
    state.hands.push(hand) 
    state.activeCard = undefined
  },

  /**
   * Discards all the cards in a given hand.
   */
  discardHand (state, payload) {
    for (let card of payload.hand.cards) {
      if (card.isMimic) {
        state.deck.discard.push(card.card)
      } else if (!card.isExtra) {
        state.deck.discard.push(card)
      }
    }
  },

  /**
   * Set the current active card to payload.newCard.
   * Emits a card-selected event.
   */
  setActiveCard (state, payload) {
    state.activeCard = payload.newCard
    bus.$emit('card-selected')
  },

  /**
   * Move the active player to the next player.
   */
  nextPlayer (state) {
    let id = state.activePlayer.id
    id = (id + 1) % state.players.length
    state.activePlayer = state.players.find(p => p.id === id)
    if (id === 0) { state.turnNumber++ }
  },

  /**
   * Updates the cyber effects on the given payload.player.
   */
  updatePlayerEffects (state, payload) {
    let effects = payload.player.positiveEffects.concat(payload.player.negativeEffects)
    for (let effect of effects) {
      if (effect.takeTurn() === 0) {
        payload.player.removeEffect(effect)
      }
    }
  },

  /**
   * Draw a card from the deck and add it to the activePlayers hand.
   */
  drawCard (state) {
    let card = state.deck.draw()
    let hand = state.hands.find(h => h.playerId === state.activePlayer.id)
    hand.cards.push(card)
  },

  /**
   * Discard the given card from the given players hand.
   *
   * Payload
   * {
   *   card: the card to discard,
   *   player: the player discarding the card
   * }
   */
  discardCard (state, payload) {
    let hand = state.hands.find(h => h.playerId === payload.player.id)
    hand.cards = hand.cards.filter(c => c !== payload.card)
    if (payload.card.isMimic) {
      state.deck.discard.push(payload.card.card)
    } else if (!payload.card.isExtra) {
      state.deck.discard.push(payload.card)
    }
    state.activeCard = undefined
  },

  /**
   * Adds a given card effect to a player with the given id.
   * Must also be passed isPositive to know what kind of effect it is.
   *
   * Payload
   * {
   *   card: the card with the effect to add,
   *   target: the player to add the effect to
   * }
   */
  addCardEffect (state, payload) {
    if (payload.card.type === 'SCAN') {
      this.commit('playScan', payload)

    } else if (payload.card.isSafety()) {
      payload.target.addPositive(payload.card.type)
      this.commit('cleanMalware', payload)

    } else if (payload.card.type === 'TROJAN') {
      if (payload.target.helpedBy('SCAN')) {
        payload.target.removePositive('SCAN')
      } else {
        let hand = state.hands.find(h => h.playerId === payload.target.id)
        let pos = Math.floor(Math.random() * hand.cards.length)
        hand.cards[pos] = new Trojan(hand.cards[pos], payload.player)
      }

    } else if (payload.card.isAttack()) {
      payload.target.addNegative(payload.card.type, payload.player.id)
      this.commit('updateMethodCardValues', {player: payload.target})
    }
  },

  /**
   * Cleans up all negative effects that are in play in a players hand or
   * on their stacks when adding the appropriate positiveEffect.
   *
   * Payload
   * {
   *   card: the card with the effect to add,
   *   player: the player clean malware from
   * }
   */
  cleanMalware (state, payload) {
    if (payload.card.type === 'ANTIVIRUS' || payload.card.type === 'FIREWALL') {
      // replace active trojans with the card they are mimicking
      let hand = state.hands.find(h => h.playerId === payload.player.id)
      for (let idx in hand.cards) {
        if (hand.cards[idx].isMimic) {
          hand.cards[idx] = hand.cards[idx].card
        }
      }
    }
    // discard all virus cards on player's stacks when playing antivirus
    if (payload.card.type === 'ANTIVIRUS') {
      let stacks = state.stacks.filter(s => s.playerId === payload.player.id)
      for (let stack of stacks) {
        if (stack.getTop().type === 'VIRUS') {
          state.deck.discard.push(stack.cards.pop())
        }
      }
    }
  },

  /**
   * Removes one random malware that a player has attached to them.
   * Trojan cards are discarded and new cards are drawn.
   *
   * Payload
   * {
   *   card: the scan card,
   *   target: the player to add the scan to
   * }
   */
  playScan (state, payload) {

    // Remove a STACKOVERFLOW next if there is one
    let stackoverflow = payload.target.negativeEffects.filter(e => e.type === 'STACKOVERFLOW')
    if (stackoverflow.length > 0) {
      payload.target.removeEffect(stackoverflow[0])
      bus.$emit('scan-effect', 'STACKOVERFLOW')
      return
    }
   
    // Remove a SQLINJECTION next if there is one
    let sqlinjection = payload.target.negativeEffects.filter(e => e.type === 'SQLINJECTION')
    if (sqlinjection.length > 0) {
      payload.target.removeEffect(sqlinjection[0])
      bus.$emit('scan-effect', 'SQLINJECTION')
      return
    }
  
    // Remove a virus if there is one
    let infectedStacks = state.stacks.filter((s) => {
      return s.playerId === payload.target.id && s.getTop().type === 'VIRUS'
    })
    if (infectedStacks.length > 0) {
      // find the largest stack and remove it's virus first eventually
      state.deck.discard.push(infectedStacks[0].cards.pop())
      bus.$emit('scan-effect', 'VIRUS')
      return
    }

    // Remove a mimicked card next if there is one
    let hand = state.hands.find(h => h.playerId === payload.target.id)
    let mimics = hand.cards.filter(c => c.isMimic)
    if (mimics.length > 0) {
      this.commit('discardCard', {player: payload.target, card: mimics[0]})
      this.commit('drawCard')
      bus.$emit('scan-effect', 'TROJAN')
      return
    }

    // Remove a ransom next if there is one
    let ransoms = payload.target.negativeEffects.filter(e => e.type === 'RANSOM')
    if (ransoms.length > 0) {
      payload.target.removeEffect(ransoms[0])
      bus.$emit('scan-effect', 'RANSOM')
      return
    }

    // Remove a spyware next if there is one
    let spys = payload.target.negativeEffects.filter(e => e.type === 'SPYWARE')
    if (spys.length > 0) {
      payload.target.removeEffect(spys[0])
      bus.$emit('scan-effect', 'SPYWARE')
      return
    }

    // just add the scan to the player
    payload.target.addPositive(payload.card.type)
    this.commit('updateMethodCardValues', payload)
  },

  /**
   * Remove a given card from the hand with the given playerID.
   *
   * Payload
   * {
   *   card: the card to remove,
   *   player: the player to remove the card from
   * }
   */
  removeFromHand (state, payload) {
    let hand = state.hands.find(h => h.playerId === payload.player.id)
    hand.cards = hand.cards.filter(c => c.id != payload.card.id)
  },

  /**
   * Add a given card to a stack with the given stackId.
   * If replace is true the we replace the lowest variable card in the stack.
   *
   * Payload
   * {
   *   card: the card being added,
   *   target: the stack to add the card to
   * }
   */
  addToStack (state, payload) {
    // Don't add virus if the player has active SCAN effect
    if (payload.card.type === 'VIRUS') {
      let targetPlayer = state.players.find(p => p.id === payload.target.playerId)
      if (targetPlayer.helpedBy('SCAN')) {
        targetPlayer.removePositive('SCAN')
        return
      }
    }

    let replace = false
    if (!payload.target.isEmpty()) {
      // If we are adding a variable are we replacing one
      let top = payload.target.getTop()
      replace = !(top.type === "REPEAT" && top.value === 1)
                    && payload.card.type === "VARIABLE"
                    && payload.target.hasVariable()
    }

    // Add the card to the stack
    let stack = payload.target
    if (replace) {
      let replaced = stack.replaceLowestVar(payload.card)
      state.deck.discard.push(replaced)
    } else {
      stack.cards.push(payload.card)
    }

    if (stack.isMethod) {
      this.commit('updateMethodCardValues', {player: payload.player})
    } else if (stack.isComplete()) {
      // If the stack is now complete move it to the end
      state.stacks = state.stacks.filter(s => s.stackId !== stack.stackId)
      state.stacks.push(stack)
    }
  },

  /**
   * Create a new stack with a given card and player.
   * Attempts to place the card in an intuitive place in the players stack list.
   *
   * Payload
   * {
   *   card: the card being added,
   *   player: the player the stack is owned by
   * }
   */
  newStack (state, payload) {
    let stack = new Stack(payload.player.id)
    stack.cards.push(payload.card)

    // Find index of first plain stack and first complete stack if there are any
    let plain = state.stacks.find((s) => {
      return s.cards.length === 1 && s.cards[0].type === "INSTRUCTION"
    })
    let complete = state.stacks.find(s => s.isComplete())

    // Add the new stack in the right place
    if (plain && payload.card.type === "METHOD") {
      let idx = state.stacks.indexOf(plain)
      state.stacks.splice(idx, 0, stack)
    } else if (complete) {
      let idx = state.stacks.indexOf(complete)
      state.stacks.splice(idx, 0, stack)
    } else {
      state.stacks.push(stack)
    }

    this.commit('updateMethodCardValues', {player: payload.player})
  },

  /**
   * Remove a given Set of payload.stacks and discard its cards.
   */
  removeStacks (state, payload) {
    state.stacks = state.stacks.filter(s => !payload.stacks.has(s))
    for (let stack of payload.stacks.values()) {
      for (let card of stack.cards) {
        state.deck.discard.push(card)
      }
    }
  },

  /**
   * Adds a given card to the active players objectives cards played.
   *
   * Payload
   * {
   *   card: the card that was played,
   *   player: the player that played the card
   * }
   */
  addPlayedCard (state, payload) {
    // Some actions do not play a card, so only add it if there is a card obj
    if (payload.card) {
      payload.player.objectives.cardsPlayed.push(payload.card)
    }
  },

  /**
   * Updates values of all method cards that may have changed when adding
   * a method to the play field or an instruction to the method stack.

   * Payload { player: the player that played the card }
   */
  updateMethodCardValues (state, payload) {
    let attack = 'none'
    if (payload.player.hurtBy('STACKOVERFLOW')) {
      attack = 'STACKOVERFLOW'
    } else if (payload.player.hurtBy('SQLINJECTION')) {
      attack = 'SQLINJECTION'
    }

    let value = state.methods.find(m => m.playerId === payload.player.id).getScore(attack)
    let stacks = state.stacks.filter(s => s.playerId === payload.player.id)
    for (let stack of stacks) {
      if (stack.getBase().type === 'METHOD') {
        console.log(value)
        stack.getBase().value = value
      }
    }
  }
}
