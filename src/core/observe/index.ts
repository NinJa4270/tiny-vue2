export function observe(value: any, asRootData?: boolean) {
  // TODO: 判断是否为 VNode
  if (!isObject) {
    return
  }
  const ob = new Observer(value)
  return ob
}

export class Observer {
  value: any
  constructor(value: any) {
    this.value = value

    this.walk(value)
  }

  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}

export function defineReactive(obj: Object, key: string) {}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}
