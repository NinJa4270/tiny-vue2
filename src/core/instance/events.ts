import { Component } from '../../types'
export function eventsMixin(Vue: Component) {
  console.log('eventsMixin')
  Vue.prototype.$on = function () {}
  Vue.prototype.$once = function () {}
  Vue.prototype.$off = function () {}
  Vue.prototype.$emit = function () {}
}

export function initEvents(vm: Component) {
  vm._events = Object.create(null)
  vm._hasHookEvent = false
  // TODO: 外部定义的附加事件 在当前更新
}
