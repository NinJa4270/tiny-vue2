// import { hasOwn } from 'src/core/observe'
import { Component, Object } from '../types'

// const strats = Object.create(null)

// const defaultStrat = function (parentVal: any, childVal: any) {
//   return childVal === undefined ? parentVal : childVal
// }

export function mergeOptions(parent: Object, child: Object, vm?: Component): Object {
  if (typeof child === 'function') {
    // @ts-ignore
    child = child.options
  }

  // TODO: 标准化处理
  // props
  // inject
  // directives

  // 递归合并
  return {}
}

export function extend(to: Object, _from: Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}
