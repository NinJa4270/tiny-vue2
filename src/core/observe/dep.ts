import { Watcher } from './watcher'

let uid = 0
export class Dep {
  static target?: Watcher | null
  id: number
  subs: Watcher[]
  constructor() {
    this.id = uid++
    this.subs = []
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub)
  }

  addSub(sub: Watcher) {
    this.subs.push(sub)
  }

  depend() {
    if (Dep.target) {
      // 调用 watcher 实例上的 addDep方法
      Dep.target.addDep(this)
    }
  }

  notify() {
    // 拷贝一下 subs
    const subs = this.subs.slice()
    // 遍历 当前dep实例收集的 watcher 依次执行它的update方法
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

Dep.target = null
const targetStack: (Watcher | undefined)[] = []
export function pushTarget(target?: Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}

export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
