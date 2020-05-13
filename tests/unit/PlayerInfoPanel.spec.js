/**
 * PlayerInfoPanel Unit Tests
 * By: Austin Ball on: 21/05/19
 */

import PlayerInfoPanel from '@/components/MainGame/PlayerInfoPanel.vue'

describe('PlayerInfoPanel.js', () => {
  it('has a created hook', () => {
    expect(typeof PlayerInfoPanel.created).toEqual('function')
  })

  it('sets the correct default data', () => {
    expect(typeof PlayerInfoPanel.data).toEqual('function')
    const defaultData = PlayerInfoPanel.data()
    expect(defaultData.title).toEqual('Player Info Panel')
    expect(defaultData.idCounter).toEqual(6)
    expect(defaultData.modalText).toEqual('')
    // expect(defaultData.modalCards).toEqual([])
    expect(defaultData.tipsToggle).toEqual(true)
    expect(defaultData.tipsCardSelected).toEqual('Did you know?')
    expect(defaultData.tipsInfoText).toEqual('You can toggle on or off this information window by checking the "FUN FACTS" box in the top right corner. ' +
    'You can also turn off the tutorials but keep the fun facts by checking the "TUTORIAL" box.')
  })
})
