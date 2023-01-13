import Vue from 'vue'
import App from './App.vue'
import { i18n } from './plugins/vue-i18n';
import router from './router'
import store from './store'

Vue.config.productionTip = false

const a = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')


console.log(a)