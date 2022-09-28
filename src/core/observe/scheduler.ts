import { Watcher } from './watcher'

const queue: Watcher[] = []
let waiting = false
const has: { [key: number]: boolean } = {}
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

    if (waiting) {
      waiting = true

      nextTick(flushSchedulerQueue)
    }
  }
}

function flushSchedulerQueue() {}

function nextTick(cb?: Function, ctx?: Object) {}
