import Card from '@/classes/card/Card'
import EffectFactory from '@/classes/statusEffect/EffectFactory'

export default class PositiveEffectCard extends Card {
  constructor (type, deck) {
    super(0, type, deck, Card.imgPath(type.toLowerCase()))
  }

  play ({ target }) {
    if (!target.helpedBy(this.type)) {
      const fact = new EffectFactory(target)
      target.effects.addPositive(fact.newPositiveFromCard(this, 1))

      if (this.type === 'ANTIVIRUS') {
        target.hand.cleanMimics()
        target.playField.cleanViruses()
        target.effects.cleanMalware()
      } else if (this.type === 'FIREWALL') {
        target.effects.cleanHacks()    
      }
    } else {
      this.discard()
    }
  }
}

