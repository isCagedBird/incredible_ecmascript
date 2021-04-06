/** 
 * 统计一段字符串中相同字符出现的次数
 */
{
  const target = '122333444455555666666777777788888888999999999'

  const getCharCount = string => string.split('').reduce((prev, item) => {
    prev[item] ? prev[item]++ : prev[item] = 1
    return prev
  }, {})

  console.info(getCharCount(target))
}
/** 
 * 深层嵌套数组扁平化
 */
{
  const arr = [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]]

  const flat = target => target.reduce((prev, item) => {
    return (
      (Array.isArray(item) ? prev.push(...flat(item)) : prev.push(item)), prev
    )
  }, [])

  console.info(arr, flat(arr))
}
/** 
 * 提供异步控制流程
 */
{
  // 间隔1秒钟依次打印 0、1、2、3、4、5、6、7、8、9
  Array.from({ length: 10 }).reduce((prev, _, index) => {
    return prev.then(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.info(index)
          resolve()
        }, 1000)
      })
    })
  }, Promise.resolve())
}
/**
 * 一个函数式的用法、把传入的纯函数数组按先后次序依次执行，每一次的传入值是上一次的执行结果
 */
{
  const compose = (...functionArr) => functionArr.reduce((p, i) => (...args) => p(i(...args)))
  // 输入输入对应的数学概念上的函数
  const plus_one = x => x + 1
  const power = x => x ** 2
  const reduce_two = x => x - 2

  const composeFunction = compose(plus_one, power, reduce_two)

  console.info(composeFunction(4))
  // (4 - 2)^2 + 1 -> 5
}
/** 
 * 获取两个集合的交集
 */
{
  const a = [1, 2, 3, 4, 1, 1, 1, 1, 5, 6, 2, 4]
  const b = [1, 3, 4, 6, 2, 4]

  const getIntersection = (a, b) => a.reduce((prev, item) => {
    b.some(_ => _ === item) && !prev.some(_ => _ === item) && prev.push(item)
    return prev
  }, [])

  console.info(getIntersection(a, b))
}
/** 
 * 替代数组原型链上的 filter 方法
 */
{
  const arr = [1, 2, 3, 4, 5]

  const filter = (array, filterOption) => array.reduce((prev, item) => {
    item !== filterOption && prev.push(item)
    return prev
  }, [])

  console.info(arr.filter(_ => _ !== 4), filter(arr, 4))
}
/** 
 * 替代数组原型链上的 map 方法
 */
{
  const arr = [1, 2, 3, 4, 5]

  const mapResult = arr.map(_ => {
    if (_ === 2) return 'xxxx'
    return _
  })

  const mapCall = arr.reduce((prev, item) => {
    prev.push(item === 2 ? 'xxxx' : item)
    return prev
  }, [])

  console.info(mapResult, mapCall)
}
/** 
 * 数组去重
 */
{
  const array = [1, 5, 2, 4, 2, 1, 7, 4, 2, 1, 8, 9, 10]

  const removeRepeat = target => target.reduce((prev, item) => {
    !prev.some(_ => _ === item) && prev.push(item)
    return prev
  }, [])

  console.info(array, removeRepeat(array))
}
/** 
 * 自己实现一个 reduce 方法
 */
{

  Array.prototype.reduceDefine = function (callback, init) {
    const array = this
    let result
    if (init !== undefined) {
      result = init
      for (let i = 0; i < array.length; i++) {
        result = callback(result, array[i], i, array)
      }
    } else {
      result = array[0]
      for (let i = 1; i < array.length; i++) {
        result = callback(result, array[i], i, array)
      }
    }
    return result
  }

  // 有初始值的测试
  const arr = [1, [2, [3, [4, [5, [6, [7, [8, [9]]]]]]]]]
  const flat = target => target.reduceDefine((prev, item) => {
    return (
      (Array.isArray(item) ? prev.push(...flat(item)) : prev.push(item)), prev
    )
  }, [])
  console.info(arr, flat(arr))

  // 没有初始值的测试
  console.info(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reduceDefine((p, i) => p + i)
  )
}
