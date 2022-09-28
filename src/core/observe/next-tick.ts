const callbacks: Function[] = []
let pending = false // 保证同一时间只存在一个 `flushCallbacks`
// 对外表示 timerFunc是否使用了 MutationObserver
export let isUsingMicroTask = false
// timerFunc 定义
let timerFunc: () => void

if (typeof Promise !== undefined) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
  }
} else if (typeof MutationObserver !== undefined) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true,
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== undefined) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve: (arg0: unknown) => void
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.log(e)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }

  if (!cb && typeof Promise !== undefined) {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
