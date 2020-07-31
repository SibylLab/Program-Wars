import Card from '@/classes/card/Card'

export default class SqlInjection extends Card {
  constructor (ownerId = -1) {
    super(value, "SQL_INJECTION", this._makeImage("sql_injection"), ownerId)
  }

  play ({player, target}) {
    if (!target.hurtBy(this.type) && !target.protectedFrom(this.type)) {
      target.effects.addSql(this, player, target.playField.method)
      return []
    } else {
      return [this]
    }
  }
}


