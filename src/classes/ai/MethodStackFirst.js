/**
 * @file MethodStackFirst.js file
 * @author Steven on 2020-07-03
 */

import ActionHandler from '@/classes/ai/ActionHandler'

/**
 * Play an instruction on the method stack first if it has room.
 * The PlayBestCardAction prioritizes cards and not situations so this
 * action can be added before it to ensure that instructions will be played
 * on the method stack before any other card, but that the instruction card
 * can have a lower priority overall. With methods instructions are not very
 * useful as the base for a stack.
 */
export default class MethodStackFirst extends ActionHandler {
  /**
   * @constructor MethodStackFirst
   */
  constructor (player) {
    super(player)
  }

  /**
   * Returns a playCardOnStack play if the player has an instruction that can
   * be played on the method stack.
   */
  handle(hand, players, stacks, method, scores) {  // eslint-disable-line no-unused-vars
    let instructions = hand.cards.filter((c) => {
      return c.type === "INSTRUCTION" && c.value <= method.toLimit()
    })

    console.log(instructions.length)
    if (instructions.length > 0) {
      let card = instructions.sort((a,b) => { a.value - b.value }).shift()
      console.log(card.value, card.type)
      return {
        playType: 'playCardOnStack',
        card: card,
        player: this.player,
        target: method
      }
    } else {
      return undefined
    }
  }
}


