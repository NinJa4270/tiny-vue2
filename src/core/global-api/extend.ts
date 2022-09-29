import { Component, Object } from 'src/types'
import { extend } from 'src/utils'
import { ASSET_TYPES } from 'src/utils/constants'
import { mergeOptions } from 'src/utils/options'
import { defineComputed, proxy } from '../instance/state'

export function initExtend(Vue: Component) {
  Vue.cid = 0
  let cid = 1
  Vue.extend = function (extendOptions: Object) {
    extendOptions = extendOptions || {}
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const Super = this
    const SuperId = Super.cid
    const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {})
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    const name = extendOptions.name || Super.options.name
    const Sub: Object = function VueComponent(options: Object) {
      console.log(options)
      // @ts-ignore
      this._init(options)
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.cid = cid++
    Sub.options = mergeOptions(Super.options, extendOptions)
    Sub['super'] = Super
    if (Sub.options.props) {
      initProps(Sub)
    }
    if (Sub.options.computed) {
      initComputed(Sub)
    }

    Sub.extend = Super.extend
    Sub.mixin = Super.mixin
    Sub.use = Super.use

    ASSET_TYPES.forEach(type => {
      Sub[type] = Super[type]
    })

    if (name) {
      Sub.options.components[name] = Sub
    }

    Sub.superOptions = Super.options
    Sub.extendOptions = extendOptions
    Sub.sealedOptions = extend({}, Sub.options)

    cachedCtors[SuperId] = Sub
    return Sub
  }
}

function initProps(Comp: Object) {
  const props = Comp.options.props
  for (const key in props) {
    proxy(Comp.prototype, '_props', key)
  }
}
function initComputed(Comp: Object) {
  const computed = Comp.options.computed
  for (const key in computed) {
    defineComputed(Comp.prototype, key, computed[key])
  }
}
