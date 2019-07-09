import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'

import 'vuetify/src/stylus/main.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './App.vue'
const fb = require('./config/firebaseConfig.js')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
}).$mount('#app')
