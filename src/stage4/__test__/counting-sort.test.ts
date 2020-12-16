import generateArr from '../../util/generateArr'
import uniform from '../../util/uniform'
import { countingSort } from '../counting-sort'

test('计数排序正常工作', () => {
  const testArr = generateArr(
    10,
    (i) => ({
      name: String.fromCharCode(80 + i),
      score: uniform(0, 101),
    }),
    true
  )

  const orderedArr = countingSort(0, 100, testArr, (v) => v.score)

  expect(orderedArr.length).toBe(testArr.length)
  for (let i = 1; i < orderedArr.length; ++i) {
    expect(orderedArr[i].score >= orderedArr[i - 1].score).toBeTruthy()
  }
})
