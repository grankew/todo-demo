import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/types/index'
import plugins from './plugins'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  ...plugins,
  render: h => h(App)
}).$mount('#app')
