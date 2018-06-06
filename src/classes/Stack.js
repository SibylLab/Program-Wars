/**
 * @file the card class file
 * @author Josh on 2017-03-13.
 */

const uuidV1 = require('uuid/v1');

export default class Stack {

  //constructor for the stack object
  /**
   * @constructor Stack
   * @param {int} playerId The ID of the player
   * @param {boolean} boolSide The side the stack is on
   */
  constructor(playerId, boolSide){

    this.stackId= uuidV1();
    this.playerId=playerId;
    this.boolSide=boolSide;
    this.cards=[];
    this.score=0;

  }
  //function that takes a card as an argument and adds it to the cards array of the stack object
  /**
   * addCardToStack function to add a card to the stack
   * @memberOf Stack
   * @param {card} card the card to be added to the stack
   */
  addCardToStack(card) {
    this.cards.push(card);
  }

  //function that is meant to calculate the score of an individual stack
  /**
   * calculateStackScore function to calculate the score of the stack
   * @memberOf Stack
   */
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
    //here is a comment, a longer comment, and more
  }

  //this function returns a reference to the first (bottom) card of the stack cards array
  /**
   * stackTopCard function to return a reference to the first (bottom) card of the stack cards array
   * @memberOf Stack
   * @returns {card}
   */
  stackTopCard () {

    return this.cards[this.cards.length - 1];

  }

  // this function returns the top card of a stack and then removes it from the stack
  /**
   * popTopCard function to return the top card of a stack and then removes it from the stack
   * @memberOf Stack
   * @returns {*}
   */
  popTopCard() {

    return this.cards.pop()
  }

  //this function returns a reference to the last card of the stack cards array
  /**
   * stackBottomCard function returns a reference to the last card of the stack cards array
   * @memberOf Stack
   * @returns {*}
   */
  stackBottomCard() {

    return this.cards[0];

  }

  /**
   * Checks if the max number of repeats in a certain stack has been reached
   */
  maxRepeats(){
    let rCount = 0;
    for(let i=0; i<this.cards.length; i++){
      if(this.cards[i].type === 'R'){
        rCount++;
      }
    }
    return rCount >= 2;
  }

}
