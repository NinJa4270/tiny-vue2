export function query(el: string | Element): Element {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      // 警告提示
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}
