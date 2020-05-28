import Player from '@/classes/game/Player'


describe('Player.js', () => {
  let player
  beforeEach(() => {
    player = new Player(1, 'jeff', true)
  })
  test('constructor functions properly', () => {
    expect(player.id).toEqual(1)
    expect(player.name).toEqual('jeff')
    expect(player.isAi).toBeTruthy()
  })
  test('if helped by effect true and false', () => {
    player.positiveEffects.add("BATTERYBACKUP")
    expect(player.helpedBy("BATTERYBACKUP")).toBeTruthy()
    expect(player.helpedBy("OVERCLOCK")).toBeFalsy()
  })
  test('if hurt by an effect true and false', () => {
    player.negativeEffects.add("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeTruthy()
    expect(player.hurtBy("POWEROUTAGE")).toBeFalsy()
  })
  test('is protected from hacks true and false', () => {
    expect(player.isProtectedFrom("HACK")).toBeFalsy()
    player.positiveEffects.add("FIREWALL")
    expect(player.isProtectedFrom("HACK")).toBeTruthy()
  })
  test('is protected from power outages w/ battery true and false', () => {
    expect(player.isProtectedFrom("POWEROUTAGE")).toBeFalsy()
    player.positiveEffects.add("BATTERYBACKUP")
    expect(player.isProtectedFrom("POWEROUTAGE")).toBeTruthy()
  })
  test('is protected from power outages w/ generator true and false', () => {
    expect(player.isProtectedFrom("POWEROUTAGE")).toBeFalsy()
    player.positiveEffects.add("GENERATOR")
    expect(player.isProtectedFrom("POWEROUTAGE")).toBeTruthy()
  })
  test('is protected from viruses true and false', () => {
    expect(player.isProtectedFrom("VIRUS")).toBeFalsy()
    player.positiveEffects.add("ANTIVIRUS")
    expect(player.isProtectedFrom("VIRUS")).toBeTruthy()
  })
})
