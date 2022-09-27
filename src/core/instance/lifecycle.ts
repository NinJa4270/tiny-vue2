import { Component } from '../../types'
import { Watcher } from '../observe/watcher'

export function lifecycleMixin(Vue: typeof Component) {
  console.log('lifecycleMixin')

  Vue.prototype._update = function () {}
  Vue.prototype.$forceUpdate = function () {}
  Vue.prototype.$destroy = function () {}
}

/**
 * @description Vue初始化中
 * @export
 * @param {Component} vm
 */
export function initLifecycle(vm: Component) {
  // TODO: 处理组件parent
  vm.$parent = undefined
  vm.$root = vm // TODO: 子组件需要处理
  vm.$children = []
  vm.$refs = {}
  vm._watcher = null // 一个实例对应一个watcher
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}

export function callHook(vm: Component, hook: string) {
  // TODO:生命周期
}

export function mountComponent(vm: Component) {
  // TODO: 其他功能

  new Watcher(
    vm, // 实例
    () => {}, // expOrFn
    () => {}, // cb
    {}, // options
    true // render watcher
  )
}
