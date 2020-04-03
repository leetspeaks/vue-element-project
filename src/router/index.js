import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Home from '@/components/Home/Home.vue'
import Users from '@/components/Users/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      { path: '/users', name: 'users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
