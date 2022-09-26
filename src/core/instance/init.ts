import { Component, Options } from '../../types'
import { initEvents } from './events'
import { initInjections } from './inject'
import { callHook, initLifecycle } from './lifecycle'
import { initRender } from './render'
import { initState } from './state'

let uid = 0

export function initMixin(Vue: typeof Component) {
  console.log('initMixin')
  Vue.prototype._init = function (options: Options) {
    console.log('init')
    const vm: Component = this
    vm._uid = uid++
    vm._isVue = true
    // 合并options
    // 子组件 根组件执行不同的策略
    // TODO: 子组件
    // 根组件 
    // TODO: 合并配置项 涉及的默认配置  合并全局配置 Vue.extends
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

    // TODO: 如果$el 存在 则自动调用$mount方法
  }
}
