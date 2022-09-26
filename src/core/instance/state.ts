import { Component } from '../../types'

export function stateMixin(Vue: typeof Component) {
  console.log('stateMixin')

  // Object.defineProperty(Vue.prototype, '$data', {})
  // Object.defineProperty(Vue.prototype, '$props', {})

  Vue.prototype.$set = function () {}
  Vue.prototype.$delete = function () {}
  Vue.prototype.$watch = function () {}
}

export function initState(vm: Component) {
  vm._watchers = []
  // 处理props
  vm.$props = {}
  // TODO: 处理methods
  // 处理data
  vm.$data = {}
  // TODO:处理computed
  // vm._computedWatchers = []
  // TODO: 处理watch
}
