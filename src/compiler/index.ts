import { createCompilerCreator } from './create-compiler'
import { Object } from '../types'
import { parse } from './parser'
import { optimize } from './optimizer'
import { generate } from './codegen'
export const createCompiler = createCompilerCreator(function baseCompile(template: string, options: Object) {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)

  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  }
})
