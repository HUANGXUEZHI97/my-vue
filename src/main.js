// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import create from './utils/create'
import store from './zstore'
import router from './krouter'

Vue.config.productionTip = false
// Vue.prototype.$create = create
Vue.use(create)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//在这里挂在router是为了全局用 Vue.prototype.$router = router
  components: { App },
  store,
  template: '<App/>'
})
