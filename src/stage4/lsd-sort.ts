import { countingSort } from './counting-sort'

export const LSDSort = (arr: string[], w: number): string[] => {
  for (let i = w - 1; i >= 0; --i) {
    arr = countingSort(33, 126, arr, (s) => s[i].charCodeAt(0))
  }

  return arr
}
