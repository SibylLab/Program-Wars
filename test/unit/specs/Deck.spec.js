import Vue from 'vue'
import Card from 'src/components/Card'
import Deck from '../../../src/classes/Deck'

describe('Deck.js', () => {
  // test initial cards array length
  it('test if the initial cards array is empty', () => {
    let testDeck = new Deck()
    expect(testDeck.cards.length).to.equal(0)
  })
  // test initial discard_cards array length
  it('test if the initial discard_cards array is empty', () => {
    let testDeck = new Deck()
    expect(testDeck.discard_cards.length).to.equal(0)
  })
})
