import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'

import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'

import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

// 面包屑的自定义组件
import MyBread from '@/components/MyBread/MyBread.vue'
Vue.component(MyBread.name,MyBread)

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
