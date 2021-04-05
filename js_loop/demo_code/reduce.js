// reduce控制按序延迟打印 * 三角形
// 每间隔一秒打印一行

{
  const format = () => {
    const LEN = 10

    Array(LEN).fill().reduce((p, _, i) => {
      const str = Array(LEN - i).fill().reduce(p => ((p += '*'), p), '')
      return p.then(_ => {
        return new Promise(resolve => {
          setTimeout(_ => {
            console.info(str)
            resolve()
          }, 1000)
        })
      })
    }, Promise.resolve())
  }

  format()

}