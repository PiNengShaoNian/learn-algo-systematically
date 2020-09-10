import generateArr from '../../util/generateArr'
import select from '../select'

test('select测试', () => {
  const testArr: number[] = generateArr(1000, (i) => i, true)

  for (let i = 0; i < testArr.length; i++) {
    expect(select(i, testArr)).toBe(i)
  }
})
