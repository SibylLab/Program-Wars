/**
 * @file Card.js file
 * @author Steve modified on 2020-05-25
 */

// Function to create a unique object id
const uuidV1 = require('uuid/v1')

// attack card types (no virus, only cards that create effects)
const ATTACKS = [
  "RANSOM", "SPYWARE", "TROJAN", "STACK_OVERFLOW", "STACK_UNDERFLOW",
  "DDOS", "SQL_INJECTION"
]

/**
 * A Playing card.
 */
export default class Card {
  /**
   * Constructor for the Card class
   * @constructor Card
   * @param {int} value The value of the card
   * @param {char} type The type of the card
   */
  constructor (type, value) {
    this.value = value
    this.type = type
    this.id = uuidV1()
    this.image = 'static/cardImages/' + type.toLowerCase() + value + '.png'
    this.isExtra = false
    this.isMimic = false
  }

  /**
   * Checks if this card is an attack card that is played with a popup and
   * not placed.
   */
  isAttack () {
    return ATTACKS.find(a => a === this.type) !== undefined
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

  isBase () {
    return this.type === 'INSTRUCTION' || this.type === 'METHOD'
  }
}
