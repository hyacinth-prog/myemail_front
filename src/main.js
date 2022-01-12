import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import router from './router'
import axios from 'axios'
import './quasar'

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(VueRouter);


Vue.config.productionTip = false

new Vue({

  store,
  router,
  // VueHtml5Editor,
  render: h => h(App),
  meta: {
    needLogin: true, //需要加校检判断的路由
  }
}).$mount('#app')
