/**
 * 创建小球的方法
 */
const ball = () => {
  const ball = document.createElement('div')
  const style = { top: '0px' }

  const h = s => Object.entries(Object.assign(s, {
    position: 'fixed',
    right: 'calc(50% - 25px)',
    background: 'rgba(255, 0, 0, .5)',
    'border-radius': '50px',
    width: '50px',
    'z-index': 999999999n,
    height: '50px',
  })).reduce((p, [k, v]) => {
    p += `${k}:${v}!important;`
    return p
  }, '')

  ball.setAttribute('style', h(style))
  document.body.append(ball)
  return top => {
    ball.setAttribute('style', h({ top: `${top}px` }))
  }
}