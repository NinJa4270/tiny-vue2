let uid = 0
export class Dep {
  id: number
  subs: never[]
  constructor() {
    this.id = uid++
    this.subs = []
  }

  depend() {}

  notify() {}
}
