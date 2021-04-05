// Object 对象构造器上的一个静态方法，用于遍历对象的属性值（自身可枚举的属性，原型链上的不会遍历），返回一个由属性值组成的数组

{
  let obj = {
    a: 'aa',
    b: 'bb',
  }
  Object.defineProperties(obj, {
    c: {
      value: 'cc',
      enumerable: true
    },
    d: {
      value: 'dd',
    }
  }) // 设置obj的d属性不可枚举
  Object.setPrototypeOf(obj, { e: 'ee' }) // 设置obj的原型

  Object.values(obj).forEach(value => {
    console.info(value)
  })
}