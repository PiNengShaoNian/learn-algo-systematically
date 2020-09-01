export const linearSearch = <E>(arr: E[], target: E) => {
  for (let i = 0; i < arr.length; i++) {
    if (
      typeof target === 'object' &&
      target &&
      typeof (target as any).equals === 'function' &&
      (arr[i] === target || (arr[i] as any).equals(target))
    ) {
      return i
    } else if (arr[i] === target) {
      return i
    }
  }

  return -1
}
