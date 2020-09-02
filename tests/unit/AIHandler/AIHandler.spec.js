import AIHandler from '@/classes/AIHandler/AIHandler'
import Redraw from '@/classes/AIHandler/Redraw'

jest.mock('@/classes/AIHandler/Redraw')

describe('AIHandler class', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new handler', () => {
    const handler = new AIHandler('handlers')
    expect(handler.actionHandlers).toEqual('handlers')
    expect(handler.defaultAction).toBeInstanceOf(Redraw)
    expect(Redraw).toBeCalledTimes(1)
  })

  describe('testAction', () => {
    test('when the default action handles request', () => {
      const action_1 = { handle: jest.fn(() => { return undefined }) }
      const action_2 = { handle: jest.fn(() => { return undefined }) }
      const handler = new AIHandler([action_1, action_2])
      handler.defaultAction.handle = jest.fn(() => { return 'redraw handled it' })
      
      const result = handler.chooseAction('player', 'players', 'scores', 'deck')

      expect(action_1.handle).toBeCalledTimes(1)
      expect(action_1.handle).toBeCalledWith('player', 'players', 'scores', 'deck')
      expect(action_2.handle).toBeCalledTimes(1)
      expect(action_2.handle).toBeCalledWith('player', 'players', 'scores', 'deck')

      expect(handler.defaultAction.handle).toBeCalledTimes(1)
      expect(handler.defaultAction.handle).toBeCalledWith(
        'player', 'players', 'scores', 'deck')
      expect(result).toEqual('redraw handled it')
    })

    test('when a non-default action handles request', () => {
      const action_1 = { handle: jest.fn(() => { return 'handled by 1' }) }
      const action_2 = { handle: jest.fn(() => { return undefined }) }
      const handler = new AIHandler([action_1, action_2])
      
      const result = handler.chooseAction('player', 'players', 'scores', 'deck')

      expect(action_1.handle).toBeCalledTimes(1)
      expect(action_1.handle).toBeCalledWith('player', 'players', 'scores', 'deck')
      expect(action_2.handle).not.toHaveBeenCalled()

      expect(result).toEqual('handled by 1')
    })

    test('when the default action handles request after an error', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation()
      const action_1 = { handle: jest.fn(() => { throw "error!" }) }
      const handler = new AIHandler([action_1])
      handler.defaultAction.handle = jest.fn(() => { return 'redraw handled it' })
      
      const result = handler.chooseAction('player', 'players', 'scores', 'deck')

      expect(action_1.handle).toBeCalledTimes(1)
      expect(action_1.handle).toBeCalledWith('player', 'players', 'scores', 'deck')

      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith("AI handler error:", "error!")

      expect(handler.defaultAction.handle).toBeCalledTimes(1)
      expect(handler.defaultAction.handle).toBeCalledWith(
        'player', 'players', 'scores', 'deck')
      expect(result).toEqual('redraw handled it')

      logSpy.mockRestore()
    })
  })
})
