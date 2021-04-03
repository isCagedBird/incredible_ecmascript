### 写作初衷
2017年，当时我还在大二的课堂，机缘巧合下（笑）开始接触到 `ECMAScript` 这门有趣的、功能丰富的编程语言迄今已有四年了，长时间以来使用这门语言，心中也诞生了一些感悟与想法，我决定把这些内容联合语法部分以文字的形式记载下来，不断地总结、学习、提升。

### 其他说明
内容将会以章节来划分，语言部分会涵盖在内一起娓娓道来，如果能够让您觉得内容有些意思，对您有些帮助，我会感觉很欣喜和愉悦。

### 开始吧
惯例啦，学习一门语言应该从 `hello world` 开始：
```javascript

const helloWorld = Array(5).fill().reduce((p, _, i, __, T = 'Hello World', f = (_, l) => _.repeat(l), M = {0:f(`${f('_',5)} `,T.length), 1:f(`|${f(' ',3)}||`, T.length), 2:[...T].reduce((_p, v) => (_p += `| ${v} ||`,_p),''), 3:f(`|${f('_', 3)}||`, T.length), 4:f(`/${f('_', 3)}\\|`, T.length)}) => (p += M[i] + '\n', p),[])


// 打印 hello world
console.info(helloWorld)

```
![hello world](./asset/hello_world.png)