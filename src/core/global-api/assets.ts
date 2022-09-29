import { Component, Object, Function } from 'src/types'
import { isPlainObject } from 'src/utils'
import { ASSET_TYPES } from 'src/utils/constants'

export function initAssetRegisters(Vue: Component) {
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (id: string, definition: Function | Object) {
      if (!definition) {
        return this.options[(type = 's')][id]
      } else {
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id
          definition = this.options._base.extend(definition)
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }

        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
