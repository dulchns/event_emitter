interface IEventEmitter {
    subscribers: Record<string, Array<Func>>
    subscribe: SubscribeFunc
    emit: EmitFunc
    unsubscribe: SubscribeFunc
}

type Func = (...args: Array<unknown>) => unknown
type SubscribeFunc = (key: string, func: Func) => void
type EmitFunc = (key: string, ...args: Array<unknown>) => void

class EventEmitter implements IEventEmitter {
  constructor() {
    this.subscribers = {}
  }

  subscribers: Record<string, Func[]>
  subscribe: SubscribeFunc = (key, func) => {
    if (!(key in this.subscribers)) {
      this.subscribers[key] = []
    }
    this.subscribers[key].push(func)
  }
  emit: EmitFunc = (key, ...args) => {
    this.subscribers[key].forEach((func) => func(...args))
  }
  unsubscribe: SubscribeFunc = (key, func) => {
    this.subscribers[key] = this.subscribers[key].filter((el) => el !== func)
  }
}

module.exports = EventEmitter