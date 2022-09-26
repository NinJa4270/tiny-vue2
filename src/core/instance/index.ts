import { Options } from 'src/types'
import { eventsMixin } from './events'
import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'
import { stateMixin } from './state'

function Vue(options: Options) {
  // @ts-ignore
  this._init(options)
}

// @ts-ignore
initMixin(Vue)
// @ts-ignore
stateMixin(Vue)
// @ts-ignore
eventsMixin(Vue)
// @ts-ignore
lifecycleMixin(Vue)
// @ts-ignore
renderMixin(Vue)

export default Vue
