import { Options } from 'src/types'
import Vue from './runtime'
import { query } from './util'
import { cached } from '../utils'
import { compileToFunctions } from './compiler'

const idToTemplate: Function = cached((id: string) => {
  const el = query(id)
  return el && el.innerHTML
})

const mount = Vue.prototype.$mount
// 重写$mount
Vue.prototype.$mount = function (el: string | Element, hydrating?: boolean) {
  el = el && query(el)
  if (el === document.body || el === document.documentElement) {
    // 错误警告
    return this
  }

  const options = this.$options as Options
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          if (!template) {
            // 错误警告
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        // 警告提示
        return this
      }
    } else if (el) {
      template = getOuterHtml(el as Element)
    }
    if (template) {
      // TODO: 获取 render/staticRenderFns
      // template, {}, this
      compileToFunctions(template as string, {}, this)
    }
  }

  return mount.call(this)
}

function getOuterHtml(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

// @ts-ignore
Vue.compile = ''

export default Vue
