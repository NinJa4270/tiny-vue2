import { Component } from 'src/types'
import { initGlobalAPI } from './global-api'
import Vue from './instance'

initGlobalAPI(Vue as unknown as Component)
// @ts-ignore
Vue.version = '__VERSION__'

export default Vue
