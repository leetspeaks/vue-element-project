import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/view/Login/Login.vue'
import Home from '@/view/Home/Home.vue'
import Users from '@/view/Users/Users.vue'
import Rights from '@/view/Rights/Rights.vue'
import Roles from '@/view/Rights/Roles.vue'
import ElementUI, { Message } from 'element-ui'

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
      { path: '/users', name: 'users', component: Users },
      { path: '/rights', name: 'rights', component: Rights },
      { path: '/roles', name: 'roles', component: Roles }

    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path === '/login'){
    next()
  }else{
    const token = localStorage.getItem('token')
    if(!token){
      Message.warning('请先登录账号')
      router.push({name: 'login'})
      return
    }
    next()
  }
})

export default router
