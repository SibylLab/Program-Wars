import Card from '@/classes/card/Card'

export default class SqlInjection extends Card {
  constructor (ownerId = -1) {
    super(0, "SQL_INJECTION", Card.imgPath("sql_injection"), ownerId)
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


