import { Component } from 'src/types'
import Vue from './instance'

const initGlobalAPI = (Vue: Component) => {
  console.log('initGlobalAPI')
}
initGlobalAPI(Vue as unknown as Component)
// @ts-ignore
Vue.version = '__VERSION__'

export default Vue
