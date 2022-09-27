import { Component, WatcherOptions } from 'src/types'
import { noop } from '../instance/state'
import { Dep, popTarget, pushTarget } from './dep'
import { queueWatcher } from './scheduler'

let uid = 0
export class Watcher {
  vm: Component
  cb: Function
  id: number
  deps: Dep[]
  newDeps: Dep[]
  depIds: Set<unknown>
  newDepIds: Set<unknown>
  value: any
  lazy: boolean
  dirty: boolean
  expression: string
  getter?: Function
  user?: boolean
  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options: WatcherOptions,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      // render watcher
      vm._watcher = this
    }
    // TODO: 处理配置项 options
    console.log('%cwatcher.ts line:34 options.sync', 'color: #007acc;', !!options.sync);
    if (options) {
      this.user = !!options.user
      this.lazy = !!options.lazy
    } else {
      this.lazy = false
    }
    this.cb = cb
    this.id = ++uid
    // TODO: 其他属性初始化

    this.dirty = this.lazy

    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    // TODO: 处理expOrFn
    this.expression = expOrFn.toString()
    // 如果传入的表达式是函数
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        // 警告提示
      }
    }

    this.value = this.lazy ? undefined : this.get()
  }

  get() {
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      value = this.getter!.call(vm, vm)
    } catch (e) {
      if (this.user) {
        // 错误处理提示
      } else {
        throw e
      }
    } finally {
      // TODO: depp 属性的处理
      popTarget()
      this.cleanupDeps()
    }
    return value
  }
  cleanupDeps() {
    // 遍历当前 watcher 所绑定多所有 deps
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
  }

  addDep(dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  depend() {}

  update() {
    // TODO: sync执行的方法
    if (this.lazy) {
      this.dirty = true
    } else {
      // watcher 队列
      queueWatcher(this)
    }
  }

  evaluate() {
    this.value = this.get()
    this.dirty = false
  }

  teardown() {}
}

export const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
export function parsePath(path: string): any {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj: any) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
