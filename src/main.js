import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMonthlyPicker from 'vue-monthly-picker'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.component('my-component', {
  components: {
    VueMonthlyPicker
  }
});





// import Chart from 'chart.js';


