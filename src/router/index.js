import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from 'components/MainComponent'

import SettingsComponent from 'components/SettingsComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-component',
      component: MainComponent
    },
    {
      path: '/settings',
      name: 'settings-component',
      component: SettingsComponent
    }
  ]
})
