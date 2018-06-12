import Vue from 'vue'
import Card from 'src/components/SharedComponents/Card'
import CardObj from '../../../src/classes/Card'

function getCssString (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({propsData}).$mount()
  return vm.cardCss
}

function getTitle (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.title
}

function getCardType (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.cardType
}
function getCardValue (Component, propsData) {
  const Ctor = Vue.extend(Component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.cardValue
}

describe('Card.vue', () => {
    // test if name is there
  it('check if name property of component is present', () => {
    expect(Card.name).to.equal('Card')
  })
    // test to see if props are there
  it('check if props are there', () => {
    expect(Card.props[0]).to.equal('cardData')
    expect(Card.props[1]).to.equal('inStack')
  })
  // test to see if data is there
  it('test if data field is there', () => {
    expect(typeof Card.data).to.be.equal('function')
  })
  // tests to see if fields in data section are populating correctly on instantiation

  // first test is for msg field
  it('test to see if data field msg field is populated correctly', () => {
    const defaultData = Card.data()
    expect(defaultData.msg).to.equal('Programming Wars')
  })
  // next test the valueCss
  it('test to see if data field valueCSS is set properly initially', () => {
    const defaultData = Card.data()
    expect(defaultData.valueCss).to.equal('value')
  })
  // test typeCss field
  it('test to see if data field typeCss is set properly initially', () => {
    const defaultData = Card.data()
    expect(defaultData.typeCss).to.equal('type')
  })
  // test if computed field exists
  it('test to see if computed field exists', () => {
    expect(typeof Card.computed).to.equal('object')
  })
  // test if css string is set without selected property
  it('test computed property function cardCss()', () => {
    let testCard = new CardObj(0, 0, 'I')
    expect(getCssString(Card, { cardData: testCard })).to.equal('card')
  })
  // test if cssString is set with selected property
  it('test cssString on card selected', () => {
    let testCard = new CardObj(0, 0, 'I')
    testCard.selected = true
    expect(getCssString(Card, { cardData: testCard })).to.equal('card selected')
  })
  // testing the inStack property
  it('testing if the inStack property is set then the cssString should change', () => {
    let stackVar = true
    let testCard = new CardObj(0, 0, 'I')
    expect(getCssString(Card, { inStack: stackVar, cardData: testCard })).to.equal('card stack')
  })
  // testing title() function
  it('testing if the title is set appropriately', () => {
    let testCard = new CardObj(0, 0, 'I')
    expect(getTitle(Card, { cardData: testCard })).to.equal('Card')
  })
  // testing cardType function with various types
  it('testing cardType function with I', () => {
    let testCard = new CardObj(0, 0, 'I')
    expect(getCardType(Card, { cardData: testCard })).to.equal('I')
  })
  // testing cardType with Rx
  it('testing cardType function with Rx', () => {
    let testCard = new CardObj(0, 1, 'R')
    expect(getCardType(Card, { cardData: testCard })).to.equal('Rx')
  })
  // testing cardValue with Rx
  it('testing cardValue function with Rx', () => {
    let testCard = new CardObj(0, 1, 'R')
    expect(getCardValue(Card, { cardData: testCard })).to.equal('_')
  })
  // testing cardValue with any other value
  it('testing cardValue function with anything else', () => {
    let testCard = new CardObj(0, 1, 'I')
    expect(getCardValue(Card, { cardData: testCard })).to.equal(1)
  })

  it('testing flipFace function', () => {
    let testCard = new CardObj(0, 1, 'I')
    testCard.flipCardFace()
    expect(testCard.showFace).to.equal(true)
  })
})
