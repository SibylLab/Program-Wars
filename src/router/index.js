import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from 'components/MainComponent'

import SettingsComponent from 'components/SettingsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/game',
      canReuse: false,
      name: 'main-component',
      component: MainComponent
    },
    {
      path: '/',
      canReuse: false,
      name: 'settings-component',
      component: SettingsComponent
    }
  ]
})
