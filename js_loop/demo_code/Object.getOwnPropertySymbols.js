// Object.getOwnPropertySymbols 用于遍历对象的键值（自身可或者不可枚举的Symbol属性，原型链上的不会遍历），返回一个键值数组

{
  let symbol = Symbol('symbol_key')
  let obj = {
    a: 'aa 自身可枚举',
    b: 'bb 自身可枚举',
    [symbol]: '自身可枚举 Symbol'
  }
  Object.defineProperties(obj, {
    c: {
      value: 'cc 自身可枚举',
      enumerable: true
    },
    d: {
      value: 'dd 自身不可枚举',
    }
  }) // 设置obj的d属性不可枚举
  Object.setPrototypeOf(obj, { e: 'ee 原型链可枚举' }) // 设置obj的原型


  Object.getOwnPropertySymbols(obj).forEach(key => {
    console.info(key, obj[key], key === symbol)
  })
}