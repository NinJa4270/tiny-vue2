import { arrayMethods } from './array'
import { Dep } from './dep'

export function observe(value: any, asRootData?: boolean) {
  // TODO: 判断是否为 VNode
  if (!isObject) {
    return
  }
  const ob = new Observer(value)
  return ob
}

export class Observer {
  value: any
  dep: Dep
  vmCount: number
  constructor(value: any) {
    this.value = value
    this.vmCount = 0
    this.dep = new Dep() // 每一个key对应一个Dep
    def(value, '__ob__', this) // 给传入的value 添加一个__ob__属性 value为当前Observer实例
    if (Array.isArray(value)) {
      // 如果value 是数组
      protoAugment(value, arrayMethods)
    } else {
      this.walk(value)
    }
  }

  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

function protoAugment(target: Array<unknown>, src: Object) {
  // @ts-ignore
  target.__proto__ = src
}

export function defineReactive(obj: Object, key: string) {}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}
export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}
