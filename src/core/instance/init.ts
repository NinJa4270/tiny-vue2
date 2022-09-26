import { Component } from '../../types'
import { initEvents } from './events'
import { initInjections } from './inject'
import { callHook, initLifecycle } from './lifecycle'
import { initRender } from './render'
import { initState } from './state'

let uid = 0

export function initMixin(Vue: Component) {
  console.log('initMixin')
  Vue.prototype._init = function (options: object) {
    console.log('init')
    const vm: Component = this
    vm._uid = uid++
    vm._isVue = true
    // 合并options
    vm.$options = options || {}
    // ignore initProxy proxy代理
    vm._self = vm
    // 初始化 $parent/$root/$children/$refs等
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm)
    initState(vm)
    callHook(vm, 'created')
  }
}
