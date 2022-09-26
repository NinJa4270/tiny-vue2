import { Component } from 'src/types'
import { eventsMixin } from './events'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { stateMixin } from './state'

function Vue(options: object) {
  // @ts-ignore
  this._init(options)
}

initMixin(Vue as Component)
stateMixin(Vue as Component)
eventsMixin(Vue as Component)
lifecycleMixin(Vue as Component)
renderMixin(Vue as Component)

export default Vue
