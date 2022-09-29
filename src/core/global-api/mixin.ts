import { Component, Object } from 'src/types'
import { mergeOptions } from 'src/utils/options'

export function initMixin(Vue: Component) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
