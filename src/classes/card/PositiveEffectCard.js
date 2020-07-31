import Card from '@/classes/card/Card'

export default class PositiveEffectCard extends Card {
  constructor (type, ownerId = -1) {
    super(value, type, this._makeImage(type), ownerId)
  }

  play ({player, target}) {
    if (!target.helpedBy(this.type)) {
      target.effects.addPositive(this)

      if (this.type === 'ANTIVIRUS') {
        return [
          ...target.hand.cleanMimics(),
          ...target.playField.cleanViruses(),
          ...target.effects.cleanMalware()
        ]
      } else if (this.type === 'FIREWALL') {
        return target.effects.cleanHacks()    
      }

      return []
    } else {
      return [this]
    }
  }
}

