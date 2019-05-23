/**
 * PlayerInfoPanel Unit Tests
 * By: Austin Ball on: 21/05/19
 */

import PlayerInfoPanel from '../../../src/components/MainGame/PlayerInfoPanel.vue'

describe('PlayerInfoPanel.js', () => {
  it('has a created hook', () => {
    expect(typeof PlayerInfoPanel.created).to.equal('function')
  })

  it('sets the correct default data', () => {
    expect(typeof PlayerInfoPanel.data).to.equal('function')
    const defaultData = PlayerInfoPanel.data()
    expect(defaultData.title).to.equal('Player Info Panel')
    expect(defaultData.idCounter).to.equal(6)
    expect(defaultData.modalText).to.equal('')
    // expect(defaultData.modalCards).to.equal([])
    expect(defaultData.tipsToggle).to.equal(true)
    expect(defaultData.tipsCardSelected).to.equal('Did you know?')
    expect(defaultData.tipsInfoText).to.equal('You can toggle on or off this information window by checking the "FUN FACTS" box in the top right corner. ' +
    'You can also turn off the tutorials but keep the fun facts by checking the "TUTORIAL" box.')
  })
})
