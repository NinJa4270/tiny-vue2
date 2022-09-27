import { arrayMethods } from './array'
import { Dep } from './dep'

export function observe(value: any, asRootData?: boolean) {
  // TODO: 判断是否为 VNode
  if (!isObject) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else if ((Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isValue) {
    // TODO: shouldObserve判断
    // 如果value是数组或者是对象 并且 value可扩展 不是Vue实例
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
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

interface Object {
  [key: string]: any
}

export function defineReactive(obj: Object, key: string, val?: any, customSetter?: Function, shallow?: boolean) {
  const dep = new Dep()
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 判断是否为可配置
  if (property?.configurable === false) {
    return
  }
  const setter = property?.set
  const getter = property?.get
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }
  // 递归
  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val
      // 依赖收集
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reacteveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      // eslint-disable-next-line no-self-compare
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    },
  })
}

export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  })
}

function dependArray(value: any[]) {
  for (let i = 0, l = value.length; i < l; i++) {
    const e = value[i]
    e?.__ob__?.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj: Object | Array<any>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}
export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}
const _toString = Object.prototype.toString
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}
