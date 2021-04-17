- 基于对象  
js是一门多范式的图灵完备的编程语言，开发者可以使用传统的面向过程的命令式范式、可以使用消弥共享状态副作用的函数式范式、可以使用基于原型链模拟出的面向对象范式等等。考虑到团队协作，最好一个团队需要确定好一个统一的编程范式。  
前面也提到了，js的面向对象机制是通过原型链模拟出来的，可以说，模拟的挺像那么回事，惟妙惟肖的。  
[demo_code](./demo_code/index.js)
- 万物皆对象  
在介绍原型链前，我们先来聊聊js中的`万物皆对象`这个有趣的事情。  
实际上，在js中除了基本的 boolean、string、number、bigint、symbol等数据类型外，包括函数在内的所有引用数据类型——都是对象。特别的，前面的那些基本数据类型，它们的构造函数包装类也是对象。null 更特殊，它是js原型链的终点。
- 原型链  
所有的对象都拥有一个隐式原型指针`__proto__`
```javascript
{
  const thisIsNumber = 1000
  const thisIsBoolean = true
  const thisIsString = 'funny'
  const thisIsSymbol = Symbol()
  const thisIsBigInt = 1000n
  const thisIsArray = []
  const thisIsFunction = () => {}
  const thisIsPromise = Promise.resolve()
  const thisIsAsyncFunction = async () => {}
  const thisIsGeneratorFunction = function* (){}
  const ThisIsRegExp = /^[\d]+[^\d]*/g

  const list = [
    thisIsNumber,
    thisIsBoolean,
    thisIsString,
    thisIsSymbol ,
    thisIsBigInt,
    thisIsArray,
    thisIsFunction,
    thisIsPromise,
    thisIsAsyncFunction ,
    thisIsGeneratorFunction ,
    ThisIsRegExp,
  ]

  list.forEach(item => {
    // 查看上述各种类型的隐式指针
    console.info(
      item.__proto__
    )
  })
}
```
所有的构造器函数在拥有隐式原型指针的同时，还都拥有一个显式原型指针 `prototype`
```javascript
{
  // 内置函数构造函数
  console.info(
    Function.prototype
  )

  function Dog(){}

  // 自定义的 Dog 构造类
  console.info(
    Dog.prototype
  )
}
```
一个构造器函数的显式原型指针指向它的原型，它通过`new`关键字得到的实例的隐式原型指针也指向它的原型。如此一下，许多这样的构造器原型接上原型，就构造出了js的原型世界了。
- Object.prototype 与 Function.prototype  
在js的原型世界中，有两个极为重要的原型对象，就是Object.prototype 与 Function.prototype了，他们分别是Object、Function构造器函数的原型，一个用于构造对象，一个用于构造函数。可以说，它们两个就是js原型世界中的始祖了，它们构造出了js强大的原型世界。特别的，Function.prototype的隐式原型是Object.prototype，Object的隐式原型是Function.prototype。这意味着，**包括Object、Function在内所有构造器函数的原型都是Function.prototype，函数即是对象，包括Object、Function在内所有的对象原型是Object.prototype。**
```javascript
{
  // 自定义 Dog 构造函数
  function Dog(){}

  const list = [
    Object.__proto__ === Function.prototype,
    Object.prototype.__proto__ === null,
    Object.prototype.constructor === Object,

    Function.__proto__ === Function.prototype,
    Function.prototype.__proto__ === Object.prototype,
    Function.prototype.constructor === Function,

    Dog.prototype.__proto__ === Object.prototype,
    Dog.__proto__ === Function.prototype,
    (new Dog()).__proto__ === Dog.prototype
  ]

  console.info(list) // all item of list is true
}
```
- 构造函数与class  
从上文的描述中，相比你也得出结论了，js中的构造器函数就是其他传统面向对象语言中的class的概念，es6的class还是一个构造器函数，[他们的对比用法可以看这里](../class/main.md)。
- 写在最后
今天来看，主流语言中，除了js，几乎没有语言是这种基于原型链实现的面向对象机制。原型链，古老而充满生命力。