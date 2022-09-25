import { Component } from '../../types'
export function eventsMixin(Vue: Component) {
  console.log('eventsMixin')
  Vue.prototype.$on = function () {}
  Vue.prototype.$once = function () {}
  Vue.prototype.$off = function () {}
  Vue.prototype.$emit = function () {}
}
