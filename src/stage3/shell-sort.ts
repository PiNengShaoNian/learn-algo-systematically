import Comparable from '../model/Comparable'

class ShellSort {
  static shellSort<E extends number | string | Comparable<E>>(arr: E[]) {
    let h = Math.floor(arr.length / 2)

    while (h >= 1) {
      for (let i = h; i < arr.length; i++) {
        const t = arr[i]
        let j

        for (j = i; j - h >= 0 && this.less(t, arr[j - h]); j -= h) {
          arr[j] = arr[j - h]
        }

        arr[j] = t
      }

      h = Math.floor(h / 2)
    }

    return arr
  }

  static less<E extends Comparable<E> | number | string>(a: E, b: E): boolean {
    if (typeof a === 'string' || typeof a === 'number') {
      return a < b
    } else {
      return (a as Comparable<E>).compareTo(b) < 0
    }
  }

  static shellSort1<E extends number | string | Comparable<E>>(arr: E[]) {
    let incrementSequence = 1

    while (incrementSequence * 3 + 1 < arr.length) {
      incrementSequence = incrementSequence * 3 + 1
    }

    while (incrementSequence > 0) {
      for (let i = incrementSequence; i < arr.length; i++) {
        const t = arr[i]
        let j
        for (
          j = i;
          j >= incrementSequence && this.less(t, arr[j - incrementSequence]);
          j -= incrementSequence
        ) {
          arr[j] = arr[j - incrementSequence]
        }
        arr[j] = t
      }

      incrementSequence = Math.floor(incrementSequence / 3)
    }

    return arr
  }
}

export default ShellSort
