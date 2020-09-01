import { linearSearch } from '../linear-search'
import Student from '../Student'

let testArr = Array.from({ length: 1500 }, (_, i) => i)

test('linearSearch能正常命中元素', () => {
  for (let i = 0; i < testArr.length; i++) {
    expect(linearSearch(testArr, testArr[i])).toBe(i)
  }
})

test('未能命中元素时返回-1', () => {
  for (let i = 1501; i < 2000; i++) {
    expect(linearSearch(testArr, i)).toBe(-1)
  }
})

test('自定义类型查找正常', () => {
  const students = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(
    (name) => new Student(name)
  )

  students.push(new Student('foo'))
  students.push(new Student('bar'))
  students.push(new Student('baz'))

  for (let i = 0; i < students.length; i++) {
    expect(linearSearch(students, students[i])).toBe(i)
  }

  expect(linearSearch(students, new Student('baz'))).toBe(students.length - 1)
  expect(linearSearch(students, new Student('hah'))).toBe(-1)
})
