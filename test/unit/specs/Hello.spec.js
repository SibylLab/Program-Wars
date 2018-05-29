import Vue from 'vue'
import Hello from 'src/components/SharedComponents/Hello'

describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor({
      propsData: {
        propValue: 'Welcome to Your Vue.js App'
      }
    }).$mount()
    expect(vm.$el.textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
