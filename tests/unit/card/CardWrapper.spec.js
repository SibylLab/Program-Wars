import CardWrapper from '@/classes/card/CardWrapper'
import Card from '@/classes/card/Card'

jest.mock('@/classes/card/Card')

describe('CardWrapper class', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('creating a new card wrapper', () => {
    const card = { value: 2, type: 'some_type', deck: 'deck', image: 'img_path' }
    const wrapper = new CardWrapper(card)
    expect(wrapper.card).toBe(card)
    expect(Card).toBeCalledTimes(1)
    expect(Card).toBeCalledWith(card.value, card.type, card.deck, card.image)

  })

  test('discarding the card', () => {
    const mockCard = new Card()
    const wrapper = new CardWrapper(mockCard)
    wrapper.discard()
    expect(mockCard.discard).toBeCalledTimes(1)
  })

  test('discarding the card', () => {
    const mockCard = new Card()
    const wrapper = new CardWrapper(mockCard)
    wrapper.play('play_info')
    expect(mockCard.play).toBeCalledTimes(1)
    expect(mockCard.play).toBeCalledWith('play_info')
  })

})
