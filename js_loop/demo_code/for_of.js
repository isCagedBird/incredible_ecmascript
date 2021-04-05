// for of迭代是es6新推出的迭代方法，用于定义一个统一的迭代方法
// 原生数据结构 Map，Set，Array，String，WeakMap，WeakSet，arguments伪数组，nodeList 都已经部署了迭代接口 Symbol.iterator 

{
  for (let item of [1, 2, 3, 4, 5, 6]) {
    console.info(item)
  }
}

// 需要注意的是原始对象默认没有部署迭代接口 Symbol.iterator 