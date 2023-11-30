const EventEmitterClass = require("./EventEmitter")
const ee = new EventEmitterClass()
const func1 = (a: unknown) => console.log(a)
const func2 = (a: unknown, b: unknown) => console.log({[a as string]: b})

ee.subscribe('TEST', func1)
ee.subscribe('TEST', func2)
ee.emit('TEST', 10, 1)
