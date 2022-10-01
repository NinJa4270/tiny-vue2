import { ASTText } from 'src/types/ast'
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
  let currentParent: any
  let inVPre = false
  let inPre = false

  function closeElement() {}
  function trimEndingWhitespace() {}
  function checkRootConstraints() {}

  parseHTML(template, {
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    comment(text: string, start: number, end: number) {
      if (currentParent) {
        const child: ASTText = {
          type: 3,
          text,
          isComment: true,
        }
        if (options.outputSourceRange) {
          child.start = start
          child.end = end
        }
        currentParent.children.push(child)
      }
    },
  })

  return root
}
