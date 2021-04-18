
{
  async function thisIsAsync () { }

  const thisIsAsync = async function () { }

  const thisIsAsync = async () => { }
}

{
  class HasThen {
    then (resolve, reject) {
      // 其他逻辑包含在内
    }
  }
}

{
  // 代码块一
  const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => resolve(value), 3000))

  const test = async () => {
    let value = await returnPromiseByValue(1)
    console.info(value)
    value = await returnPromiseByValue(2)
    console.info(value)
    value = await returnPromiseByValue(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}

{
  // 代码块二
  class HasThen {
    constructor(value) {
      this.value = value
    }
    then (resolve) {
      setTimeout(() => resolve(this.value), 3000)
    }
  }

  const test = async () => {
    let value = await new HasThen(1)
    console.info(value)
    value = await new HasThen(2)
    console.info(value)
    value = await new HasThen(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}

{
  // 代码块三
  const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => resolve(value), 3000))

  const test = async () => {
    return returnPromiseByValue(1)
      .then(value => {
        console.info(value)
        return returnPromiseByValue(2)
      })
      .then(value => {
        console.info(value)
        return returnPromiseByValue(3)
      })
      .then(value => {
        console.info(value)
        return 4
      })
  }

  test().then(value => console.info(value))
}

{
  // 代码块一
  const timeOutByValue = value => {
    setTimeout(() => console.info(value), 3000)
  }

  const test = async () => {
    let value = await timeOutByValue(1)
    console.info(value)
    value = await timeOutByValue(2)
    console.info(value)
    value = await timeOutByValue(3)
    console.info(value)
    return 4
  }

  test().then(value => console.info(value))
}

{
  // 并发异步
  function hold (list) {
    for (let item of list) {
      setTimeout(() => console.info(item), 3000)
    }
  }

  hold([1, 2, 3, 4])
}

{
  // async 函数实现串行异步
  async function hold (list) {
    const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => {
      console.info(value)
      resolve()
    }, 3000))

    for (let item of list) {
      await returnPromiseByValue(item)
    }
  }

  hold([1, 2, 3, 4])
}

{
  // promise 实现串行异步
  function hold (list) {
    const returnPromiseByValue = value => new Promise(resolve => setTimeout(() => {
      console.info(value)
      resolve()
    }, 3000))

    let chain = Promise.resolve()
    list.forEach(item => {
      chain = chain.then(() => returnPromiseByValue(item))
    })
  }

  hold([1, 2, 3, 4])
}
