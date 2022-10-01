/* eslint-disable no-useless-escape */
import { ASTMatch } from 'src/types/ast'
import { makeMap, no } from 'src/utils'
import { Object } from '../../types'

export const isPlainTextElement = makeMap('script,style,textarea', true)

const comment = /^<!\--/
const conditionalComment = /^<!\[/
const doctype = /^<!DOCTYPE [^>]+>/i

const unicodeRegExp =
  /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute =
  /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)

export function parseHTML(html: string, options: Object) {
  const stack = []
  const expectHTML = options.expectHTML
  const isUnaryTag = options.isUnaryTag || no
  const canBeLeftOpenTag = options.canBeLeftOpenTag || no

  let index = 0
  let last, lastTag
  while (html) {
    last = html
    if (!lastTag || isPlainTextElement(lastTag)) {
      const textEnd = html.indexOf('<')
      if (textEnd === 0) {
        // 处理注释
        if (comment.test(html)) {
          const commentEnd = html.indexOf('-->')
          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
            }
            advance(commentEnd + 3)
            continue
          }
        }
        // 处理条件注释
        if (conditionalComment.test(html)) {
          const conditionalEnd = html.indexOf(']>')
          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2)
            continue
          }
        }

        // 处理 Doctype
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          advance(doctypeMatch[0].length)
          continue
        }

        // 处理结束标签
        const endTagMatch = html.match(endTag)
        if (endTagMatch) {
          // ...
        }

        // 处理开始标签
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          handleStartTag(startTagMatch)
        }
      }

      if (textEnd >= 0) {
        // ...
      }

      if (textEnd < 0) {
        // ...
      }
    }
  }
  parseEndTag()

  function advance(n: number) {
    index += n
    html = html.substring(n)
  }

  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match: ASTMatch = {
        tagName: start[1],
        attrs: [],
        start: index,
      }
      advance(start[0].length)
      let end, attr: any
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index
        advance(attr[0].length)
        attr.end = index
        match.attrs.push(attr)
      }
      if (end) {
        match.unarySlash = end[1]
        advance(end[0].length)
        match.end = index
        return match
      }
    }
  }
  function handleStartTag(match: ASTMatch) {
    
  }
  function parseEndTag() {}
}
