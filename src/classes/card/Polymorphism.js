import Card from '@/classes/card/Card'
import Stack from '@/classes/stack/Stack'
import ComponentCard from '@/classes/card/ComponentCard'

// The component lane types a Polymorphism card can morph into.
const COMPONENT_TYPES = ['MODEL', 'VIEW', 'CONTROLLER']

/**
 * Class for the Polymorphism card.
 *
 * Polymorphism is a wildcard component: when played into a lane the player
 * chooses any component of that lane and the card "morphs" into it (one
 * interface, many forms). After morphing it behaves exactly like a normal
 * {@link ComponentCard} of the chosen type.
 *
 * @extends Card
 */
class Polymorphism extends Card {
  /**
   * Creates a new Polymorphism card.
   * @param {Deck} deck - The deck the card is in.
   */
  constructor (deck) {
    super(1, 'POLYMORPHISM', deck, 'static/cardImages/defensive/polymorphism.png')
    this.componentName = null
    this.isPolymorphism = true
  }

  /**
   * Morphs this card into a specific component of the given lane type.
   * After morphing its `type`, `componentName` and `image` match the chosen
   * component so it counts and renders like a normal component card.
   *
   * @param {string} type - The component type ('MODEL', 'VIEW', 'CONTROLLER').
   * @param {string} name - The chosen component name (e.g. 'authorization').
   */
  morph (type, name) {
    if (!COMPONENT_TYPES.includes(type)) {
      throw new Error('Polymorphism: invalid component type: ' + type)
    }
    this.type = type
    this.componentName = name
    this.value = 1
    this.image = ComponentCard.getImagePath(type, name)
  }

  /**
   * Returns the lane index for this card's (morphed) component type.
   * @return {int} 0 for Model, 1 for View, 2 for Controller.
   */
  getLaneIndex () {
    switch (this.type) {
      case 'MODEL': return 0
      case 'VIEW': return 1
      case 'CONTROLLER': return 2
      default: return 0
    }
  }

  /**
   * Plays the (morphed) card like a component card: onto a method stack to
   * accumulate points, or as the base of a new stack in its lane.
   *
   * @param {Object} playInfo - Information about how the card was played.
   * @param {Stack} [playInfo.stack] - The stack the card was played on.
   * @param {PlayField} [playInfo.playField] - The playField to start a stack on.
   */
  play (playInfo) {
    if (playInfo.stack) {
      if (playInfo.stack.isMethod) {
        playInfo.stack.player.playField.addCardToStack(this, playInfo.stack)
      } else {
        this.discard()
      }
    } else {
      const newStack = new Stack(this, playInfo.playField.player)
      playInfo.playField.addStack(newStack, this.getLaneIndex())
    }
  }
}

export default Polymorphism
