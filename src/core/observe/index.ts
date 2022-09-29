import { arrayMethods } from './array'
import { Dep } from './dep'
import { Object } from '../../types'
import { hasOwn, isObject, isPlainObject, isValidArrayIndex } from 'src/utils'

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

export function set(target: any[] | any, key: any, val: any) {
  // 如果是数组 并且索引合法
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 如果索引长度大于数组长度
    // splice 只会在最后添加元素 而用户再去取对应索引下标时 值不正确
    // 如果通过修改length 再会在数组中 追加 empty 空元素
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  // 对象情况
  if (key in target && !(key in Object.prototype)) {
    ;(target as Object)[key] = val
    return val
  }

  const ob = (target as any).__ob__
  // 如果
  if (target.isVue || (ob && ob.vmCount)) {
    // 警告
    return val
  }

  if (!ob) {
    target[key] = val
    return val
  }

  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

export function del(target: any[] | any, key: any, val: any) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target as any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}
