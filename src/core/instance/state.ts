import { Component } from '../../types'

export function stateMixin(Vue: Component) {
  console.log('stateMixin')

  Object.defineProperty(Vue.prototype, '$data', {})
  Object.defineProperty(Vue.prototype, '$props', {})

  Vue.prototype.$set = function () {}
  Vue.prototype.$delete = function () {}
  Vue.prototype.$watch = function () {}
}
