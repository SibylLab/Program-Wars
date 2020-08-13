import Player from '@/classes/player/Player'
import Hand from '@/classes/player/Hand'
import PlayField from '@/classes/stack/PlayField'
import StatusEffects from '@/classes/statusEffect/StatusEffects'

jest.mock('@/classes/player/Hand')
jest.mock('@/classes/statusEffect/StatusEffects')
jest.mock('@/classes/stack/PlayField')

describe('Player class', () => {
  beforeEach(() => {
    Hand.mockClear()
    PlayField.mockClear()
    StatusEffects.mockClear()
  })

  test('creating a new Player', () => {
    const player = new Player(0, 'test')
    expect(player.id).toEqual(0)
    expect(player.name).toEqual('test')
    expect(player.isAI).toBeFalsy()

    expect(Hand).toBeCalledTimes(1)
    expect(Hand).toBeCalledWith(0)
    expect(PlayField).toBeCalledTimes(1)
    expect(PlayField).toBeCalledWith(player)
    expect(StatusEffects).toBeCalledTimes(1)
    expect(StatusEffects).toBeCalledWith(player)
    expect(player.image).toEqual('static/playerImages/player0.png')
  })

  test('updating the player', () => {
    const player = new Player(0, 'test')
    player.update()
    const effects = StatusEffects.mock.instances[0]
    expect(effects.update).toBeCalledTimes(1)
  })

  test('getting the players score', () => {
    PlayField.mockImplementationOnce(() => {
      return { getScore: () => { return 20 } }
    })
    StatusEffects.mockImplementationOnce(() => {
      return { getScoreAdjustment: () => { return -5 } }
    })

    const player = new Player(0, 'test')
    expect(player.getScore()).toEqual(15)
  })

  describe('checking for effect types', () => {
    test('is helped by', () => {
      const player = new Player(0, 'test')
      const type = 'SCAN'
      expect(player.helpedBy(type)).toBeFalsy()
      const effects = StatusEffects.mock.instances[0]
      expect(effects.hasPositive).toHaveBeenCalledWith(type)
    })

    test('is hurt by', () => {
      const player = new Player(0, 'test')
      const type = 'RANSOM'
      expect(player.hurtBy(type)).toBeFalsy()
      const effects = StatusEffects.mock.instances[0]
      expect(effects.hasNegative).toHaveBeenCalledWith(type)

    })

    test('is protected from', () => {
      const player = new Player(0, 'test')
      const type = 'RANSOM'
      expect(player.protectedFrom(type)).toBeFalsy()
      const effects = StatusEffects.mock.instances[0]
      expect(effects.hasProtectionFrom).toHaveBeenCalledWith(type)
    })
  })

  test('getting all attacks', () => {
    StatusEffects.mockImplementationOnce(() => {
      return {
        negative: [{type: 'RANSOM'}, {type: 'REDRAW_CD'}]
      }
    })
    Hand.mockImplementationOnce(() => {
      return { getMimics: () => [] }
    })
    PlayField.mockImplementationOnce(() => {
      return { getStacksWithVirus: () => [] }
    })

    const player = new Player(0, 'test')
    const attacks = player.getAllAttacks()

    // We do this instead of tracking call to ensure the return object has
    // the correct structure
    expect(attacks).toEqual({
      effects: [{type: 'RANSOM'}], virusStacks: [], mimics: []
    })
  })

  describe('canPlay', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('with safety card types', () => {
      const player = new Player(0, 'test')
      expect(player.canPlay('SCAN')).toBeTruthy()
      expect(player.canPlay('ANTIVIRUS')).toBeTruthy()
      expect(player.canPlay('FIREWALL')).toBeTruthy()
    })

    test('with attack card types', () => {
      const spyHurtBy = jest.spyOn(Player.prototype, 'hurtBy')

      const player = new Player(0, 'test')
      player.canPlay('RANSOM')
      player.canPlay('SPYWARE')
      player.canPlay('TROJAN')
      player.canPlay('VIRUS')

      player.canPlay('STACK_OVERFLOW')
      player.canPlay('STACK_UNDERFLOW')
      player.canPlay('DDOS')
      player.canPlay('SQL_INJECTION')

      expect(spyHurtBy).toBeCalledTimes(8)
      expect(spyHurtBy).toBeCalledWith('STACK_UNDERFLOW')
    })

    test('with algorithm card types', () => {
      const spyHurtBy = jest.spyOn(Player.prototype, 'hurtBy')

      const player = new Player(0, 'test')
      player.canPlay('SEARCH')
      player.canPlay('SORT')

      expect(spyHurtBy).toBeCalledTimes(2)
      expect(spyHurtBy).toBeCalledWith('STACK_UNDERFLOW')
    })

    test('with non-special card types', () => {
      const spyHurtBy = jest.spyOn(Player.prototype, 'hurtBy')

      const player = new Player(0, 'test')
      player.canPlay('INSTRUCTION')
      player.canPlay('METHOD')
      player.canPlay('REPEAT')
      player.canPlay('VARIABLE')

      expect(spyHurtBy).toBeCalledTimes(4)
      expect(spyHurtBy).toBeCalledWith('STACK_OVERFLOW')
    })
  })
})
