import { createCompiler } from 'src/compiler'
const baseOptions = {}

const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
