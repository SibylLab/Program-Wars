const uuidV1 = require('uuid/v1');

import { bus } from '../components/Bus';


export default {
        addPlayer(state, todoString) {
            const date = new Date

            const todo = {
                text: todoString,
                id:   uuidV1(),
                date: date,
                complete: false,
                deleted: false
            }

            state.todos.push(todo)

        },
        removeTodo(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)
          console.log(todoId)

          updateTodo.deleted = true;

        },
        toggleComplete(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)

          console.log(todoId)

          updateTodo.complete = !updateTodo.complete;

        },
        restoreTodo(state, todoId) {
          const updateTodo = state.todos.find(td => td.id === todoId)
          console.log(todoId)

          updateTodo.deleted = false;
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

          for (var card of playerHand.cards) {

            console.log("card: ", card)

            if (card.id === c.id) {

              card.selected = !card.selected
              if (!card.selected) {
                bus.$emit('cardDeselected')
              } else {
                state.activeCard = c.id
              }
            } else {
              card.selected = false
            }
          }
        },
        removeCard(state, cId) {
          let newCards = state.hands.find(hand => hand.playerId === state.activePlayer).cards.filter(card => card.id !== cId)

          let hand =  state.hands.find(hand => hand.playerId === state.activePlayer)

          hand.cards = newCards

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
            id: uuidV1(),
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

          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.pop())
        },
        initDeck(state){
          state.deck.initDeck();
        }


}
