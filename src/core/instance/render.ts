import { Component } from '../../types'

export function renderMixin(Vue: typeof Component) {
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

export function initRender(vm: Component) {
  vm._vnode = null // 根
  vm._staticTrees = null // 静态树
  // TODO: 处理$slot $scopedSlots
  vm.$slots = null
  vm.$scopedSlots = Object.freeze({})

  // TODO: 处理_c $createElement
  // Vue内部使用
  vm._c = function () {}
  // 用户使用
  vm.$createElement = function () {}

  // TODO: $attrs/$listeners
}
