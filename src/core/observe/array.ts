import { def } from './index'

const arrayProto = Array.prototype as any // 保存 Array.prototype
export const arrayMethods = Object.create(arrayProto)

// 需要重写的Array方法
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methodsToPatch.forEach(method => {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator(...args: any[]) {
    // @ts-ignore
    const result = original.apply(this, args)
    // @ts-ignore
    const ob = this.__ob__
    let inserted: any
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
      default:
        break
    }
    if (inserted) ob.observeArray(inserted) // 对新值进行监听
    ob.dep.notify() // 通知更新
    return result
  })
})
