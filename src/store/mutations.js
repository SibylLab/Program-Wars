const uuidV1 = require('uuid/v1');

import { bus } from '../components/Bus';

import Stack from '../classes/Stack'
import Player from '../classes/Player'
import Deck from '../classes/Deck'


export default {
        resetState(state) {
          state.players = []
          state.stacks = []
          state.deck = new Deck()
          state.hands = []
          state.currentGameState = 'newGame'
          state.activeSide = true
          state.activePlayer = 0
          state.activeHasPlayed = false
          state.currentId = 0
          state.activeCard = undefined
          state.selectedStacks = []
          state.selectedStackBoolean = undefined
        },
        addPlayers(state, payload) {
            let id = 0;
            console.log("Beginning to add players...");
            for(let p of payload.list){
              console.log("Adding player "+p);
              let pp = new Player(id,p,undefined,0);
              state.players.push(pp);
              id++;
            }
        },
        setCurrentPlayer(state, playerId) {
          state.activePlayer = playerId

        },
        endTurn(state, maxplayers) {

          console.log(maxplayers)
          state.activePlayer += 1
          state.activePlayer = state.activePlayer % maxplayers
          console.log(state.activePlayer)


        },
        updateCurrentPlayerHand(state, hand) {
          console.log(hand)
          for(let h of state.hands) {
            console.log("HAND: ", h)
            if(h.playerId == hand.playerId) {
              delete state.hands[state.hands.indexOf(h)];
            }
          }
          state.hands.push(hand)
        },
        selectCard(state, c) {
          let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
          bus.$emit('cardHasBeenSelected');

          for (var card of playerHand.cards) {

            console.log("card: ", card)

            if (card.id === c.id) {

              card.selected = !card.selected
              if (!card.selected) {
                bus.$emit('cardDeselected')
              } else {
                state.activeCard = c
              }
            } else {
              card.selected = false
            }
          }
        },
        addCardToDeck(state, card){//changed this to have cards
          state.deck.cards.push(card);
        },
        shuffleTheDeck(state) {
          state.deck.shuffle();
          // shuffle the deck
          // for (let i = state.deck.length; i; i--) {
          //   let j = Math.floor(Math.random() * i);
          //   [state.deck[i - 1], state.deck[j]] = [state.deck[j], state.deck[i - 1]];
          // }

        },
        addHandToPlayer(state, playerId) {
          let hand = {
            handId: uuidV1(),
            playerId: playerId,
            cards: []
          };
          let localState = state;
          let cardsTemp = [];
          for(let i = 0; i < 5; i++){//Changed pop() to draw() using function in deck.js -Lance
            cardsTemp.push(localState.deck.draw());
            console.log('deckSize:'+localState.deck.cards.length);
          }
          state = localState;
          hand.cards = cardsTemp;

          state.hands.push(hand);

          state.players.find(player => player.id === playerId).hand = hand.id;

        },
        addCardToHand(state) {

          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.cards.pop())
        },
        initDeck(state){
          state.deck.initDeck();
        },
        addStackToPlayer(state, payload) {
          console.log(' addStackToPlayer mutation called ')

          console.log(payload.playerId)
          console.log("Payload: ", payload)

          state.stacks.push(new Stack(payload.playerId, payload.boolSide))
        },
        addCardToStack(state, payload) {
          // this is undefined
          console.log("add card to stack mutation called")
          console.log("payload ", payload)
          let stackToAdd = state.stacks.find(st => st.stackId === payload.stackId)
          console.log("stack to add: ", stackToAdd)
          payload.card.selected = false;

          //changed to use new method defined in Stack.js
          //stackToAdd.cards.push(payload.card)
          stackToAdd.addCardToStack(payload.card);
          console.log("stack to add: ", stackToAdd)
          //calculate the score of the stack once a card is added
          stackToAdd.calculateStackScore();
          //display this for logging purpose
          console.log("score of the stack: ", stackToAdd.score);
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

          // we removed the active card from the active player hand, lets set activeCard state to undefined as well
          state.activeCard = undefined
        },
        stackDiscard(state, payload) {
          let card = state.stacks.find(stack => stack.stackId === payload.stackId).popTopCard()

          state.deck.discard_cards.push(card)
        },
        discardSelectedCard(state) {
          let tempActiveCard = state.activeCard
          tempActiveCard.selected = false
          state.deck.discard_cards.push(tempActiveCard)
        },
        setHasPlayed(state, payload) {
          state.activeHasPlayed = payload.hasPlayed
        },
        setGameState(state, payload) {
          state.currentGameState = payload.gameState
        },
        addStackToSelected(state, payload) {
          let stackIdExists = state.selectedStacks.find(stackId => stackId === payload.stackId)

          console.log('stack exists ', stackIdExists)
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
          state.stacks = state.stacks.filter(s => s.stackId !== payload.stackId)
        },
        setPlayerScore(state, payload) {
          let player = state.players.find(player => player.id === payload.id)
          player.score = payload.score
        },
        setActiveSide(state, payload) {
          state.activeSide = payload.activeSide
        },
        setScoreLimit(state, payload) {
          state.scoreLimit = payload.scoreLimit
        },
        setTrueFalseAnim(state, payload) {
          state.trueFalseAnim = payload.startAnim
        }

}
