import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from 'components/MainGame/MainComponent'
import SettingsComponent from 'components/SharedComponents/SettingsComponent'
import TutorialComponent from '../components/Tutorial/TutorialComponent.vue'

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
      path: '/tutorial',
      canReuse: false,
      name: 'tutorial',
      component: TutorialComponent
    },
    {
      path: '/',
      canReuse: false,
      name: 'settings-component',
      component: SettingsComponent
    },
    {path: '*', redirect: '/'}
  ],
  mode: 'history'
})
