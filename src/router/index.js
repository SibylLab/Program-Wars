import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from 'components/MainComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-component',
      component: MainComponent
    }
  ]
})
