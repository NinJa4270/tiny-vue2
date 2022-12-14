import { extend, hasOwn, isPlainObject, nativeWatch } from './index'
import { Component, Object } from '../types'
import config from 'src/core/config'
import { ASSET_TYPES, LIFECYCLE_HOOKS } from './constants'
import { set } from 'src/core/observe'

const strats = config.optionMergeStrategies

// 默认合并策略
const defaultStrat = function (parentVal: any, childVal: any): any {
  return childVal === undefined ? parentVal : childVal
}

// data的合并策略
strats.data = function (parentVal: any, childVal: any, vm?: Component) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }
  return mergeDataOrFn(parentVal, childVal, vm)
}
export function mergeDataOrFn(parentVal: any, childVal: any, vm?: Component) {
  if (!vm) {
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }

    return function mergeDataFn() {
      // @ts-ignore
      const to = typeof childVal === 'function' ? childVal.call(this, this) : childVal
      // @ts-ignore
      const from = typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      return mergeData(to, from)
    }
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      const instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal
      const defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}
function mergeData(to: Object, from?: Object): Object {
  if (!from) return to
  let key, toVal, fromVal
  const keys = Object.keys(from)

  for (let i = 0; i < keys.length; i++) {
    key = keys[i]
    if (key === '__ob__') continue
    toVal = to[key]
    fromVal = from[key]
    if (!hasOwn(to, key)) {
      set(to, key, fromVal) //$set
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal)
    }
  }
  return to
}
// 生命周期的合并策略
LIFECYCLE_HOOKS.forEach(hook => {
  strats[hook] = mergeHook
})

function mergeHook(parentVal: Function[], childVal: Function[] | Function): Function[] | void {
  const res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
      ? childVal
      : [childVal]
    : parentVal
  return res ? dedupeHooks(res) : res
}

function dedupeHooks(hooks: Function[]) {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}

// component directive filter 的合并策略
ASSET_TYPES.forEach(type => {
  strats[type + 's'] = mergeAssets
})
function mergeAssets(parentVal: Object, childVal: Object, vm?: Component, key?: string) {
  const res = Object.create(parentVal || null)
  if (childVal) {
    return extend(res, childVal)
  } else {
    return res
  }
}

// watch的合并策略
strats.watch = function (parentVal: Object | undefined, childVal: Object | undefined, vm?: Component, key?: string) {
  if (parentVal === nativeWatch) parentVal = undefined
  if (childVal === nativeWatch) childVal = undefined
  if (!childVal) return Object.create(parentVal || null)
  if (!parentVal) return childVal
  const ret: any = {}
  extend(ret, parentVal)
  for (const key in childVal) {
    let parent = ret[key]
    const child = childVal[key]
    if (parent && !Array.isArray(parent)) {
      parent = [parent]
    }
    ret[key] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child]
  }
}

// props/methods/inject/computed/proveid 的合并策略
strats.props =
  strats.methods =
  strats.inject =
  strats.computed =
    function (parentVal: Object | undefined, childVal: Object | undefined, vm?: Component, key?: string) {
      if (!parentVal) return childVal
      const ret = Object.create(null)
      extend(ret, parentVal)
      if (childVal) extend(ret, childVal)
      return ret
    }
strats.provide = mergeDataOrFn

export function mergeOptions(parent: Object, child: Object, vm?: Component): Object {
  if (typeof child === 'function') {
    // @ts-ignore
    child = child.options
  }
  // 标准化处理
  // props
  normalizeProps(child, vm)
  // inject
  normalizeInject(child, vm)
  // directives
  normalizeDirectives(child)

  // 递归合并
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm)
    }
    if (child.mixins) {
      for (let i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm)
      }
    }
  }

  const options: Object = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }

  return options
}

function normalizeProps(options: Object, vm?: Component) {
  const props = options.prop
  if (!props) return
  const res: Object = {}
  let i, val, name
  if (Array.isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = val // 这里标准化 key
        res[name] = { type: null }
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = key
      res[name] = isPlainObject(val) ? val : { type: val }
    }
  }

  options.props = res
}

function normalizeInject(options: Object, vm?: Component) {
  const inject = options.inject
  if (!inject) return
  const normalized: Object = (options.inject = {})
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val) ? extend({ from: key }, val) : { from: val }
    }
  }
}

function normalizeDirectives(options: Object) {
  const dirs = options.directives
  if (dirs) {
    for (const key in dirs) {
      const def = dirs[key]
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def }
      }
    }
  }
}
