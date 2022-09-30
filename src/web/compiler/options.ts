import modules from './modules'
import directives from './directives'
export const baseOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag: function () {},
  isUnaryTag: function () {},
  mustUseProp: function () {},
  canBeLeftOpenTag: function () {},
  isReservedTag: function () {},
  getTagNamespace: function () {},
  staticKeys: genStaticKeys(modules),
}
export type CompilerOptions = typeof baseOptions

function genStaticKeys(modules: any[]): string {
  return modules
    .reduce((keys, m) => {
      return keys.concat(m.staticKeys || [])
    }, [])
    .join(',')
}
