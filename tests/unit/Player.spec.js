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
    expect(player.helpedBy("FIREWALL")).toBeTruthy()
    expect(player.helpedBy("SCAN")).toBeTruthy()
  })
  test('if hurt by an effect true and false', () => {
    expect(player.hurtBy("RANSOM")).toBeFalsy()
    player.addNegative("RANSOM")
    expect(player.hurtBy("RANSOM")).toBeTruthy()
  })
  test('is protected from tojan by firewall', () => {
    expect(player.isProtectedFrom("TROJAN")).toBeFalsy()
    player.addPositive("FIREWALL")
    expect(player.isProtectedFrom("TROJAN")).toBeTruthy()
  })
  test('is protected from ransom by firewall', () => {
    expect(player.isProtectedFrom("RANSOM")).toBeFalsy()
    player.addPositive("FIREWALL")
    expect(player.isProtectedFrom("RANSOM")).toBeTruthy()
  })
  test('is protected from everything by antivirus', () => {
    expect(player.isProtectedFrom("VIRUS")).toBeFalsy()
    player.addPositive("ANTIVIRUS")
    expect(player.isProtectedFrom("VIRUS")).toBeTruthy()
    expect(player.isProtectedFrom("SPYWARE")).toBeTruthy()
    expect(player.isProtectedFrom("RANSOM")).toBeTruthy()
    expect(player.isProtectedFrom("TROJAN")).toBeTruthy()
  })
  test('adding antivirus removes all malware and scan', () => {
    player.addNegative("RANSOM")
    player.addNegative("SPYWARE")
    player.addPositive("SCAN")
    player.addPositive("ANTIVIRUS")
    expect(player.helpedBy("ANTIVIRUS")).toBeTruthy()
    expect(player.hurtBy("RANSOM")).toBeFalsy()
    expect(player.hurtBy("SPYWARE")).toBeFalsy()
    expect(player.positiveEffects.find(e =>  e.type === "SCAN")).toBeUndefined()
  })
  test('adding antivirus removes firewall', () => {
    player.addPositive("FIREWALL")
    player.addPositive("ANTIVIRUS")
    expect(player.helpedBy("ANTIVIRUS")).toBeTruthy()
    expect(player.positiveEffects.find(e => e.type === "OVERCLOCK")).toBeUndefined()
  })
  test('adding firewall removes ransom', () => {
    player.addNegative("RANSOM")
    player.addPositive("FIREWALL")
    expect(player.helpedBy("FIREWALL")).toBeTruthy()
    expect(player.hurtBy("RANSOM")).toBeFalsy()
  })
  test('adding malware removes scan and does not add malware', () => {
    player.addPositive("SCAN")
    player.addNegative("RANSOM")
    expect(player.hurtBy("RANSOM")).toBeFalsy()
    expect(player.helpedBy("SCAN")).toBeFalsy()
  })
})
