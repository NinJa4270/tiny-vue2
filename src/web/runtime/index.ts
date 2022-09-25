import Vue from 'src/core'

// @ts-ignore
Vue.config = {}

Vue.prototype.__patch__ = function () {}

Vue.prototype.$mount = function () {
  console.log('$mount')
}

export default Vue
