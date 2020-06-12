import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'


describe('PlayBestCardAction', () => {
  const getValue = (v) => { return jest.fn(() => { return v }) }

  let player, order, action
  beforeEach(() => {
    player = {id: 0}
    order = [
      "GROUP", "VARIABLE", "REPEAT", "INSTRUCTION", "ANTIVIRUS", "FIREWALL",
      "OVERCLOCK", "HACK", "VIRUS"
    ]
    action = new PlayBestCardAction(player, order) 
  }) 

  test('constructor and play order', () => {
    expect(action.playOrder["GROUP"]).toEqual(0)
    expect(action.playOrder["INSTRUCTION"]).toEqual(3)
    expect(action.playOrder["VIRUS"]).toEqual(8)
  })

  describe('handle', () => {
    const players = "players"
    const stacks = "stacks"
    const scores = "scores"

    test('with saftey card in hand', () => {
      const card = {type: "FIREWALL", value: 0, isSafety: getValue(true)}
      const hand = {cards: [card]}
      action.playSafety = getValue("play safety")

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual("play safety")
      expect(action.playSafety.mock.calls.length).toEqual(1)
      expect(action.playSafety.mock.calls[0]).toEqual([card])
    })
    test('with attack card in hand', () => {
      const card = {
        type: "VIRUS",
        value: 0,
        isSafety: getValue(false),
        isAttack: getValue(true)
      }
      const hand = {cards: [card]}
      action.playAttack = getValue("play attack")

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual("play attack")
      expect(action.playAttack.mock.calls.length).toEqual(1)
      expect(action.playAttack.mock.calls[0]).toEqual([card, players, scores])
    })
    test('with instruction card in hand', () => {
      const card = {
        type: "INSTRUCTION",
        value: 2,
        isSafety: getValue(false),
        isAttack: getValue(false)
      }
      const hand = {cards: [card]}
      action.instruction = getValue("play instruction")

      let result = action.handle(hand, players, stacks, scores)
      expect(result).toEqual("play instruction")
      expect(action.instruction.mock.calls.length).toEqual(1)
      expect(action.instruction.mock.calls[0]).toEqual([card, {hand, players, stacks, scores}])
    })
    test('card type does not have implementation', () => {
      action.playOrder.INVALID = 1000
      const card = {
        type: "INVALID",
        value: 2,
        isSafety: getValue(false),
        isAttack: getValue(false)
      }
      const hand = {cards: [card]}
      let result = action.handle(hand, players, stacks, scores)
      expect(result).toBeUndefined()
    })
    test('type not in play order', () => {
      const hand = {cards: [{type: "INVALID", value: 0}]}
      let result = action.handle(hand, players, stacks, scores)
      expect(result).toBeUndefined()
    })
  })

})
