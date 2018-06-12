import Player from '../../../src/classes/Player'

let testPlayer = new Player(1, 'jeff', undefined, 0, 0, true)

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
    expect(testPlayer.trueScore).to.equal(0)
  })

  it('test the Player constructor false score', () => {
    expect(testPlayer.falseScore).to.equal(0)
  })

  it('test the Player constructor usedBonusCards', () => {
    expect(testPlayer.usedBonusCards).to.equal(undefined)
  })

  it('test the Player constructor attackedCards', () => {
    expect(testPlayer.attackedCards).to.equal(undefined)
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

  it('test the Player constructor hasPowerOutage', () => {
    expect(testPlayer.hasPowerOutage).to.equal(false)
  })

  it('test the Player constructor ', () => {
    expect(testPlayer.).to.equal(false)
  })

  it('test the Player constructor ', () => {
    expect(testPlayer.).to.equal(false)
  })
})
