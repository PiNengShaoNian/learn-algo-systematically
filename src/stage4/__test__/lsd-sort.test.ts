import { generateRandomStrArr } from '../../util/generateArr'
import { LSDSort } from '../lsd-sort'

test('LSDSort能正常工作', () => {
  const arr = ['cab', 'cba', 'bac', 'bca']
  const sortedArr = Array.from(arr).sort()
  expect(LSDSort(arr, 3)).toEqual(sortedArr)

  const arr2 = generateRandomStrArr(1000, 100)
  const sortedArr2 = Array.from(arr2).sort()

  expect(LSDSort(arr2, 100)).toEqual(sortedArr2)
})
