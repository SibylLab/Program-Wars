import Card from '@/classes/card/Card'
import Deck from '@/classes/deck/Deck'
const uuidV1 = require('uuid/v1')

jest.mock('uuid/v1', () => jest.fn(() => { return "mocked_id" }))
jest.mock('@/classes/deck/Deck')

describe('Card class', () => {
  const mockDeck = new Deck()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new card', () => {
    const card = new Card(2, "card_type", mockDeck, "image_path")
    expect(card.value).toEqual(2)
    expect(card.type).toEqual("card_type")
    expect(card.deck).toBe(mockDeck)
    expect(card.image).toEqual("image_path")
    expect(card.id).toEqual("mocked_id")
    expect(card.isMimic).toBeFalsy()
    expect(card.isExtra).toBeFalsy()
  })

  test('getting the cards value', () => {
    const card = new Card(2, "card_type", mockDeck, "image_path")
    expect(card.getValue()).toEqual(2)
  })

  test('playing the card', () => {
    const discardSpy = jest.spyOn(Card.prototype, 'discard')
    const card = new Card(2, "card_type", mockDeck, "image_path")
    card.play({})
    expect(discardSpy).toBeCalledTimes(1)
    expect(discardSpy).toBeCalledWith()
  })

  describe('discard the card', () => {
    test('when the card is not an extra card', () => {
      const card = new Card(2, "card_type", mockDeck, "image_path")
      card.discard()
      expect(mockDeck.discard).toBeCalledTimes(1)
      expect(mockDeck.discard).toBeCalledWith(card)
    })

    test('when the card is an extra card', () => {
      const card = new Card(2, "card_type", mockDeck, "image_path")
      card.isExtra = true
      card.discard()
      expect(mockDeck.discard).not.toBeCalled()
    })
  })

  test('static function to create a card image path', () => {
    expect(Card.imgPath('SOME_TYPE')).toEqual('static/cardImages/SOME_TYPE.png')
  })

  describe('_blockedByScan', () => {
    let player, playInfo

    beforeEach(() => {
      player = { effects: { removePositiveType: jest.fn() } }
      playInfo = {
        scanned: false,
        stack: { player: player },
        target: player
      }
    })

    test('when card is Virus', () => {
      const card = new Card(0, "VIRUS", mockDeck, "image_path")
      card._blockedByScan(playInfo)
      expect(playInfo.scanned).toBeTruthy()
      expect(playInfo.stack.player.effects.removePositiveType).toBeCalledTimes(1)
      expect(playInfo.stack.player.effects.removePositiveType).toBeCalledWith('SCAN')
      
    })

    test('when card is any other attack', () => {
      const card = new Card(0, "TROJAN", mockDeck, "image_path")
      card._blockedByScan(playInfo)
      expect(playInfo.scanned).toBeTruthy()
      expect(playInfo.target.effects.removePositiveType).toBeCalledTimes(1)
      expect(playInfo.target.effects.removePositiveType).toBeCalledWith('SCAN')
    })

    test('when card is not an attack', () => {
      const card = new Card(0, "METHOD", mockDeck, "image_path")
      card._blockedByScan(playInfo)
      expect(playInfo.scanned).toBeFalsy()
    })
  })
})
