import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import { nextTick } from 'vue'
import EffectNotifications from '@/components/shared/EffectNotifications'
import { bus } from '@/components/shared/Bus'

describe('EffectNotifications', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  test('shows and hides collision animation for blocked attacks', async () => {
    const store = createStore({
      state: {},
      getters: {
        game: () => ({})
      }
    })

    const wrapper = mount(EffectNotifications, {
      global: { plugins: [store] }
    })

    bus.emit('attack-blocked', {
      defenseImage: 'static/cardImages/model/orm.png',
      attackImage: 'static/cardImages/attack/sql_injection.png',
      message: 'ORM vs SQL Injection'
    })

    await nextTick()

    expect(wrapper.find('#collision-notification').exists()).toBe(true)
    expect(wrapper.text()).toContain('ORM vs SQL Injection')

    jest.advanceTimersByTime(7500)
    await nextTick()

    expect(wrapper.find('#collision-notification').exists()).toBe(false)
  })
})
