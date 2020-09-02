import shuffle from './shuffle'

export default function generateArr(
  length: number,
  iterFn: (i: number) => any,
  random?: boolean
) {
  const arr = Array.from({ length }, (_, i) => iterFn(i))
  if (random) {
    return shuffle(arr)
  }
  return arr
}
