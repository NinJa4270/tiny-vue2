import { noop } from 'src/core/instance/state'
import { Component, Object } from 'src/types'
import { extend } from 'src/utils'

export function createCompileToFunctionFn(compile: Function) {
  console.log('%cto-function.ts  => compile createCompileToFunctionFn', 'color: #007acc;')
  // 定义缓存
  const cache = Object.create(null)

  return function compileToFunctions(template?: string, options?: Object, vm?: Component) {
    console.log('%cto-function.ts => compile compileToFunctions', 'color: #007acc;')
    options = extend({}, options as Object)

    const key = options.delimiters ? String(options.delimiters) + template : (template as string)
    if (cache[key]) return cache[key]

    const compiled = compile(template, options)

    const res: Object = {}
    res.render = createFuntion(compiled.render)
    res.staticRenderFns = compiled.staticRenderFns.map((code: string) => {
      return createFuntion(code)
    })

    return (cache[key] = res)
  }
}

function createFuntion(code: string) {
  try {
    return new Function(code)
  } catch (err) {
    console.log(err)
    return noop
  }
}
