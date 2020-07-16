import AiHandler from '@/classes/ai/AiHandler'

function mockValue (v) { return jest.fn(() => { return v }) }


describe('AiHandler data object', () => {
  const player = {name: 'ted'}
  const handlers = []
  const testParams = ["hand", "players", "stacks", "method", "scores"]

  test('constructor functions properly', () => {
    let aiHandler = new AiHandler(player, handlers)
    expect(aiHandler.player).toEqual(player)
    expect(aiHandler.actionHandlers).toEqual(handlers)
    expect(aiHandler.defaultAction.player).toEqual(player)
  })
  test('chooseAction defaultAction called', () => {
    let aiHandler = new AiHandler(player, handlers)
    let mockAction = jest.fn(() => { return "default" })
    aiHandler.defaultAction.handle = mockAction

    let move = aiHandler.chooseAction(...testParams)
    expect(move).toEqual("default")
    expect(mockAction.mock.calls.length).toEqual(1)
    expect(mockAction.mock.calls[0]).toEqual(testParams)
  })
  test('chooseAction defaultAction called because of error', () => {
    let handlerError = { handle: jest.fn(() => { throw "action failed" }) }
    let aiHandler = new AiHandler(player, [handlerError])
    let mockAction = jest.fn(() => { return "default" })
    aiHandler.defaultAction.handle = mockAction

    let move = aiHandler.chooseAction(...testParams)
    expect(move).toEqual("default")
    expect(mockAction.mock.calls.length).toEqual(1)
    expect(mockAction.mock.calls[0]).toEqual(testParams)
  })
  test('chooseAction second action handles the request', () => {
    let first = { handle: mockValue(undefined) }
    let result = {card: {isSpecial: mockValue(true)}}
    let second = { handle: mockValue(result) }
    let actions = [first, second]

    let aiHandler = new AiHandler(player, actions)
    let mockAction = jest.fn(() => { return "default" })
    aiHandler.defaultAction.handle = mockAction

    let move = aiHandler.chooseAction(...testParams)
    expect(move).toEqual(result)
    expect(first.handle.mock.calls.length).toEqual(1)
    expect(first.handle.mock.calls[0]).toEqual(testParams)
    expect(second.handle.mock.calls.length).toEqual(1)
    expect(second.handle.mock.calls[0]).toEqual(testParams)
    expect(mockAction.mock.calls.length).toEqual(0)
  })
})
