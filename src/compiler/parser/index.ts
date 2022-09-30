import { no } from 'src/utils'
import { Object } from '../../types'
import { parseHTML } from './html-parser'

let platformIsPreTag
let platformMustUseProp
let platformGetTagNamespace
let maybeComponent
let transforms
let preTransforms
let postTransforms
let delimiters
export function parse(template: string, options: Object) {
  platformIsPreTag = options.isPreTag || no
  platformMustUseProp = options.mustUseProp || no
  platformGetTagNamespace = options.getTagNamespace || no
  const isReservedTag = options.isReservedTag || no
  maybeComponent = (el: any) =>
    !!(
      el.component ||
      el.attrsMap[':is'] ||
      el.attrsMap['v-bind:is'] ||
      !(el.attrsMap.is ? isReservedTag(el.attrsMap.is) : isReservedTag(el.tag))
    )
  transforms = function () {}
  preTransforms = function () {}
  postTransforms = function () {}
  delimiters = options.delimiters

  // 空格
  const preserveWhitespace = options.preserveWhitespace !== false
  const whitespaceOption = options.whitespace

  const stack = []
  let root
  let currentParent
  let inVPre = false
  let inPre = false

  function closeElement() {}
  function trimEndingWhitespace() {}
  function checkRootConstraints() {}

  parseHTML()

  return root
}
