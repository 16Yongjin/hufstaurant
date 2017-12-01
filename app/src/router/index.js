import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Food from '@/components/Foods/Food'
import FoodCup from '@/components/FoodCup/FoodCup'
import Settings from '@/components/Settings/Settings'
import Reviews from '@/components/Reviews/Reviews'
import NewReview from '@/components/Reviews/NewReview'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Cafeteria from '@/components/Cafeteria/Cafeteria'
import Likes from '@/components/Likes/Likes'
import Map from '@/components/Map/Map'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews
    },
    {
      path: '/reviews/new',
      name: 'NewReview',
      component: NewReview,
      beforeEnter: AuthGuard
    },
    {
      path: '/food',
      name: 'Food',
      component: Food
    },
    {
      path: '/foodcup',
      name: 'FoodCup',
      component: FoodCup
    },
    {
      path: '/cafeteria',
      name: 'Cafeteria',
      component: Cafeteria
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },
    {
      path: '/likes',
      name: 'Likes',
      component: Likes,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
