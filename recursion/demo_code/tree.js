const tree = [
  {
    label: '第一层',
    children: [
      {
        label: '第二层',
        children: [
          {
            label: '第三层'
          },
          {
            label: '第三层',
            children: [
              {
                label: '第四层',
                children: [
                  {
                    label: '第五层',
                  }
                ]
              }
            ]
          },
          {
            label: '第三层'
          }
        ]
      }
    ]
  },
  {
    label: '第一层',
    children: [
      {
        label: '第二层',
        children: [
          {
            label: '第三层',
            children: [
              {
                label: '第四层',
              },
              {
                label: '第四层',
              }
            ]
          }
        ]
      },
      {
        label: '第二层',
      }
    ]
  },
  {
    label: '第一层',
    children: [
      {
        label: '第二层',
      },
      {
        label: '第二层',
      }
    ]
  }
]

const getTreeWithLevel = tree => {
  const core = (node, level) => {
    if (Array.isArray(node.children)) {
      return {
        ...node,
        level,
        children: node.children.map((_, i) => core(_, `${level}-${i}`))
      }
    }
    return { ...node, level }
  }
  return tree.map((_, i) => core(_, `0`))
}