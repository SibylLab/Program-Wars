import BeginnerGame from '@/pages/pageStates/BeginnerGame'

function makePlayer (id, score = 0) {
  return {
    id,
    name: `Player ${id + 1}`,
    getScore: jest.fn(() => score),
    update: jest.fn()
  }
}

function makeGame ({ scores, turnHistory, players }) {
  const game = Object.create(BeginnerGame.prototype)
  game.players = players
  game.turnHistory = turnHistory
  game.scoreLimit = 25
  game.currentCard = null
  game.scores = scores
  game.currentPlayer = jest.fn(() => players[0])
  game.getScores = jest.fn(() => scores)
  game.getPlayer = jest.fn(id => players[id])
  game.getPlayerScore = jest.fn(id => scores[id])
  game.highestScoringPlayers = BeginnerGame.prototype.highestScoringPlayers
  return game
}

describe('BeginnerGame victory requirements', () => {
  test('tracks required component and defensive cards from turn history', () => {
    const players = [makePlayer(0, 27)]
    const game = makeGame({
      players,
      scores: [27],
      turnHistory: [
        { player: players[0], card: { type: 'MODEL' } },
        { player: players[0], card: { type: 'MODEL' } },
        { player: players[0], card: { type: 'VIEW' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'INTERFACE' } },
        { player: players[0], card: { type: 'LOGGER' } },
        { player: players[0], card: { type: 'INHERITANCE' } },
      ]
    })

    expect(game.getRequirementProgress(0)).toMatchObject({
      score: 27,
      model: 2,
      view: 1,
      controller: 5,
      defensive: 2,
      ready: false
    })
  })

  test('only ends the game when a player meets both score and card requirements', () => {
    const players = [makePlayer(0, 25)]
    const game = makeGame({
      players,
      scores: [25],
      turnHistory: [
        { player: players[0], card: { type: 'MODEL' } },
        { player: players[0], card: { type: 'MODEL' } },
        { player: players[0], card: { type: 'VIEW' } },
        { player: players[0], card: { type: 'CONTROLLER' } },
        { player: players[0], card: { type: 'INTERFACE' } }
      ]
    })

    game.update()

    expect(game.isOver).toBe(false)
    expect(players[0].update).toHaveBeenCalledTimes(1)
  })

  test('declares the highest-scoring qualified player as the winner', () => {
    const players = [makePlayer(0, 28), makePlayer(1, 30)]
    const turnHistory = [
      { player: players[0], card: { type: 'MODEL' } },
      { player: players[0], card: { type: 'MODEL' } },
      { player: players[0], card: { type: 'MODEL' } },
      { player: players[0], card: { type: 'MODEL' } },
      { player: players[0], card: { type: 'VIEW' } },
      { player: players[0], card: { type: 'VIEW' } },
      { player: players[0], card: { type: 'CONTROLLER' } },
      { player: players[0], card: { type: 'CONTROLLER' } },
      { player: players[0], card: { type: 'CONTROLLER' } },
      { player: players[0], card: { type: 'CONTROLLER' } },
      { player: players[0], card: { type: 'CONTROLLER' } },
      { player: players[0], card: { type: 'INTERFACE' } },
      { player: players[0], card: { type: 'GIT' } },
      { player: players[1], card: { type: 'MODEL' } },
      { player: players[1], card: { type: 'MODEL' } },
      { player: players[1], card: { type: 'MODEL' } },
      { player: players[1], card: { type: 'MODEL' } },
      { player: players[1], card: { type: 'VIEW' } },
      { player: players[1], card: { type: 'VIEW' } },
      { player: players[1], card: { type: 'CONTROLLER' } },
      { player: players[1], card: { type: 'CONTROLLER' } },
      { player: players[1], card: { type: 'CONTROLLER' } },
      { player: players[1], card: { type: 'CONTROLLER' } },
      { player: players[1], card: { type: 'CONTROLLER' } },
      { player: players[1], card: { type: 'POLYMORPHISM' } },
      { player: players[1], card: { type: 'LOGGER' } }
    ]
    const game = makeGame({
      players,
      scores: [28, 30],
      turnHistory
    })

    expect(game.getWinners()).toEqual([players[1]])
  })
})