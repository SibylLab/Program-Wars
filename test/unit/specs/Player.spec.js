import Player from '../../../src/classes/Models/Player'

let testPlayer = new Player(1, 'jeff', undefined, 0, true)
let testPlayer2 = new Player(2, 'jose', undefined, 0, false)

describe('Player.js', () => {
  it('test the Player constructor id', () => {
    expect(testPlayer.id).to.equal(1)
  })

  it('test the Player constructor name', () => {
    expect(testPlayer.name).to.equal('jeff')
  })

  it('test the Player constructor hand', () => {
    expect(testPlayer.hand).to.equal(undefined)
  })

  it('test the Player constructor true score', () => {
    expect(testPlayer.instructions).to.equal(0)
  })

  it('test the Player constructor usedBonusCards', () => {
    expect(Array.isArray(testPlayer.usedBonusCards)).to.equal(true)
  })

  it('test the Player constructor attackedCards', () => {
    expect(Array.isArray(testPlayer.attackedCards)).to.equal(true)
  })

  it('test the Player constructor hasGenerator', () => {
    expect(testPlayer.hasGenerator).to.equal(false)
  })

  it('test the Player constructor hasFirewall', () => {
    expect(testPlayer.hasFirewall).to.equal(false)
  })

  it('test the Player constructor hasAntiVirus', () => {
    expect(testPlayer.hasAntiVirus).to.equal(false)
  })

  it('test the Player constructor isAi', () => {
    expect(testPlayer.isAi).to.equal(true)
  })
  it('test the Player2 constructor isAi', () => {
    expect(testPlayer2.isAi).to.equal(false)
  })

  it('test the Player constructor hasPowerOutage', () => {
    expect(testPlayer.hasPowerOutage).to.equal(false)
  })

  it('test the Player constructor hasOverclock', () => {
    expect(testPlayer.hasOverclock).to.equal(false)
  })

  it('test the Player constructor hasVirus', () => {
    expect(testPlayer.hasVirus).to.equal(false)
  })

  it('test the Player constructor hasHadOverclock', () => {
    expect(testPlayer.hasOverclock).to.equal(false)
  })

  it('test the Player constructor hasPlayedInstruction', () => {
    expect(testPlayer.hasPlayedInstruction).to.equal(false)
  })

  it('test the Player constructor instructionBonus', () => {
    expect(testPlayer.instructionBonus).to.equal(0)
  })

  it('test the Player constructor completionBonus', () => {
    expect(testPlayer.completionBonus).to.equal(0)
  })

  it('test the Player constructor virusBonus', () => {
    expect(testPlayer.virusBonus).to.equal(0)
  })

  it('test the Player constructor protectionCardsBonus', () => {
    expect(testPlayer.protectionCardsBonus).to.equal(0)
  })

  it('test the Player constructor overClockBonus', () => {
    expect(testPlayer.overClockBonus).to.equal(0)
  })

  it('test the Player constructor defensiveBonus', () => {
    expect(testPlayer.defensiveBonus).to.equal(0)
  })

  it('test the Player constructor groupingBonus', () => {
    expect(testPlayer.groupingBonus).to.equal(0)
  })

  it('test the Player constructor repetitionBonus', () => {
    expect(testPlayer.repetitionBonus).to.equal(0)
  })

  it('test the Player constructor variablesBonus', () => {
    expect(testPlayer.variablesBonus).to.equal(0)
  })

  it('test the Player constructor overclockIncrease', () => {
    expect(testPlayer.overclockIncrease).to.equal(0)
  })

  it('test the Player constructor bonus', () => {
    expect(testPlayer.bonus).to.equal(0)
  })

  it('test the Player constructor isDefensive', () => {
    expect(testPlayer.isDefensive).to.equal(false)
  })

  it('test the Player constructor isCleanSystem', () => {
    expect(testPlayer.isCleanSystem).to.equal(true)
  })

  it('test the Player updateBonus', () => {
    testPlayer.updateBonus(5)
    expect(testPlayer.bonus).to.equal(5)
  })
})
