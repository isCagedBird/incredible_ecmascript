
const curry = cb => {
  if (typeof cb !== 'function') throw new TypeError('argument is not function')
  const f = (...list) => {
    if (list.length < cb.length) {
      return (...args) => f(...list, ...args)
    } else {
      return cb(...list)
    }
  }
  return f
}


let test = curry((a, b, c, d, e) => console.info(a, b, c, d, e))
test()()(1)()(2, 3)()(4)(5)
// 打印 1 2 3 4 5

let sum = curry((a, b, c, d, e) => a + b + c + d + e)
sum()()(1)()(2, 3)()(4)(5)
// 返回 15

const compose = (...list) => {
  if (!list.length) return
  return list.reduce((p, item) => (...args) => p(item(...args)))
}

let test = compose(
  x => x - 1,
  x => x ** 2,
  x => x + 1
)

test(2) // 返回值是 8
