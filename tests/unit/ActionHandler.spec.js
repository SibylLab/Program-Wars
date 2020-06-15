import ActionHandler from '@/classes/ai/ActionHandler'


describe('ActionHandler abstract class', () => {
  const player = {id: 0}
  const actionHandler = new ActionHandler(player)
  const testParams = ["hand", "players", "stacks", "scores"]

  test('constructor functions properly', () => {
    expect(actionHandler.player).toEqual(player)
  })
  test('handle returns undefined', () => {
    let move = actionHandler.handle(...testParams)
    expect(move).toBeUndefined()
  })
})
