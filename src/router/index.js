import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Teams from '../views/Teams.vue'
import Players from '../views/Players.vue'
import Leagues from '../views/Leagues.vue'
import Fixtures from '../views/Fixtures.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about"  '../views/About.vue')
  } */
  {
    path: '/teams',
    name: 'Teams',
    component : Teams

  },
  {
    path: '/players',
    name: 'Players',
    component : Players
  },

  {
    path: '/leagues',
    name: 'Leagues',
    component : Leagues
  },
  {
    path: '/fixtures/:id',
    name: 'Fixtures',
    component : Fixtures
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
