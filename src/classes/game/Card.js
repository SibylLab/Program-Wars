/**
 * @file Card.js file
 * @author Steve modified on 2020-05-25
 */

/**
 * A Playing card.
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
    this.isExtra = false
    this.isMimic = false
  }

  /**
   * Checks if this card is an attack card that is played with a popup and
   * not placed.
   */
  isAttack () {
    return this.type === "RANSOM" || this.type === "SPYWARE"
           || this.type === "TROJAN"
  }

  /**
   * Checks if this card is a safety or remedy card that is played with a
   * popup and not placed.
   */
  isSafety () {
    return this.type === "SCAN" || this.type === "FIREWALL"
           || this.type === "ANTIVIRUS"
  }

  /**
   * Checks if this card is an attack or safety card that is played with
   * a popup and not placed.
   */
  isSpecial () {
    return this.isSafety() || this.isAttack()
  }
}
