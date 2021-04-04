const helloWorld = Array(5).fill().reduce((p, _, i, __, T = 'Hello World', f = (_, l) => _.repeat(l), M = { 0: f(`${f('_', 5)} `, T.length), 1: f(`|${f(' ', 3)}||`, T.length), 2: [...T].reduce((_p, v) => (_p += `| ${v} ||`, _p), ''), 3: f(`|${f('_', 3)}||`, T.length), 4: f(`/${f('_', 3)}\\|`, T.length) }) => (p += M[i] + '\n', p), [])


// 打印 hello world
console.info(helloWorld)