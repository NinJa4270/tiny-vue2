import { Component } from 'src/types'
import Vue from './instance'

const initGlobalAPI = (Vue: Component) => {
  console.log('initGlobalAPI')
}
initGlobalAPI(Vue)
// @ts-ignore
Vue.version = '__VERSION__'

export default Vue
