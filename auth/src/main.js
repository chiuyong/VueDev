import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import router from './router'
import { store } from './vuex/store'
import 'vuetify/src/stylus/main.styl'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import App from './App.vue'
//import './assets/scss/app.scss'
const fb = require('./config/firebaseConfig')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuelidate)

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})