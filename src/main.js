import Vue from 'vue'
import App from './App.vue'
import router from './router'  //引入 vue-router
import store from './store'    //引入 vuex
import axios from 'axios'

// 全局配置
import '@/assets/scss/reset.scss' //全局样式
import 'element-ui/lib/theme-chalk/index.css' //element-ui样式
import http from '@/api/config'  //axios
import './mock'   // mockjs
// 第三方包
import ElementUI from 'element-ui'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = http

Vue.prototype.$ajsx=axios
// Vue.config.productionTip = false
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
