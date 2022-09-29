import { Component } from 'src/types'
import { extend } from 'src/utils'
import { ASSET_TYPES } from 'src/utils/constants'
import { mergeOptions } from 'src/utils/options'
import config from '../config'
import { defineReactive, observe } from '../observe'
import { nextTick } from '../observe/next-tick'
import { initAssetRegisters } from './assets'
import { initExtend } from './extend'
import { initMixin } from './mixin'
import { initUse } from './use'
export function initGlobalAPI(Vue: Component) {
  console.log('%cindex.ts => "rollup initGlobalAPI"', 'color: red;')
  const configDef: PropertyDescriptor = {}
  configDef.get = () => config
  Object.defineProperty(Vue, 'config', configDef)

  Vue.util = {
    //TODO: warn
    extend, // 合并对象
    mergeOptions, // 合并配置
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
