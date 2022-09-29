import { isObject } from 'src/utils'

const seenObjects: Set<number> = new Set()
export function traverse(val: any) {
  _traverse(val, seenObjects)
  seenObjects.clear()
}

function _traverse(val: any, seen: Set<number>) {
  let i, keys
  const isA = Array.isArray(val)
  // TODO: 判断是否为VNode 实例
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }

  if (val.__ob__) {
    const depId = val.__ob__.dep.id
    if (seen.has(depId)) {
      return
    }
    seen.add(depId)
  }

  if (isA) {
    i = val.length
    while (i--) _traverse(val[i], seen)
  } else {
    keys = Object.keys(val)
    i = keys.length
    while (i--) _traverse(val[keys[i]], seen)
  }
}
