/**
 * Created by Josh on 2017-03-13.
 */
const uuidV1 = require('uuid/v1');


export default class Stack {

  //constructor for the stack object
  constructor(playerId, boolSide){

    this.stackId= uuidV1();
    this.playerId=playerId;
    this.boolSide=boolSide;
    this.cards=[];
    this.score=0;

  }
  //function that takes a card as an argument and adds it to the cards array of the stack object
  addCardToStack(card) {
    this.cards.push(card);
  }

  //function that is meant to calculate the score of an individual stack
  calculateStackScore() {

    //declare a temporary score
    let tempScore = 0;

    //loop through all of the cards in this' card list
    //the let "thing" of "this.thing" creates a shallow copy of each object and allows us to
    //iterate over the objects and get the attributes of them
    for (let card of this.cards) {

      //we add the value of the card to the stack if I or G type
      if (card.type === "I" || card.type === "G") {
        tempScore += card.value;
      }
      //else we multiply
      else {
        tempScore *= card.value;
      }

    }

    //set the value of the stack
    this.score = tempScore;

  }

  //this function returns a reference to the first (bottom) card of the stack cards array
  stackTopCard () {

    return this.cards.shift();

  }

  //this function returns a reference to the last card of the stack cards array
  stackBottomCard() {

    return this.cards.unshift();

  }




}
