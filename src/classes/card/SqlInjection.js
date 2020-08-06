import Card from '@/classes/card/Card'

export default class SqlInjection extends Card {
  constructor (deck) {
    super(0, "SQL_INJECTION", deck, Card.imgPath("sql_injection"))
  }

  play (playInfo) {
    if (!playInfo.target.hurtBy(this.type)
        && !playInfo.target.protectedFrom(this.type)) {
      if (playInfo.target.helpedBy('SCAN')) {
        this._blockedByScan(playInfo)
        this.discard()
      }
      playInfo.target.effects.addSql(
        this, playInfo.player, playInfo.target.playField.method)
    } else {
      this.discard()
    }
  }
}


