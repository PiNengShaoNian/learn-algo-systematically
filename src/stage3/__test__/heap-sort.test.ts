import Comparable from '../../model/Comparable'
import HeapSort from '../heap-sort'
import shuffle from '../../util/shuffle'
import generateArr from '../../util/generateArr'

class Student implements Comparable<Student> {
  constructor(private score: number) {}
  compareTo(that: Student): number {
    return this.score - that.score
  }
  equals(that: Student): boolean {
    return this.score === that.score
  }
}

describe('插入排序', () => {
  test('能正确的排序数字', () => {
    const testArr1: number[] = generateArr(3, (i) => i, true)
    const testArr2: number[] = generateArr(3, (i) => i)
    console.log(testArr1)
    expect(HeapSort.heapSort1(testArr1)).toEqual(testArr2)
  })

  test('能正确地排序字符串', () => {
    const testArr1 = shuffle([...'ZYXWVUTSRQPONMLKJIHGFEDCBA'])
    const testArr2 = [...'ZYXWVUTSRQPONMLKJIHGFEDCBA'].sort()

    expect(HeapSort.heapSort(testArr1)).toEqual(testArr2)
  })

  test('能正确地排序Comparable对象', () => {
    const testArr1: Student[] = generateArr(10000, (i) => new Student(i), true)
    const testArr2: Student[] = generateArr(10000, (i) => new Student(i))

    expect(HeapSort.heapSort(testArr1)).toEqual(testArr2)
  })
})
