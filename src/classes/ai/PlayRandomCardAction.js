import PlayBestCardAction from '@/classes/ai/PlayBestCardAction'

export default class PlayRandomCardAction extends PlayBestCardAction {
  constructor () {
    super([])
  }

  // changs sort hand to shuffle the hand instead
  // since we loop through the cards in the hand this will make the play attemps
  // random
  sortHand (hand) {
    for (let i = hand.cards.length; i; i--) {
      const j = Math.floor(Math.random() * i);
      [hand.cards[i - 1], hand.cards[j]] = [hand.cards[j], hand.cards[i - 1]]
    }
    return hand.cards
  }

  isValidCard (card) {
    return card !== undefined
  }
}
