{
  class EventHub {
    // handler 事件监听函数池
    pool = {}
    // 添加事件监听器
    addEventListener(eventName, handler) {
      // 要验证同一事件的同一监听函数是否重复添加
      if (this.pool[eventName]) {
        const finder = this.pool[eventName].find(handler_ => handler_ === handler)
        if (finder) return this
      } else {
        this.pool[eventName] = []
      }
      this.pool[eventName].push(handler)
      return this
    }
    // 移除事件监听器
    removeEventListener(eventName, handler) {
      if (!this.pool[eventName]) return this
      this.pool[eventName] = this.pool[eventName].filter(handler_ => handler_ !== handler)
      return this
    }
    // 提供事件监听、移除监听的简写方法
    add(...args) {
      return this.addEventListener(...args)
    }
    remove(...args) {
      return this.removeEventListener(...args)
    }
    // 触发某一事件，则该事件对应监听函数池内的函数将会依次被调用
    emit(eventName) {
      if (!this.pool[eventName]) return this
      this.pool[eventName].forEach(handler => handler())
      return this
    }
  }



  const hub = new EventHub() // 事件中心实例
  const click2Handler = () => console.info('click 2')
  const click4Handler = () => console.info('click 4')

  hub
    .add('click', () => console.info('click 1'))
    .add('click', click2Handler)
    .add('click', click2Handler)
    .add('click', () => console.info('click 3'))
    .add('click', click4Handler)
    .remove('click', click4Handler)
    .emit('click')
    .add('mousemove', () => console.info('mousemove 1'))
    .add('mousemove', () => console.info('mousemove 2'))
}

