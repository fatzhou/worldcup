import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Rule from '@/components/rule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },    
    {
      path: '/rule',
      name: 'rule',
      component: Rule
    },
    {
      path: '*',
      name: 'any',
      component: Home
    },    
  ]
})
