export const countingSort = <T>(
  l: number,
  r: number,
  elems: T[],
  getId: (e: T) => number
): T[] => {
  const cnt = Array.from({ length: r - l + 1 }, () => 0)
  const result: T[] = []

  for (let i = 0; i < elems.length; ++i) {
    cnt[getId(elems[i])]++
  }

  const index = Array.from({ length: cnt.length + 1 }, () => 0)

  for (let i = 0; i < index.length - 1; ++i) {
    index[i + 1] = index[i] + cnt[i]
  }

  for (let i = 0; i < elems.length; ++i) {
    result[index[getId(elems[i])]++] = elems[i]
  }

  return result
}
