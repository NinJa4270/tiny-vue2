import { createCompileToFunctionFn } from './to-function'
import { Object } from '../types'

export function createCompilerCreator(baseCompile: Function) {
  console.log('%ccreate-compiler.ts => compile createCompilerCreator', 'color: #007acc;')
  return function createCompiler(baseOptions: Object) {
    console.log('%ccreate-compiler.ts => compile createCompiler', 'color: #007acc;')
    function compile(template: string, options?: Object) {
      console.log('%ccreate-compiler.ts => compile compile', 'color: #007acc;')
      const finalOptions = Object.create(baseOptions)
      if (options) {
        if (options.modules) {
          // modules
        }
        if (options.directives) {
          // directives
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
