// for in循环是js中比较古早的一种迭代方法了，他是专用于遍历对象的一种迭代方法
// 用于遍历对象自身、原型链上的可枚举属性，可以使用 Object.hasOwnProperty 方法过滤掉原型链上的属性

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

  for (let key in obj) {
    console.info(key, obj[key])
  }
}