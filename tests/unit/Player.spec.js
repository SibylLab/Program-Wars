import Player from '@/classes/Models/Player'

let player = new Player(1, 'jeff')

describe('Player.js', () => {
  test('constructor functions properly', () => {
    expect(player.id).toEqual(1)
    expect(player.name).toEqual('jeff')
  })
  test('hasPositive', () => {
    player.positiveEffects.push("BATTERYBACKUP")
    expect(player.hasPositive("BATTERYBACKUP")).toBeTruthy()
    expect(player.hasPositive("OVERCLOCK")).toBeFalsy()
  })
  test('hasNegative', () => {
    player.negativeEffects.push("VIRUS")
    expect(player.hasNegative("VIRUS")).toBeTruthy()
    expect(player.hasNegative("POWEROUTAGE")).toBeFalsy()
  })
})
