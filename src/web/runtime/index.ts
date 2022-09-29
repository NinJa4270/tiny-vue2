import Vue from 'src/core'
import { mountComponent } from 'src/core/instance/lifecycle'

// @ts-ignore
// Vue.config = {}

Vue.prototype.__patch__ = function () {}

Vue.prototype.$mount = function () {
  console.log('$mount')
  return mountComponent(this)
}

export default Vue
