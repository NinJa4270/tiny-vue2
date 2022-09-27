import { Watcher } from './watcher'

let uid = 0
export class Dep {
  static target?: Watcher
  id: number
  subs: Watcher[]
  constructor() {
    this.id = uid++
    this.subs = []
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
    // TODO: 排序
    // 遍历 当前dep实例收集的 watcher 依次执行它的update方法
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// TODO: target 赋值
