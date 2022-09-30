import { createCompiler } from 'src/compiler'
import { baseOptions } from './options'

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
