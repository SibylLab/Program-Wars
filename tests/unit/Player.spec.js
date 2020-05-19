import Player from '@/classes/Models/Player'

let testPlayer = new Player(1, 'jeff', undefined, 0, true)
let testPlayer2 = new Player(2, 'jose', undefined, 0, false)

describe('Player.js', () => {
  it('test the Player constructor id', () => {
    expect(testPlayer.id).toEqual(1)
  })

  it('test the Player constructor name', () => {
    expect(testPlayer.name).toEqual('jeff')
  })

  it('test the Player constructor hand', () => {
    expect(testPlayer.hand).toEqual(undefined)
  })

  it('test the Player constructor true score', () => {
    expect(testPlayer.instructions).toEqual(0)
  })

  it('test the Player constructor usedBonusCards', () => {
    expect(Array.isArray(testPlayer.usedBonusCards)).toEqual(true)
  })

  it('test the Player constructor attackedCards', () => {
    expect(Array.isArray(testPlayer.attackedCards)).toEqual(true)
  })

  it('test the Player constructor hasGenerator', () => {
    expect(testPlayer.hasGenerator).toEqual(false)
  })

  it('test the Player constructor hasFirewall', () => {
    expect(testPlayer.hasFirewall).toEqual(false)
  })

  it('test the Player constructor hasAntiVirus', () => {
    expect(testPlayer.hasAntiVirus).toEqual(false)
  })

  it('test the Player constructor isAi', () => {
    expect(testPlayer.isAi).toEqual(true)
  })
  it('test the Player2 constructor isAi', () => {
    expect(testPlayer2.isAi).toEqual(false)
  })

  it('test the Player constructor hasPowerOutage', () => {
    expect(testPlayer.hasPowerOutage).toEqual(false)
  })

  it('test the Player constructor hasOverclock', () => {
    expect(testPlayer.hasOverclock).toEqual(false)
  })

  it('test the Player constructor hasVirus', () => {
    expect(testPlayer.hasVirus).toEqual(false)
  })

  it('test the Player constructor hasHadOverclock', () => {
    expect(testPlayer.hasOverclock).toEqual(false)
  })

  it('test the Player constructor hasPlayedInstruction', () => {
    expect(testPlayer.hasPlayedInstruction).toEqual(false)
  })

  it('test the Player constructor instructionBonus', () => {
    expect(testPlayer.instructionBonus).toEqual(0)
  })

  it('test the Player constructor completionBonus', () => {
    expect(testPlayer.completionBonus).toEqual(0)
  })

  it('test the Player constructor virusBonus', () => {
    expect(testPlayer.virusBonus).toEqual(0)
  })

  it('test the Player constructor protectionCardsBonus', () => {
    expect(testPlayer.protectionCardsBonus).toEqual(0)
  })

  it('test the Player constructor overClockBonus', () => {
    expect(testPlayer.overClockBonus).toEqual(0)
  })

  it('test the Player constructor defensiveBonus', () => {
    expect(testPlayer.defensiveBonus).toEqual(0)
  })

  it('test the Player constructor groupingBonus', () => {
    expect(testPlayer.groupingBonus).toEqual(0)
  })

  it('test the Player constructor repetitionBonus', () => {
    expect(testPlayer.repetitionBonus).toEqual(0)
  })

  it('test the Player constructor variablesBonus', () => {
    expect(testPlayer.variablesBonus).toEqual(0)
  })

  it('test the Player constructor overclockIncrease', () => {
    expect(testPlayer.overclockIncrease).toEqual(0)
  })

  it('test the Player constructor bonus', () => {
    expect(testPlayer.bonus).toEqual(0)
  })

  it('test the Player constructor isDefensive', () => {
    expect(testPlayer.isDefensive).toEqual(false)
  })

  it('test the Player constructor isCleanSystem', () => {
    expect(testPlayer.isCleanSystem).toEqual(true)
  })

  it('test the Player updateBonus', () => {
    testPlayer.updateBonus(5)
    expect(testPlayer.bonus).toEqual(5)
  })
})
