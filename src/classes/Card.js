/**
 * @file Card.js file
 */

export default class Card {
  /**
   * Constructor for the Card class
   * @constructor Card
   * @param {int} id The ID of the card
   * @param {int} value The value of the card
   * @param {char} type The type of the card
   * @param {char} cardImg is a string pointing to the image of the card
   */
  constructor (id, value, type, cardImg) {
    this.value = value
    this.type = type
    this.selected = false
    this.id = id
    this.cardImg = cardImg
    this.showFace = false
  }

  flipCardFace () {
    this.showFace = !this.showFace
  }
}

