import { Component } from '../../types'

export function lifecycleMixin(Vue: Component) {
  console.log('lifecycleMixin')

  Vue.prototype._update = function () {}
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
}
