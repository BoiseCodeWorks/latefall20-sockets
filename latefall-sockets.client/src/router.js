import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import socketService from './services/SocketService'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/items',
    name: 'Items',
    component: loadPage('ItemsPage'),
    beforeEnter: (to, from, next) => {
      socketService.joinRoom('items')
      next()
    }
  },
  {
    path: '/item/:id',
    name: 'Item',
    component: loadPage('ItemPage'),
    beforeEnter: (to, from, next) => {
      socketService.joinRoom('items-' + to.params.id)
      next()
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: loadPage('ProfilePage'),
    beforeEnter: authGuard
  }
]

const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})

export default router
