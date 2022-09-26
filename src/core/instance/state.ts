import { Component, Func } from '../../types'
import { observe } from '../observe'

export function stateMixin(Vue: typeof Component) {
  console.log('stateMixin')

  // Object.defineProperty(Vue.prototype, '$data', {})
  // Object.defineProperty(Vue.prototype, '$props', {})

  Vue.prototype.$set = function () {}
  Vue.prototype.$delete = function () {}
  Vue.prototype.$watch = function () {}
}

export function initState(vm: Component) {
  const opts = vm.$options
  vm._watchers = []
  // 处理props
  vm.$props = {}
  // TODO: 处理methods
  // 处理data
  console.log('opts', opts)
  if (opts.data) {
    initData(vm)
  }

  // TODO:处理computed
  // vm._computedWatchers = []
  // TODO: 处理watch
}

function initData(vm: Component) {
  let data = vm.$options.data
  // 处理data为函数时 并赋值给_data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}

  // 将data代理到vm上
  const keys = Object.keys(data)
  console.log('keys', keys)
  // TODO: props/methods 重名判断
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm, '_data', key)
  }
  observe(data, true)
}

function getData(data: Func, vm: Component): any {
  // TODO: 处理dep
  try {
    return data.call(vm, vm)
  } catch (e) {
    console.log(e)
  }
}

export function noop(a?: any, b?: any, c?: any) {}

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    // @ts-ignore
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val) {
    // @ts-ignore
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
