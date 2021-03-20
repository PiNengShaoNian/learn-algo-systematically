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

  const testArr1 = generateArr(
    100,
    (i) => ({
      name: String.fromCharCode(80 + i),
      score: uniform(0, 101),
    }),
    true
  )

  const orderedArr1 = countingSort(0, 100, testArr1, (v) => v.score)

  expect(orderedArr1.length).toBe(testArr1.length)
  for (let i = 1; i < orderedArr1.length; ++i) {
    expect(orderedArr1[i].score >= orderedArr1[i - 1].score).toBeTruthy()
  }
})
