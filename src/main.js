// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iview from 'iview'
import store from './store'
import moment from 'moment-timezone'
// import 'iview/dist/styles/iview.css'
import './theme/index.less'

Vue.use(iview)

Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.filter('account', function (value) {
  var ret = [];
  var i;
  var len;

  for(i = 0, len = value.length; i < len; i += 4) {
     ret.push(value.substr(i, 4))
  }
  return ret.join('-')
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    iview,
    store,
    moment,
    components: { App },
    template: '<App/>'
})
