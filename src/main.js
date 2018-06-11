// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import store from './store'
import moment from 'moment-timezone'
import 'iview/dist/styles/iview.css'

Vue.use(iview)

Vue.prototype.$moment = moment
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    iview,
    store,
    components: { App },
    template: '<App/>'
})