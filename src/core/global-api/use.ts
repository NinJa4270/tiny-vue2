import { Component, Object } from 'src/types'

export function initUse(Vue: Component) {
  console.log('%cuse.ts => rollup initUse', 'color: red;')
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = this._installedPlugins || (this._installedPlugins = [])
    // 已经存在该插件 直接返回
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // eslint-disable-next-line prefer-rest-params
    const args = toArray(arguments, 1)
    args.unshift(this) // 将this 放到 args首位
    if (typeof (plugin as Object).install === 'function') {
      !(plugin as Object).install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      // eslint-disable-next-line prefer-spread
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

export function toArray(list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}
