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
  test('if helped by antivirus true and false', () => {
    player.addPositive("ANTIVIRUS")
    expect(player.helpedBy("ANTIVIRUS")).toBeTruthy()
    expect(player.helpedBy("OVERCLOCK")).toBeTruthy()
    expect(player.helpedBy("FIREWALL")).toBeFalsy()
  })
  test('if hurt by an effect true and false', () => {
    expect(player.hurtBy("VIRUS")).toBeFalsy()
    player.addNegative("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeTruthy()
  })
  test('is protected from hack true and false', () => {
    expect(player.isProtectedFrom("HACK")).toBeFalsy()
    player.addPositive("FIREWALL")
    expect(player.isProtectedFrom("HACK")).toBeTruthy()
  })
  test('is protected from virus true and false', () => {
    expect(player.isProtectedFrom("VIRUS")).toBeFalsy()
    player.addPositive("ANTIVIRUS")
    expect(player.isProtectedFrom("VIRUS")).toBeTruthy()
  })
  test('is not protected from other effect', () => {
    expect(player.isProtectedFrom("BOGUSEFFECT")).toBeFalsy()
  })
  test('adding overclock removes virus and does not add overclock', () => {
    player.addNegative("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeTruthy()
    player.addPositive("OVERCLOCK")
    expect(player.hurtBy("VIRUS")).toBeFalsy()
    expect(player.helpedBy("OVERCLOCK")).toBeFalsy()
  })
  test('adding antivirus removes virus and keeps antivurus', () => {
    player.addNegative("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeTruthy()
    player.addPositive("ANTIVIRUS")
    expect(player.hurtBy("VIRUS")).toBeFalsy()
    expect(player.helpedBy("ANTIVIRUS")).toBeTruthy()
  })
  test('adding antivirus removes redundant overclock', () => {
    player.addPositive("OVERCLOCK")
    expect(player.helpedBy("OVERCLOCK")).toBeTruthy()
    player.addPositive("ANTIVIRUS")
    expect(player.helpedBy("ANTIVIRUS")).toBeTruthy()
    expect(player.helpedBy("OVERCLOCK")).toBeTruthy()
    expect(player.positiveEffects.has("OVERCLOCK")).toBeFalsy()
  })
  test('adding virus removes overclock and does not add virus', () => {
    player.addPositive("OVERCLOCK")
    expect(player.helpedBy("OVERCLOCK")).toBeTruthy()
    player.addNegative("VIRUS")
    expect(player.hurtBy("VIRUS")).toBeFalsy()
    expect(player.helpedBy("OVERCLOCK")).toBeFalsy()
  })
})
