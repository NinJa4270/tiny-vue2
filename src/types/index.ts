export declare class Component {
  constructor(options?: any)
  // _init
  _uid: number
  _isVue: boolean
  _self: Component
  $options: object

  // initLifecyle
  $parent?: Component
  $root: Component
  $children: Component[]
  $refs: object
  _watcher: null
  _inactive: null
  _directInactive: boolean
  _isMounted: boolean
  _isDestroyed: boolean
  _isBeingDestroyed: boolean

  // initEvents
  _events: object
  _hasHookEvent: boolean

  // initRender
  _vnode: null
  _staticTrees: null
  $slots: any
  $scopedSlots: any
  _c: any
  $createElement: any

  // initState
  _watchers: []
  $props: object
  $data: object
  _computedWatchers: []

  _init: Func
  $on: Func
  $once: Func
  $off: Func
  $emit: Func

  _update: Func
  $forceUpdate: Func
  $destroy: Func

  nextTick: Func
  _render: Func

  $set: Func
  $delete: Func
  $watch: Func
}

type Func = (...args: any[]) => unknown

// export type Component = typeof Vue
