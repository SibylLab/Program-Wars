import AIPlayer from '@/classes/player/AIPlayer'
import AIHandlerFactory from '@/classes/AIHandler/AIHandlerFactory'

jest.mock('@/classes/AIHandler/AIHandlerFactory')

describe('AIPlayer class', () => {
  const action = { chooseAction: jest.fn(() => { return 'action' }) }

  AIHandlerFactory.mockImplementation(() => {
    return {
      newHandler: () => { return action }
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new AIPlayer', () => {
    const ai = new AIPlayer(0, 'ai', 'beginner')
    expect(ai.id).toEqual(0)
    expect(ai.name).toEqual('ai')
    expect(ai.isAI).toBeTruthy()

    expect(AIHandlerFactory).toBeCalledTimes(1)
    expect(ai.handler).toEqual(action)
  })

  test('get the AI players chosen play', () => {
    const ai = new AIPlayer(0, 'ai', 'standard')
    const play = ai.getPlay('players', 'scores', 'deck')
    expect(play).toEqual('action')
    expect(action.chooseAction).toBeCalledWith(ai, 'players', 'scores', 'deck')
  })
})
