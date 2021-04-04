console.info(1) // 任务1

setTimeout(_ => console.info(2), 100) // 任务2

setTimeout(_ => console.info(3)) // 任务3

new Promise(resolve => {
  setTimeout(_ => console.info(4)) // 任务4
  console.info(5) // 任务5
  resolve()
  async function asy () {
    await setTimeout(_ => console.info(6)) // 任务6
  }
  asy()
})
  .then(_ => console.info(7)) // 任务7
  .finally(_ => console.info(8)) // 任务8

console.info(9) // 任务9

// 答案：
// 1 5 9 7 8 3 4 6 2