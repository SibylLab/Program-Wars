/**
 * @file Card.js file
 * @author Steve modified on 2020-05-25
 */

/**
 * This is used to represent a card object.
 */
export default class Card {
  /**
   * Constructor for the Card class
   * @constructor Card
   * @param {int} id The ID of the card
   * @param {int} value The value of the card
   * @param {char} type The type of the card
   * @param {char} image is a string pointing to the image of the card
   */
  constructor (id, value, type, image) {
    this.id = id
    this.value = value
    this.type = type
    this.image = image
  }

  isAttack () {
    return this.type === "VIRUS" || this.type === "POWEROUTAGE"
  }

  isSafety () {
    return this.type === "BATTERYBACKUP" || this.type === "OVERCLOCK"
           || this.type === "FIREWALL" || this.type === "ANTIVIRUS"
           || this.type === "GENERATOR"
  }

  isSpecial () {
    return this.isSafety() || this.isAttack()
  }
}
