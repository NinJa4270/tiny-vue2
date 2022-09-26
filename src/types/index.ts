import Vue from '../core/instance'

export interface Component {
  (): typeof Vue

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
}

// export type Component = typeof Vue
