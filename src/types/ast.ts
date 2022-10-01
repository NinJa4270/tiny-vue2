export interface ASTText {
  type: number
  text: string
  isComment: boolean
  start?: number
  end?: number
}

export interface ASTMatch {
  tagName: string
  attrs: any[]
  unarySlash?: string
  start?: number
  end?: number
}
