import { Watcher } from 'src/core/observe/watcher'

export interface Options {
  data?: any
  computed: Object
  watch: Object
}

export interface WatcherOptions {
  lazy?: boolean
  user?: boolean
}

export declare class Component {
  constructor(options?: any)
  [key: string]: any
  // _init
  _uid: number
  _isVue: boolean
  _self: Component
  $options: Options

  // initLifecyle
  $parent?: Component
  $root: Component
  $children: Component[]
  $refs: object
  _watcher: Watcher | null
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
  _watchers: Watcher[]
  $props: any
  $data: any
  _computedWatchers: []
  _data: any

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

  // stateMixin
  $set: Func
  $delete: Func
  $watch: Func
}

export type Func = (...args: any[]) => unknown

export interface Object {
  [key: string]: any
}

