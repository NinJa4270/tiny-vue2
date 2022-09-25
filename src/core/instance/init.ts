import { Component } from '../../types'

export function initMixin(Vue: Component) {
  console.log('initMixin')
  Vue.prototype._init = function (options: any) {
    console.log('init')
  }
}
