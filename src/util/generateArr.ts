import shuffle from './shuffle'

export default function generateArr<T>(
  length: number,
  iterFn: (i: number) => T,
  random?: boolean
): T[] {
  const arr = Array.from({ length }, (_, i) => iterFn(i))
  if (random) {
    return shuffle(arr)
  }
  return arr
}
