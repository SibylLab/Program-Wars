/**
 * @file Trojan.js file
 * @author Steve on 2020-06-17
 */

import Card from '@/classes/game/Card'
const uuidV1 = require('uuid/v1')

/**
 * A Card that will pretend to be another card but will change the cards effect
 * when played.
 */
export default class Trojan extends Card {
  /**
   * Constructor for the Trojan class
   * @constructor Trojan
   * @param {Card} card The card the trojan is hiding behind.
   */
  constructor (card) {
    super(card.id, card.value, card.type, card.image)
    this.card = card
    this.isMimic = true
  }

  /**
   * Returns a new card to replace the one that was being mimicked.
   */
  replace () {
    let card
    let id = uuidV1()
    if (this.isSafety() || this.type === "GROUP" || this.type === "INSTRUCTION") {
      card = new Card(id, 0, "RANSOM", 'static/cardImages/Spyware.png')
    } else if (this.isAttack() || this.type === "VIRUS") {
      card = new Card(id, 0, "SPYWARE", 'static/cardImages/Ransom.png')
    } else {
      card = new Card(id, 0, "VIRUS", 'static/cardImages/Virus.png')
    }
    card.isExtra = true
    return card
  }
}

