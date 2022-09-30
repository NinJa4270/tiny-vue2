import { createCompileToFunctionFn } from './to-function'
import { Object } from '../types'
import { CompilerOptions } from 'src/web/compiler/options'
import { extend } from 'src/utils'

export function createCompilerCreator(baseCompile: Function) {
  console.log('%ccreate-compiler.ts => compile createCompilerCreator', 'color: #007acc;')
  return function createCompiler(baseOptions: CompilerOptions) {
    console.log('%ccreate-compiler.ts => compile createCompiler', 'color: #007acc;')
    function compile(template: string, options?: Object) {
      console.log('%ccreate-compiler.ts => compile compile', 'color: #007acc;')
      const finalOptions = Object.create(baseOptions)
      if (options) {
        if (options.modules) {
          // modules
          finalOptions.modules = (baseOptions.modules || []).concat(options.modules)
        }
        if (options.directives) {
          // directives
          finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives)
        }
        for (const key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key]
          }
        }
      }
      const compiled = baseCompile(template.trim(), finalOptions)
      return compiled
    }
    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile),
    }
  }
}
