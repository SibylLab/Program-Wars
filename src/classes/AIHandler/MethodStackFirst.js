/**
 * @file MethodStackFirst.js file
 * @author Steven on 2020-07-03
 */

import ActionHandler from '@/classes/AIHandler/ActionHandler'

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
   * Returns a playCardOnStack play if the player has an instruction that can
   * be played on the method stack.
   */
  handle(player, players, scores) {  // eslint-disable-line no-unused-vars
    let instructions = player.hand.cards.filter((c) => {
      return c.type === "INSTRUCTION" && c.value <= player.playField.method.toLimit()
    })

    if (instructions.length > 0) {
      instructions.sort((a,b) => { return b.value - a.value })
      let card = instructions.shift()
      return {
        type: 'playOnStack',
        card: card,
        cardOwner: player,
        player: player,
        stack: player.playField.method,
        stackOwner: player
      }
    } else {
      return undefined
    }
  }
}


