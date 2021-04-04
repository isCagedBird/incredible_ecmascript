/** 
 * 动画方法，按照一定的时间间隔依次执行
 */
const anima = set => {
  ;[1, 2, 3, 4, 5, 6].reduce((p, i) => {
    return p.then(_ =>
      new Promise(resolve => {
        setTimeout(_ => {
          console.info(i)
          set(i * 100)
          resolve()
        }, 1000)
      }))
  }, Promise.resolve())
}