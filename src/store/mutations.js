/* eslint-disable no-undef */
import TutorialDeck from '../classes/Models/TutorialDeck'

const uuidV1 = require('uuid/v1')

import { bus } from '../components/SharedComponents/Bus'

import Stack from '../classes/Models/Stack'
import Player from '../classes/Models/Player'
import Deck from '../classes/Models/Deck'

export default {
  resetState (state) {
    state.players = []
    state.stacks = []
    state.deck = new Deck()
    state.tutorialDeck = new TutorialDeck()
    state.hands = []
    state.currentGameState = 'newGame'
    state.activeSide = true
    state.activePlayer = 0
    state.activeHasPlayed = false
    state.currentId = 0
    state.activeCard = undefined
    state.selectedStacks = []
    state.selectedStackBoolean = undefined
    state.winner = false
    state.winnerName = ''
    state.winnerScore = 0
    state.tips.tutorial = true
    state.tips.fact = true
    state.firstRound = true
    state.aiTurn = false
    state.playerTurn = false
    state.isTutorial = false
    state.factIndex = 0
    state.tutorialStep = true
    state.trueSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)'
    state.falseSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)'
  },
  addPlayers (state, payload) {
    let id = 0
    for (let p of payload.list) {
      let pp = new Player(id, p.name, undefined, 0, p.isAi)
      state.players.push(pp)
      id++
    }
  },

  endTurn (state, maxplayers) {
    state.activePlayer += 1
    state.activePlayer = state.activePlayer % maxplayers
  },

  selectCard (state, c) {
    let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
    bus.$emit('cardHasBeenSelected')
    for (let card in playerHand.cards) {
      if (playerHand.cards[card] !== undefined) {
        if (playerHand.cards[card].id === c.id) {
          playerHand.cards[card].selected = !playerHand.cards[card].selected
          if (!playerHand.cards[card].selected) {
            bus.$emit('cardDeselected')
          } else {
            state.activeCard = c
          }
        } else {
          playerHand.cards[card].selected = false
        }
      }
    }
  },
  addHandToPlayer (state, playerId) {
    let hand = {
      handId: uuidV1(),
      playerId: playerId,
      cards: []
    }
    let localState = state
    let cardsTemp = []
    for (let i = 0; i < 5; i++) {
      if (state.isTutorial) {
        cardsTemp.push(localState.tutorialDeck.draw())
      } else {
        cardsTemp.push(localState.deck.draw())
      }
    }
    hand.cards = cardsTemp
    state.hands.push(hand)
    state.players.find(player => player.id === playerId).hand = hand.handId
  },
  reDrawPlayerCards (state, playerId) {
    let localState = state
    localState.deck.shuffle(localState.deck.cards)
    let cardsTemp = []
    for (let i = 0; i < 6; i++) {
      if (state.isTutorial) {
        cardsTemp.push(localState.tutorialDeck.draw())
      } else {
        cardsTemp.push(localState.deck.draw())
      }
    }
    state.hands.find(hand => hand.playerId === state.activePlayer).cards = cardsTemp
    state.activeCard = undefined
  },
  addCardToHand (state) {
    if (state.isTutorial) {
      if (state.tutorialDeck.cards.length <= 1 && state.tutorialDeck.discard_cards.length > 0) {
        for (let i = 0; i < state.tutorialDeck.discard_cards.length; i++) {
          state.tutorialDeck.cards.push(state.tutorialDeck.discard_cards[i])
        }
        state.tutorialDeck.discard_cards = []
      }
      if (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6) {
        do {
          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.tutorialDeck.cards.pop())
        } while (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6)
      }
    } else {
      if (state.deck.cards.length <= 1 && state.deck.discard_cards.length > 0) {
        state.deck.shuffle(state.deck.discard_cards)
        for (let i = 0; i < state.deck.discard_cards.length; i++) {
          state.deck.cards.push(state.deck.discard_cards[i])
        }
        state.deck.discard_cards = []
      }
      if (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6) {
        do {
          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.cards.pop())
        } while (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6)
      }
    }
  },
  initDeck (state) {
    state.deck.initDeck(state.players.length)
  },
  initTutorialDeck (state) {
    state.tutorialDeck.initDeck(state.players.length)
  },
  setTutorial (state, payload) {
    state.isTutorial = payload.gameType
  },
  addStackToPlayer (state, payload) {
    state.stacks.push(new Stack(payload.playerId, payload.boolSide))
  },
  addCardToStack (state, payload) {
    let stackToAdd = state.stacks.find(st => st.stackId === payload.stackId)
    payload.card.selected = false
    stackToAdd.addCardToStack(payload.card)
    stackToAdd.calculateStackScore()
  },
  popCardFromStack (state, payload) {
    let stackToPop = state.stacks.find(st => st.stackId === payload.stackId)
    payload.card.selected = false
    stackToPop.popTopCard()
    stackToPop.calculateStackScore()
  },
  groupStacks (state, payload) {
    state.groupStacks = payload.yesOrNo
  },
  doGroupStacks (state, payload) {
    state.groupStacks = payload.yesOrNo
  },
  setActiveCard (state, payload) {
    if (payload !== undefined) {
      state.activeCard = payload.cardId
    } else {
      state.activeCard = payload
    }
  },
  setActiveCardUndefined (state) {
    state.activeCard = undefined
  },
  removeActiveCardFromHand (state) {
    if (state.activeCard !== undefined) {
      let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
      let playerHandUpdated = playerHand.cards.filter(card => card.id !== state.activeCard.id)
      playerHand.cards = playerHandUpdated
      state.activeCard = undefined
    }
  },
  stackDiscard (state, payload) {
    let card = state.stacks.find(stack => stack.stackId === payload.stackId).popTopCard()
    if (state.isTutorial) {
      state.tutorialDeck.discard_cards.push(card)
    } else {
      state.deck.discard_cards.push(card)
    }
  },
  discardSelectedCard (state) {
    let tempActiveCard = state.activeCard
    tempActiveCard.selected = false
    if (state.isTutorial) {
      state.tutorialDeck.discard_cards.push(tempActiveCard)
    } else {
      state.deck.discard_cards.push(tempActiveCard)
    }
  },
  setHasPlayed (state, payload) {
    state.activeHasPlayed = payload.hasPlayed
  },
  setGameState (state, payload) {
    state.currentGameState = payload.gameState
  },
  addStackToSelected (state, payload) {
    let stackIdExists = state.selectedStacks.find(stackId => stackId === payload.stackId)
    if (stackIdExists === undefined) {
      state.selectedStacks.push(payload.stackId)
    } else {
      state.selectedStacks = state.selectedStacks.filter(stackId => stackId !== payload.stackId)
    }
  },
  removeAllSelectedStacks (state) {
    state.selectedStacks = []
  },
  setStackSelectedBoolean (state, payload) {
    state.selectedStackBoolean = payload.boolean
  },
  removeStack (state, payload) {
    state.stacks = state.stacks.filter(s => s.stackId !== payload.stackId)
  },
  setActiveSide (state, payload) {
    state.activeSide = payload.activeSide
  },
  setScoreLimit (state, payload) {
    state.scoreLimit = payload.scoreLimit
  },
  setTrueFalseAnim (state, payload) {
    state.trueFalseAnim = payload.startAnim
  },
  setPlayerScores (state) {
    let players = state.players
    let stacks = state.stacks
    for (let player of players) {
      player.instructions = 0
      for (let stack of stacks) {
        if (stack.playerId === player.id) {
          player.instructions += stack.score
        }
      }
    }
  },
  setTips (state, payload) {
    state.tips.tutorial = payload.tutorial
    state.tips.fact = payload.fact
  },
  checkWin (state) {
    let playerList = state.players
    let highScore = 0
    for (let player of playerList) {
      player.instructionBonus = 0
      player.defensiveBonus = 0
      player.virusBonus = 0
      player.overClockBonus = 0
      player.completionBonus = 0
      player.overclockIncrease = 0
      player.totalScore = 0
      let score = 0
      let completionBonus = 10
      let overClockBonus = 10
      let defensiveBonus = 15
      let virusBonus = 10
      scoreTrue = player.instructions
      if (player.hasVirus) {
        score = score * 0.75
      } else if (player.hasOverclock) {
        score = score * 1.25
      }
      player.totalTrue = score
      player.totalScore = score

      // Complete Program Bonus
      if (score >= state.scoreLimit) {
        player.completionBonus = completionBonus
      }

      // Defensive Programmer Bonus
      if (player.isDefensive) {
        player.defensiveBonus = defensiveBonus
      }

      // Cool System Bonus
      if (!player.hasHadOverclock) {
        player.overClockBonus = overClockBonus
      }

      // Clean System bonus
      if (!player.hasVirus) {
        player.virusBonus = virusBonus
      }

      player.totalScore += player.virusBonus
      player.totalScore += player.completionBonus
      player.totalScore += player.defensiveBonus
      player.totalScore += player.overClockBonus
      player.totalScore += player.protectionCardsBonus
      player.totalScore += player.groupingBonus
      player.totalScore += player.repetitionBonus
      player.totalScore += player.variablesBonus

      // Check if game won
      if (player.totalTrue >= state.scoreLimit) {
        state.winner = true
        if ((player.totalScore > highScore)) {
          highScore = player.totalScore
          state.winnerName = player.name
          state.winnerScore = highScore
        }
      }
    }
  },
  getIsLast (state) {
    if ((state.activePlayer + 1) % state.players.length === 0) {
      state.isLast = true
    } else {
      state.isLast = false
    }
    return state.isLast
  },
  winnerModalTrigger () {
    $('.winner').modal('show')
    $('#playerTurn').modal('handleUpdate')
  },
  playerModalTrigger (state) {
    state.playerTurn = true
  },
  playerModalHide (state) {
    state.playerTurn = false
  },
  coinModalTrigger () {
    $('.coin').modal('handleUpdate')
    $('.coin').modal('show')
  },
  setCoinFlipAnim (state, payload) {
    state.coinFlip = payload
  },
  setPlayfieldColour (state, payload) {
    if (payload) {
      if (state.activeSide) {
        state.trueSideColour = 'background-color: rgba(14, 183, 99, 0.9); box-shadow: 0 0 15px 10px forestgreen'
        state.falseSideColour = 'background-color: rgba(242, 0, 0, 0.4)'
      } else {
        state.falseSideColour = 'background-color: rgba(14, 183, 99, 0.9); box-shadow: 0 0 15px 10px forestgreen'
        state.trueSideColour = 'background-color: rgba(242, 0, 0, 0.4)'
      }
    } else {
      state.trueSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgb(0,0,0)'
      state.falseSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgb(0,0,0)'
    }
  },
  aiTakeTurn (state, payload) {
    state.aiTurn = true
    let aiMove = state.players[state.activePlayer].type.turnLogic(payload)
    let cardToPlay = aiMove.getCard()
    let stackToPlay = aiMove.getStack()
    let stackToHack = aiMove.getOpponent()
    let moveType = aiMove.getMove()
    let opponentPO = aiMove.getOpponentPO()
    let opponentVirus = aiMove.getOpponentVirus()
    state.activeCard = cardToPlay
    if (moveType === 'play') {
      bus.$emit('aiAddToStack', stackToPlay)
    } else if (moveType === 'discard') {
      bus.$emit('aiDiscard')
    } else if (moveType === 'hack') {
      bus.$emit('aiHack', stackToHack)
    } else if (moveType === 'group') {
      for (let id of stackToPlay) {
        state.selectedStacks.push(id.stackId)
      }
      state.selectedStackBoolean = stackToPlay[0].boolSide
      state.groupStacks = false
      bus.$emit('aiGroup', stackToPlay[0].boolSide, state.players[state.activePlayer].id)
    } else if (moveType === 'po') {
      bus.$emit('aiAttack', opponentPO)
    } else if (moveType === 'virus') {
      bus.$emit('aiAttack', opponentVirus)
    } else if (moveType === 'protection') {
      bus.$emit('aiProtection')
    } else if (moveType === 'enhance') {
      bus.$emit('aiEnhance')
    }
  },
  increaseFactIndex (state) {
    state.factIndex++
  },
  giveVirus (state, payload) {
    if (state.players[payload].hasOverclock) {
      state.players[payload].hasOverclock = false
      state.players[payload].usedBonusCards = state.players[payload].usedBonusCards.filter((obj) => {
        return obj.type !== 'OVERCLOCK'
      })
    } else {
      state.players[payload].hasVirus = true
      state.activeCard.showFace = true
      state.players[payload].attackedCards.push(state.activeCard)
    }
    state.players[payload].hadVirus = true
  },
  givePowerOutage (state, payload) {
    if (state.players[payload].hasBatteryBackup) {
      state.players[payload].hasBatteryBackup = false
      state.players[payload].usedBonusCards = state.players[payload].usedBonusCards.filter((obj) => {
        return obj.type !== 'BATTERYBACKUP'
      })
    } else {
      state.players[payload].hasPowerOutage = true
      state.activeCard.showFace = true
      state.players[payload].attackedCards.push(state.activeCard)
    }
  },
  giveBatteryBackup (state, payload) {
    if (state.players[payload].hasPowerOutage) {
      state.players[payload].hasPowerOutage = false
      state.activeCard.showFace = true
      state.players[payload].attackedCards = state.players[payload].attackedCards.filter((obj) => {
        return obj.type !== 'POWEROUTAGE'
      })
    } else {
      state.players[payload].hasBatteryBackup = true
      state.activeCard.showFace = true
      state.players[payload].usedBonusCards.push(state.activeCard)
    }
  },
  giveOverclock (state, payload) {
    if (state.players[payload].hasVirus) {
      state.players[payload].hasVirus = false
      state.activeCard.showFace = true
      state.players[payload].attackedCards = state.players[payload].attackedCards.filter((obj) => {
        return obj.type !== 'VIRUS'
      })
    } else {
      state.players[payload].hasOverclock = true
      state.activeCard.showFace = true
      state.players[payload].usedBonusCards.push(state.activeCard)
      state.players[payload].hasHadOverclock = true
    }
  },
  giveFirewall (state, payload) {
    let bonus = 5
    state.players[payload].hasFirewall = true
    state.players[payload].hasPowerOutage = false
    state.activeCard.showFace = true
    state.players[payload].usedBonusCards.push(state.activeCard)
    state.players[payload].updateBonus(bonus, bonus)
    state.players[payload].protectionCardsBonus += bonus
    if (state.players[payload].hasFirewall && state.players[payload].hasAntiVirus && state.players[payload].hasGenerator) {
      state.players[payload].isDefensive = true
    }
  },
  giveGenerator (state, payload) {
    let bonus = 5
    state.players[payload].hasGenerator = true
    state.players[payload].hasPowerOutage = false
    state.players[payload].attackedCards = state.players[payload].attackedCards.filter((obj) => {
      return obj.type !== 'POWEROUTAGE'
    })
    state.players[payload].usedBonusCards = state.players[payload].usedBonusCards.filter((obj) => {
      return obj.type !== 'BATTERYBACKUP'
    })
    state.activeCard.showFace = true
    state.players[payload].usedBonusCards.push(state.activeCard)
    state.players[payload].updateBonus(bonus, bonus)
    state.players[payload].protectionCardsBonus += bonus
    if (state.players[payload].hasFirewall && state.players[payload].hasAntiVirus && state.players[payload].hasGenerator) {
      state.players[payload].isDefensive = true
    }
  },
  giveAntiVirus (state, payload) {
    let bonus = 5
    state.players[payload].hasAntiVirus = true
    state.players[payload].hasVirus = false
    state.players[payload].attackedCards = state.players[payload].attackedCards.filter((obj) => {
      return obj.type !== 'VIRUS'
    })
    state.activeCard.showFace = true
    state.players[payload].usedBonusCards.push(state.activeCard)
    state.players[payload].updateBonus(bonus, bonus)
    state.players[payload].protectionCardsBonus += bonus
    if (state.players[payload].hasFirewall && state.players[payload].hasAntiVirus && state.players[payload].hasGenerator) {
      state.players[payload].isDefensive = true
    }
  },
  changeBonusScore (state, payload) {
    state.players[payload.id].bonusTrue += payload.score
  },
  flipTutorialStep (state) {
    state.tutorialStep = !state.tutorialStep
  },
  setFirstRound (state, payload) {
    state.firstRound = payload
  },
  setAiTurn (state, payload) {
    state.aiTurn = payload
  },
  setActiveStack (state, payload) {
    state.activeStack = payload
  },
  setTimerInterval (state, payload) {
    state.timerInterval = payload
  },
  stopTimer (state) {
    state.timerInterval.stop()
  },
  updateTheme (state, payload) {
    state.mainBackgroundColour = payload.mainBC
    state.mainTextColour = payload.mainTC
    state.pIPBackgroundColour = payload.playfieldBC
    state.pIPTextColour = payload.playfieldTC
  }
}
