import Player from '../../../src/classes/Player'

let testPlayer = new Player(1, 'jeff', undefined, 0, 0)

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
})
