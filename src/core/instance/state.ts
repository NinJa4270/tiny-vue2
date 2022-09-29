import { isPlainObject } from 'src/utils'
import { Component, Func, Object } from '../../types'
import { observe } from '../observe'
import { Dep, popTarget, pushTarget } from '../observe/dep'
import { Watcher } from '../observe/watcher'

const sharedPropertyDefinition: {
  enumerable: boolean
  configurable: boolean
  get: Function
  set: Function
} = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop,
}

export function stateMixin(Vue: typeof Component) {
  console.log('%cstate.ts => rollup stateMixin"', 'color: red;')

  // Object.defineProperty(Vue.prototype, '$data', {})
  // Object.defineProperty(Vue.prototype, '$props', {})

  Vue.prototype.$set = function () {}
  Vue.prototype.$delete = function () {}
  Vue.prototype.$watch = function (expOrFn: string | Function, cb: any, options?: Object) {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      pushTarget()
      cb.call(vm, watcher.value)
      popTarget()
    }
    return function unwatchFn() {
      watcher.teardown()
    }
  }
}

export function initState(vm: Component) {
  const opts = vm.$options
  vm._watchers = []
  // 处理props
  vm.$props = {}
  // TODO: 处理methods
  // 处理data
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm, opts.watch)
  }
}

function initData(vm: Component) {
  let data = vm.$options.data
  // 处理data为函数时 并赋值给_data
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {}

  // 将data代理到vm上
  const keys = Object.keys(data)
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
const computedWatcherOptions = { lazy: true }

function initComputed(vm: Component, computed: any) {
  vm._computedWatchers = Object.create(null)
  const watchers: Object = vm._computedWatchers
  // 遍历传入的 computed
  for (const key in computed) {
    const userDef = computed[key]
    // 获取设置的getter
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    if (getter == null) {
      // TODO: 错误提示
    }
    // 非SSR情况下
    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions)

    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else {
      // TODO:判断是否重名
    }
  }
}

export function defineComputed(target: any, key: string, userDef: Object | Function) {
  if (typeof userDef === 'function') {
    // 如果是函数
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = noop
  } else {
    // 如果是配置项
    sharedPropertyDefinition.get = (userDef as any).get ? createComputedGetter(key) : noop
    sharedPropertyDefinition.set = (userDef as any).set || noop
  }
  Object.defineProperty(target, key, sharedPropertyDefinition as PropertyDescriptor)
}

function createComputedGetter(key: string) {
  return function computedGetter() {
    // @ts-ignore
    const watcher = this._computedWatchers && this._computedWatchers[key]

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function initWatch(vm: Component, watch: Object) {
  let key: keyof typeof watch
  for (key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher(vm: Component, expOrFn: string | Function, handler: any, options?: Object) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}

export function noop(a?: any, b?: any, c?: any) {}

export function proxy(target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter() {
    // @ts-ignore
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter(val: any) {
    // @ts-ignore
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition as PropertyDescriptor)
}
