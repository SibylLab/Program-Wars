import TutorialDeck from "../classes/TutorialDeck";

const uuidV1 = require('uuid/v1');

import { bus } from '../components/Bus';

import Stack from '../classes/Stack'
import Player from '../classes/Player'
import Deck from '../classes/Deck'

export default {
  resetState(state) {
    state.players = [];
    state.stacks = [];
    state.deck = new Deck();
    state.tutorialDeck = new TutorialDeck();
    state.hands = [];
    state.currentGameState = 'newGame';
    state.activeSide = true;
    state.activePlayer = 0;
    state.activeHasPlayed = false;
    state.currentId = 0;
    state.activeCard = undefined;
    state.selectedStacks = [];
    state.selectedStackBoolean = undefined;
    state.winner = false;
    state.tips.tutorial = true;
    state.tips.fact = true;
    state.firstRound = true;
    state.aiTurn = false;
    state.playerTurn = false;
    state.isTutorial = false;
    state.factIndex = 0;
  },
  addPlayers(state, payload) {
    let id = 0;
    for(let p of payload.list){
      let pp = new Player(id,p.name,undefined,0, 0, p.isAi);
      state.players.push(pp);
      id++;
    }
  },
  // setCurrentPlayer(state, playerId) {
  //   state.activePlayer = playerId
  // },
  //
  endTurn(state, maxplayers) {
    state.activePlayer += 1;
    state.activePlayer = state.activePlayer % maxplayers;
  },
  //
  // updateCurrentPlayerHand(state, hand) {
  //   for(let h of state.hands) {
  //     if(h.playerId == hand.playerId) {
  //       delete state.hands[state.hands.indexOf(h)];
  //     }
  //   }
  //   state.hands.push(hand)
  // },
  selectCard(state, c) {
    let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
    bus.$emit('cardHasBeenSelected');
    for (var card of playerHand.cards) {
      if (card.id === c.id) {
        card.selected = !card.selected;
        if (!card.selected) {
          bus.$emit('cardDeselected')
        } else {
          state.activeCard = c;
        }
      } else {
        card.selected = false
      }
    }
  },
  addCardToDeck(state, card){
    state.deck.cards.push(card);
  },
  shuffleTheDeck(state) {
    state.deck.shuffle();
  },
  addHandToPlayer(state, playerId) {
    let hand = {
      handId: uuidV1(),
      playerId: playerId,
      cards: []
    };
    let localState = state;
    let cardsTemp = [];
    for(let i = 0; i < 5; i++) {
      if(state.isTutorial) {
        cardsTemp.push(localState.tutorialDeck.draw());
      } else {
        cardsTemp.push(localState.deck.draw());
      }
    }
    state = localState;
    hand.cards = cardsTemp;
    state.hands.push(hand);
    state.players.find(player => player.id === playerId).hand = hand.handId;
  },
  addCardToHand(state) {
    if(state.isTutorial) {
      if (state.tutorialDeck.cards.length <= 1 && state.tutorialDeck.discard_cards.length > 0) {
        state.tutorialDeck.shuffle(state.tutorialDeck.discard_cards);
        for (let i = 0; i < state.tutorialDeck.discard_cards.length; i++) {
          state.tutorialDeck.cards.push(state.tutorialDeck.discard_cards[i]);
        }
        state.tutorialDeck.discard_cards = [];
      }
      if (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6) {
        do {
          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.tutorialDeck.cards.pop())
        } while (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6);
      }
    } else {
      if (state.deck.cards.length <= 1 && state.deck.discard_cards.length > 0) {
        state.deck.shuffle(state.deck.discard_cards);
        for (let i = 0; i < state.deck.discard_cards.length; i++) {
          state.deck.cards.push(state.deck.discard_cards[i]);
        }
        state.deck.discard_cards = [];
      }
      if (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6) {
        do {
          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.cards.pop())
        } while (state.hands.find(hand => hand.playerId === state.activePlayer).cards.length < 6);
      }
    }
  },
  initDeck(state){
    state.deck.initDeck(state.players.length);
  },
  initTutorialDeck(state){
    state.tutorialDeck.initDeck(state.players.length);
  },
  setTutorial(state, payload){
    state.isTutorial = payload.gameType;
  },
  addStackToPlayer(state, payload) {
    state.stacks.push(new Stack(payload.playerId, payload.boolSide))
  },
  addCardToStack(state, payload) {
    let stackToAdd = state.stacks.find(st => st.stackId === payload.stackId);
    payload.card.selected = false;
    stackToAdd.addCardToStack(payload.card);
    stackToAdd.calculateStackScore();
  },
  popCardFromStack(state, payload) {
    let stackToPop = state.stacks.find(st => st.stackId === payload.stackId);
    payload.card.selected = false;
    stackToPop.popTopCard();
    stackToPop.calculateStackScore();
  },
  groupStacks(state, payload) {
    state.groupStacks = payload.yesOrNo;
  },
  setActiveCard(state, payload) {
    state.activeCard = payload.cardId;
  },
  setActiveCardUndefined(state) {
    state.activeCard = undefined;
  },
  removeActiveCardFromHand(state) {
    let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
    let playerHandUpdated = playerHand.cards.filter(card => card.id !== state.activeCard.id)
    state.hands.find(hand => hand.playerId === state.activePlayer).cards = playerHandUpdated
    state.activeCard = undefined
  },
  stackDiscard(state, payload) {
    let card = state.stacks.find(stack => stack.stackId === payload.stackId).popTopCard()
    if(state.isTutorial) {
      state.tutorialDeck.discard_cards.push(card)
    } else {
      state.deck.discard_cards.push(card)
    }
  },
  discardSelectedCard(state) {
    let tempActiveCard = state.activeCard;
    tempActiveCard.selected = false;
    if(state.isTutorial) {
      state.tutorialDeck.discard_cards.push(tempActiveCard)
    } else {
      state.deck.discard_cards.push(tempActiveCard)
    }
  },
  setHasPlayed(state, payload) {
    state.activeHasPlayed = payload.hasPlayed
  },
  setGameState(state, payload) {
    state.currentGameState = payload.gameState
  },
  addStackToSelected(state, payload) {
    let stackIdExists = state.selectedStacks.find(stackId => stackId === payload.stackId)
    if (stackIdExists === undefined) {
      state.selectedStacks.push(payload.stackId)
    } else {
      state.selectedStacks = state.selectedStacks.filter(stackId => stackId !== payload.stackId)
    }
  },
  removeAllSelectedStacks(state) {
    state.selectedStacks = []
  },
  setStackSelectedBoolean(state, payload) {
    state.selectedStackBoolean = payload.boolean
  },
  removeStack(state, payload) {
    state.stacks = state.stacks.filter(s => s.stackId !== payload.stackId);
  },
  setActiveSide(state, payload) {
    state.activeSide = payload.activeSide
  },
  setScoreLimit(state, payload) {
    state.scoreLimit = payload.scoreLimit
  },
  setTrueFalseAnim(state, payload) {
    state.trueFalseAnim = payload.startAnim
  },
  setWinner(state, payload){
    state.winner = payload;
  },
  setPlayerScores(state) {
    let players = state.players;
    let stacks = state.stacks;
    for (let player of players) {
      player.trueScore = 0;
      player.falseScore = 0;
      for (let stack of stacks) {
        if (stack.playerId === player.id) {
          if (stack.boolSide) {
            player.trueScore += stack.score;
          } else
            player.falseScore += stack.score;
        }
      }
    }
  },
  setTips(state, payload) {
    state.tips.tutorial = payload.tutorial;
    state.tips.fact = payload.fact;
  },
  checkWin(state) {
    let playerList = state.players;
    let highScore = 0;
    for (let player of playerList) {
      let scoreTrue = 0;
      let scoreFalse = 0;
      scoreTrue = player.trueScore;
      scoreFalse = player.falseScore;

      if ((scoreTrue >= state.scoreLimit) || (scoreFalse >= state.scoreLimit))  {
        if ((scoreTrue > highScore) || (scoreFalse > highScore)) {
          highScore = Math.max(scoreTrue, scoreFalse);
          state.winnerName = player.name;
          state.winnerScore = Math.max(scoreTrue, scoreFalse);
          state.winner = true;
        }
      }
    }
  },
  getIsLast(state) {
    if((state.activePlayer + 1) % state.players.length === 0) {
      state.isLast = true;
    } else {
      state.isLast = false;
    }
    return state.isLast;
  },
  winnerModalTrigger() {
    $('.winner').modal('show');
    $('#playerTurn').modal('handleUpdate')

  },
  playerModalTrigger(state) {
    state.playerTurn = true;
  },
  playerModalHide(state) {
    state.playerTurn = false;
  },
  coinModalTrigger() {
    $('.coin').modal('handleUpdate');
    $('.coin').modal('show');
  },
  setCoinFlipAnim(state, payload) {
    state.coinFlip = payload;
  },
  setPlayfieldColour(state, payload) {
    if(payload) {
     if(state.activeSide) {
       state.trueSideColour = 'background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen';
       state.falseSideColour = 'rgba(242, 0, 0, 0.36)';
     } else {
       state.falseSideColour = 'background-color: rgba(0, 255, 0, 0.26); box-shadow: 0 0 15px 10px forestgreen';
       state.trueSideColour = 'rgba(242, 0, 0, 0.36)';
     }
    } else {
      state.trueSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)';
      state.falseSideColour = 'background-color: #80aef7; box-shadow: 0px 3px 15px rgba(0,0,0,0.6)';
    }
  },
  aiTakeTurn(state, payload) {
    state.aiTurn = true;
    let aiMove = state.players[state.activePlayer].type.turnLogic(payload);
    let cardToPlay = aiMove.cardToPlay;
    let stackToPlay = aiMove.stackToPlay;
    let stackToHack = aiMove.opponentToAttack;
    state.activeCard = cardToPlay;
    if (aiMove.moveType === 'play') {
      bus.$emit('aiAddToStack', stackToPlay)
    } else if (aiMove.moveType === 'discard') {
      bus.$emit('aiDiscard');
    } else if (aiMove.moveType === 'hack') {
      bus.$emit('aiHack', stackToHack);
    } else if (aiMove.moveType === 'group') {
      for(let id of stackToPlay) {
        state.selectedStacks.push(id.stackId)
      }
      state.selectedStackBoolean = stackToPlay[0].boolSide;
      state.groupStacks = false;
      bus.$emit('aiGroup', stackToPlay[0].boolSide, state.players[state.activePlayer].id);
    }
  },
  increaseFactIndex(state) {
    state.factIndex++;
  }
}
