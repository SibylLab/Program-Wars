import Card from '@/classes/card/Card'

export default class SqlInjection extends Card {
  constructor (ownerId = -1) {
    super(0, "SQL_INJECTION", Card.imgPath("sql_injection"), ownerId)
  }

  play (playInfo) {
    if (!playInfo.target.hurtBy(this.type)
        && !playInfo.target.protectedFrom(this.type)) {
      if (playInfo.target.helpedBy('SCAN')) {
        return this._blockedByScan(playInfo)
      }
      playInfo.target.effects.addSql(
        this, playInfo.player, playInfo.target.playField.method)
      return []
    } else {
      return [this]
    }
  }
}


