import { nextTick } from './next-tick'
import { Watcher } from './watcher'

const queue: Watcher[] = []
let waiting = false
const has: { [key: number]: boolean | null } = {}
let flushing = false
let index = 0

export function queueWatcher(watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    if (!flushing) {
      queue.push(watcher)
    } else {
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    if (!waiting) {
      waiting = true
      nextTick(flushSchedulerQueue)
    }
  }
  // TODO: 保存副本
  // TODO: 重置状态
  // TODO: 调用组件更新钩子

}

function flushSchedulerQueue() {
  flushing = true
  let watcher, id
  // 排序
  queue.sort((a, b) => a.id - b.id)
  
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) watcher.before()
    id = watcher.id
    has[id] = null
    watcher.run()
  }
}
