import Vue from './runtime'

const mount = Vue.prototype.$mount

Vue.prototype.$mount = function () {
  // 重写$mount
  return mount.call(this)
}

// @ts-ignore
Vue.compile = ''

export default Vue
