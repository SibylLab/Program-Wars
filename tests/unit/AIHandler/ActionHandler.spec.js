import ActionHandler from '@/classes/AIHandler/ActionHandler'

describe('ActionHandler class', () => {
  test('that handle returns undefined', () => {
    const action = new ActionHandler()
    expect(action.handle('player', 'players', 'scores', 'deck')).toBeUndefined()
  })
})
