import Player from '@/classes/Models/Player'

let player = new Player(1, 'jeff', true)

describe('Player.js', () => {
  test('constructor functions properly', () => {
    expect(player.id).toEqual(1)
    expect(player.name).toEqual('jeff')
    expect(player.isAi).toBeTruthy()
  })
  test('hasPositive', () => {
    player.positiveEffects.add("BATTERYBACKUP")
    expect(player.helpedBy("BATTERYBACKUP")).toBeTruthy()
    expect(player.helpedBy("OVERCLOCK")).toBeFalsy()
  })
  test('hasNegative', () => {
    player.negativeEffects.add("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeTruthy()
    expect(player.hurtBy("POWEROUTAGE")).toBeFalsy()
  })
})
