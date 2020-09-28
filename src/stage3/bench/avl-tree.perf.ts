import https from 'https'
import bench from '../../util/bench'
import AVLTree from '../avl-tree'

const TEXT_URL =
  'https://raw.githubusercontent.com/PiNengShaoNian/algorithms-fourth-edition/ab2630299722255ffc4b280019c72ef2db542d19/ch3/tale.txt'

https.get(TEXT_URL, (res) => {
  let str = ''
  res.on('data', (data) => {
    str += data.toString()
  })

  res.on('end', () => {
    if (!str) return

    const words = str.split(/\s+/)

    bench(
      'AVL性能测试',
      [words.length],
      () => {
        const bst = new AVLTree<string, number>()

        for (let i = 0; i < words.length; i++) {
          if (!bst.contains(words[i])) {
            bst.put(words[i], 1)
          } else bst.put(words[i], bst.get(words[i])! + 1)
        }
      },
      40
    )
  })
})
