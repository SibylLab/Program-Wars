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
                state.activeCard = c
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
        addCardToDeck(state, card){
          state.deck.push(card)
        },
        shuffleTheDeck(state) {
          // shuffle the deck
          for (let i = state.deck.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [state.deck[i - 1], state.deck[j]] = [state.deck[j], state.deck[i - 1]];
          }

        },
        addHandToPlayer(state, playerId) {
          let hand = {
            handId: uuidV1(),
            playerId: playerId,
          }

          let cardsTemp = []
          for(var i = 0; i < 5; i++){
            cardsTemp.push(state.deck.pop())
          }

          hand.cards = cardsTemp

          state.hands.push(hand)

          state.players.find(player => player.id === playerId).hand = hand.handId

        },
        addCardToHand(state) {

          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.pop())
        },
        addStackToPlayer(state, payload) {
          console.log(' addStackToPlayer mutation called ')

          console.log(payload.playerId)
          console.log("Payload: ", payload)

          let stack = {}
          // { stackId:1,
          //   //   playerId:1,
          //   //   boolSide: true,
          //   //   cards: [
          //   //     new Card(0, 'I')
          //   //   ],
          //   //   score: 0
          //   // }
          stack.stackId = uuidV1();
          stack.playerId = payload.playerId;
          stack.boolSide = payload.boolSide;
          stack.cards = [];
          stack.score = 0;

          state.stacks.push(stack)

        },
        addCardToStack(state, payload) {
          // this is undefined
          console.log("add card to stack mutation called")
          console.log("payload ", payload)
          let stackToAdd = state.stacks.find(st => st.stackId === payload.stackId)
          console.log("stack to add: ", stackToAdd)
          stackToAdd.cards.push(payload.card)
          console.log("stack to add: ", stackToAdd)


        },
        setActiveCard(state, cardId) {
          state.activeCard = cardId;
        },
        setActiveCardUndefined(state) {
          state.activeCard = undefined;
        }
}
