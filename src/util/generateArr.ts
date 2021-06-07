import shuffle from './shuffle'
import uniform from './uniform'

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

export const generateRandomStrArr = (n: number, w: number): string[] => {
  const ans: string[] = []

  for (let j = 0; j < n; ++j) {
    let str = ''
    for (let i = 0; i < w; ++i) {
      str += String.fromCharCode(uniform(33, 127))
    }
    ans.push(str)
  }

  return ans
}
