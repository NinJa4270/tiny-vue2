import { Component } from 'src/types'
import { Object } from '../../types'
import { defineReactive, observe } from '../observe'
import { nextTick } from '../observe/next-tick'
import { initAssetRegisters } from './assets'
import { initExtend } from './extend'
import { initMixin } from './mixin'
import { initUse } from './use'
export function initGlobalAPI(Vue: Component) {
  console.log('%cindex.ts => "rollup initGlobalAPI"', 'color: red;')
  const configDef: PropertyDescriptor = {}
  //  TODO:定义的config常量
  configDef.get = () => {}
  configDef.set = () => {}
  Object.defineProperty(Vue, 'config', configDef)

  Vue.util = {
    //TODO: warn
    extend, // 合并对象
    //TODO: mergeOptions, // 合并配置
    defineReactive,
  }

  Vue.set = function () {}
  Vue.delete = function () {}
  Vue.nextTick = nextTick

  Vue.observable = (obj: any) => {
    observe(obj)
    return obj
  }

  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  Vue.options._base = Vue

  // TODO: extend

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}

export function extend(to: Object, _from: Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

export const ASSET_TYPES = ['component', 'directive', 'filter']
