import { extend } from 'src/utils'
import { mergeOptions } from 'src/utils/options'
import { Component, Options, Function, Object } from '../../types'
import { initEvents } from './events'
import { initInjections } from './inject'
import { callHook, initLifecycle } from './lifecycle'
import { initRender } from './render'
import { initState } from './state'

let uid = 0

export function initMixin(Vue: typeof Component) {
  console.log('%cinit.ts => rollup initMixin"', 'color: red;')

  Vue.prototype._init = function (options: Options) {
    console.log('init')
    const vm: Component = this
    vm._uid = uid++
    vm._isVue = true
    // 合并options
    // 子组件 根组件执行不同的策略
    // TODO: 子组件
    // 根组件
    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm) as Options
    // ignore initProxy proxy代理
    vm._renderProxy = vm
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

function resolveConstructorOptions(Ctor: Function) {
  let options = Ctor.options
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions
      const modifiedOptions = resolveModifiedOptions(Ctor)
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions(Ctor: Function) {
  let modified: Object | undefined
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
