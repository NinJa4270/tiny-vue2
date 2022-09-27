import { Component } from 'src/types'
import { Dep } from './dep'
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
  constructor(vm: Component, expOrFn: string | Function, cb: Function, options: Object, isRenderWatcher?: boolean) {
    this.vm = vm
    if (isRenderWatcher) {
      // render watcher
      vm._watcher = this
    }
    // TODO: 处理配置项 options
    this.cb = cb
    this.id = ++uid
    // TODO: 其他属性初始化
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    // TODO: 处理expOrFn
    this.value = this.get()
  }

  get() {}

  addDep(dep: Dep) {}

  update() {
    // TODO: 分支判断 懒执行/同步执行

    // watcher 队列
    queueWatcher(this)
  }
}
