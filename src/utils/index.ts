import { Object } from '../types'

export function extend(to: Object, _from: Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
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
export const nativeWatch = ({} as Object).watch

// 检查索引是否合法
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

export function cached<F>(fn: Function): F {
  const cache = Object.create(null)
  return function cachedFn(str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  } as F
}

export const no = (a?: any, b?: any, c?: any) => false
