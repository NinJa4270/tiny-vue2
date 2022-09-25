import { Component } from '../../types'

export function renderMixin(Vue: Component) {
  console.log('renderMixin')

  installRenderHelpers(Vue.prototype)

  Vue.prototype.nextTick = function () {}
  Vue.prototype._render = function () {}
}

/**
 * @description 挂载runtime时的 render辅助方法
 * @param {*} target
 */
function installRenderHelpers(target: any) {}
