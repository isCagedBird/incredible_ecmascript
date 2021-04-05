// Object 对象构造器上的一个静态方法，用于遍历对象的键值、属性值（自身可枚举的属性，原型链上的不会遍历），返回一个由键值、属性值组成的二维数组

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

  const array = Object.entries(obj)

  array.forEach(([key, value]) => {
    console.info(key, value)
  })

  console.info(Object.fromEntries(array))
}

// 需要注意的是 Object.fromEntries 可以把这样一种数据结构再转化成对应的对象（逆向操作）