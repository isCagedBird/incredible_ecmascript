// Object 对象构造器上的一个静态方法，用于遍历对象的键值（自身可枚举的除去Symbol的属性，原型链上的不会遍历），返回一个由键值组成的数组

{
  let symbol = Symbol('symbol_key')

  let obj = {
    a: 'aa 自身可枚举',
    b: 'bb 自身可枚举',
    [symbol]: '自身可枚举 symbol'
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

  Object.keys(obj).forEach(key => {
    console.info(key, obj[key])
  })
}